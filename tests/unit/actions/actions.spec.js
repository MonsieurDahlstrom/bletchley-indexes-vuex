import 'babel-polyfill'
//
import {expect} from 'chai'
import sinon from 'sinon'

import axios from 'axios'
import axiosAdapter from 'axios-mock-adapter';
import moment from 'moment'
import fs from 'fs';
import path from 'path'
//
import VuexActionTester from '../helpers/vuex-action-tester'
import * as DataLoader from '../helpers/data-loader'

//
import * as actions from '../../../src/actions'
import * as MutationTypes from '../../../src/mutation-types'

let bletchleyGetRegexp = /https:\/\/www.bletchleyindexes.com\/weights\/(january|february|march|april|may|june|july|august|september|october|november|december)_\d{4}.csv/g

describe("Actions", function() {
  describe("#retrive", function() {

    let mock
    beforeEach(function() {
      mock = new axiosAdapter(axios);
    })

    afterEach(function() {
      mock.restore();
    })

    describe("already retrived data from bletchleyindexes.com", () => {

      let date, state
      beforeEach(() => {
        date = new Date(2018,8)
      })

      it("completes with not network requests", (done) => {
        let actionDone = () => {
          expect(mock.history.get.length).to.equal(0)
          done()
        }
        mock.onGet(bletchleyGetRegexp).networkError()
        var test = new VuexActionTester(actions.retrive, date, [], [], actionDone)
        test.state = {updates:[{name:"10", turnover:0.034, date:date}]}
        test.run()
      })
    })

    describe("need to retrive data from bletchleyindexes.com", () => {

      let date, state
      beforeEach(() => {
        date = new Date(2018,8)
      })

      it("network unavailable", (done) => {
        let actionDone = () => {
          try {
            expect(mock.history.get.length).to.equal(1)
            done()
          }catch(err) {
            done(err)
          }
        }
        mock.onGet(bletchleyGetRegexp).networkError()
        var test = new VuexActionTester(actions.retrive, date, [], [], actionDone)
        test.state = {updates: []}
        test.run()
      })
      it("http success", (done) => {
        //mock request and returned cached data
        let datapath = path.resolve(__dirname, '../../data/august_2018.csv')
        let csvfile = fs.readFileSync(datapath, "utf8");
        mock.onGet(bletchleyGetRegexp).reply(200,csvfile)
        //setup the expected commits given the cached data
        let mutations = [
          {
            type: MutationTypes.ADD_INDEXES,
            validation: (payload) => expect(payload.indexes).to.be.an('array')
          },
          {
            type: MutationTypes.ADD_CURRENCY_SYMBOLS,
            validation: (payload) => expect(payload.currencies).to.be.an('array')
          },
          {
            type: MutationTypes.ADD_INDEX_UPDATES,
            validation: (payload) => expect(payload.updates).to.be.an('array')
          },
        ]
        //run action test
        var test = new VuexActionTester(actions.retrive, date, mutations, [], done)
        test.state = {updates: []}
        test.run()
      })
      it("http failure", (done) => {
        mock.onGet(bletchleyGetRegexp).reply(404)
        var test = new VuexActionTester(actions.retrive, date, [], [], done)
        test.state = {updates: []}
        test.run()
      })
    })


  })
})
