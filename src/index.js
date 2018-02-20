import * as Getters from './getters'
import * as Actions from './actions'
import * as Mutations from './mutations'

const VuexModule = {
  state: { indexes:[], members:[] },
  mutations: Mutations,
  actions: Actions,
  getters: Getters
}

export default VuexModule
