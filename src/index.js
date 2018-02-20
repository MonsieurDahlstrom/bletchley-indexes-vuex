import Getters from './getters'
import * as Actions from './actions'
import Mutations from './mutations'

const bletchleyState = {
  indexes:[],
  members:[]
}

const VuexModule = {
  state: bletchleyState,
  mutations: Mutations,
  actions: Actions,
  getters: Getters
}

export default VuexModule
