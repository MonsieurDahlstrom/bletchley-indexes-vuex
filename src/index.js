import Getters from './getters'
import * as Actions from './actions'
import Mutations from './mutations'

const bletchleyState = {
  indexes:[],
  currencies:[],
  updates:[]
}

const VuexModule = {
  state: bletchleyState,
  mutations: Mutations,
  actions: Actions,
  getters: Getters,
  namespaced: true
}

export default VuexModule
