import 'babel-polyfill'
//
import {expect} from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'

//
import module from '../../../src'

Vue.use(Vuex)

describe("BletchleyIndexesModule", function() {
  describe("Module Properties", function() {
    it("has state", () => expect(module.state).to.exist )
    it("has getters", () => expect(module.getters).to.exist )
    it("has actions", () => expect(module.actions).to.exist )
    it("has mutations", () => expect(module.mutations).to.exist )
    it("registers with store", () => expect( () => { new Vuex.Store({state: {}, modules: {module}}) } ).to.not.throw())
  })
})
