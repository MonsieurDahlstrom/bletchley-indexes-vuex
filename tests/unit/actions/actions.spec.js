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
        let datapath = path.resolve(__dirname, '../../data/jan.csv')
        let csvfile = fs.readFileSync(datapath, "utf8");
        this.mock.onGet('https://www.bletchleyindexes.com/weights/jan.csv').reply(200,csvfile)
      })
      it("should succeed", (done) => {
        var test = new VuexActionTester(actions.retrive, {date: new Date(2018, 0 ,1)}, [],[],done)
        test.state = {indexes:[]}
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
