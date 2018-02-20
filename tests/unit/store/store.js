import Vue from 'vue'
import Vuex from 'vuex'
import BletchleyIndexesModule from '../../../src'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    BletchleyIndexes: BletchleyIndexesModule
  }
})

export default store
