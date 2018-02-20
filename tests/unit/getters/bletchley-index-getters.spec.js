import 'babel-polyfill'
//
import {expect} from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
//
import * as DataLoader from '../helpers/data-loader'
//
import vuexModule from '../../../src'
//

Vue.use(Vuex)

describe("BletchleyIndex Getters", function() {

  describe("indexes", function() {
    let state
    let store
    let dateForMonth
    before(function() {
      dateForMonth = new Date()
      let item = DataLoader.Bletchley10Index()
      store = new Vuex.Store({state: {}, modules: {vuexModule}})
      store.commit("ADD_BLETCHLEY_INDEX",{index:item})
    })
    it('returns index', () => {
      let result = store.getters.bletchleyIndexes(dateForMonth)
      expect(result).to.be.an('array')
      expect(result.length).to.equal(1)
    })
  })

  describe("membersForIndex", function() {

  })

})
