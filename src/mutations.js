import * as MutationTypes from './mutation-types'

const mutations = {

  [MutationTypes.ADD_BLETCHLEY_INDEX] (state,payload) {
    let index = state.indexes.findIndex( item => item.id === payload.index.id)
    index < 0 ? state.indexes.push(payload.index) : state.indexes.splice(index,1,payload.index)
  },

  [MutationTypes.REMOVE_BLETCHLEY_INDEX] (state,payload)  {
    let index = state.indexes.findIndex( item => item.id === payload.index.id)
    if(index >= 0)
      state.indexes.splice(index,1)
  },

  [MutationTypes.ADD_BLETCHLEY_MEMBER] (state,payload)  {
    let index = state.members.findIndex( item => item.id === payload.member.id)
    index < 0 ? state.members.push(payload.member) : state.members.splice(index,1,payload.member)
  },

  [MutationTypes.REMOVE_BLETCHLEY_MEMBER] (state,payload)  {
    let index = state.members.findIndex( item => item.id === payload.member.id)
    if(index >= 0)
      state.members.splice(index,1)
  }
}

export default mutations
