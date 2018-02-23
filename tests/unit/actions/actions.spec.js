import 'babel-polyfill'
//
import {expect} from 'chai'
import sinon from 'sinon'

import axios from 'axios'
import axiosAdapter from 'axios-mock-adapter';
import moment from 'moment'

//
import VuexActionTester from '../helpers/vuex-action-tester'
import * as DataLoader from '../helpers/data-loader'

//
import * as actions from '../../../src/actions'
import * as MutationTypes from '../../../src/mutation-types'

describe("actions", function() {
  describe("#retrive", function() {

    let mock
    let clock
    beforeEach(function() {
      mock = new axiosAdapter(axios);
    })

    afterEach(function() {
      if(mock)
        mock.restore();
      if(clock)
        clock.restore();
    })

    describe("network success", function() {

      let timeNow
      let monthToRetrive
      beforeEach(function() {
        timeNow = moment("2018-01-25","YYYY-MM-DD").toDate()
        monthToRetrive = moment("2018-01-14","YYYY-MM-DD").toDate()
        mock.onGet(/https:\/\/www.bletchleyindexes.com\/weights\/[a-zA-Z]{3}.csv/).reply(200,DataLoader.CSVFile())
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
        //
        clock = sinon.useFakeTimers(timeNow)
        var test = new VuexActionTester(actions.retrive, {date: monthToRetrive}, mutations,[], done)
        test.state = state
        test.run()
      })
      it("skips stored indexes", (done) => {
        clock = sinon.useFakeTimers(timeNow)
        var test = new VuexActionTester(actions.retrive, {date: monthToRetrive}, [], [], done)
        test.state = {indexes: [{name:"hello", year: monthToRetrive.getFullYear(), month: monthToRetrive.getMonth(), members: []}]}
        test.run()
      })
    })

    describe("network error", function() {

      let timeNow
      let monthToRetrive
      beforeEach(function() {
        timeNow = moment("2018-01-25","YYYY-MM-DD").toDate()
        monthToRetrive = moment("2018-01-14","YYYY-MM-DD").toDate()
        mock.onGet(/https:\/\/www.bletchleyindexes.com\/weights\/[a-zA-Z]{3}.csv/).networkError();
      })

      it("should not return fresh results", (done) => {
        var test = new VuexActionTester(actions.retrive, {date: new Date(2018, 0 ,1)}, [],[],done)
        test.state = {indexes:[]}
        test.run()
      })
    })
  })
})
