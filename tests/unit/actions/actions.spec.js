import 'babel-polyfill'
//
import {expect} from 'chai'
import path from 'path'
import fs from 'fs'
//
import axios from 'axios'
import axiosAdapter from 'axios-mock-adapter';
//
import VuexActionTester from '../helpers/vuex-action-tester.js'
//
import * as actions from '../../../src/actions'
import * as MutationTypes from '../../../src/mutation-types'

describe("actions", function() {
  describe("#retrive", function() {

    beforeEach(function() {
      this.mock = new axiosAdapter(axios);
    })

    afterEach(function() {
      this.mock.restore();
    })

    describe("network success", function() {
      beforeEach(function() {
        let datapath = path.resolve(__dirname, '../../data/jan-bletchley-10.csv')
        let csvfile = fs.readFileSync(datapath, "utf8");
        this.mock.onGet('https://www.bletchleyindexes.com/weights/jan.csv').reply(200,csvfile)
      })
      it("stores new indexes and members", (done) => {
        let state = {indexes:[], members:[]}
        let mutations = [
          {
            type: MutationTypes.ADD_BLETCHLEY_INDEX,
            validation: (payload) => expect(payload.index).to.be.an('object')
          },
        ]
        for(let index = 0; index < 10; index++) {
          mutations.push(
            {
              type: MutationTypes.ADD_BLETCHLEY_MEMBER,
              validation: (payload) => expect(payload.member).to.be.an('object')
            }
          )
        }
        var test = new VuexActionTester(actions.retrive, {date: new Date(2018, 0 ,1)}, mutations,[], done)
        test.state = state
        test.run()
      })
      it("skips stored indexes", (done) => {
        let beginingOfJan = new Date(2018, 0 ,1)
        let state = {}
        state.indexes = [{name:"hello", year: beginingOfJan.getFullYear(), month: beginingOfJan.getMonth(), members: []}]
        var test = new VuexActionTester(actions.retrive, {date: beginingOfJan}, [], [], done)
        test.state = state
        test.run()
      })
    })

    describe("network error", function() {
      beforeEach(function() {
        this.mock.onGet('https://www.bletchleyindexes.com/weights/jan.csv').networkError();
      })
      it("should complete", (done) => {
        var test = new VuexActionTester(actions.retrive, {date: new Date(2018, 0 ,1)}, [],[],done)
        test.state = {indexes:[]}
        test.run()
      })
    })
  })
})
