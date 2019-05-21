import * as MutationTypes from './mutation-types'

const mutations = {

  [MutationTypes.ADD_INDEXES] (state,payload) {
    for(let indexName of payload.indexes) {
      let index = state.indexes.findIndex( item => item === indexName)
      index < 0 ? state.indexes.push(indexName) : state.indexes.splice(index,1,indexName)
    }
  },

  [MutationTypes.ADD_CURRENCY_SYMBOLS] (state,payload) {
    for(let currencySymbol of payload.currencies) {
      let index = state.currencies.findIndex( storedSymbol => storedSymbol === currencySymbol)
      index < 0 ? state.currencies.push(currencySymbol) : state.currencies.splice(index,1,currencySymbol)
    }
  },

  [MutationTypes.ADD_INDEX_UPDATES] (state,payload) {
    for(let update of payload.updates) {
      let startOfTheMonth = new Date(update.date.getFullYear(),update.date.getMonth())
      let index = state.updates.findIndex( storedUpdate => storedUpdate.date.getTime() === startOfTheMonth.getTime() && storedUpdate.name === update.name)
      index < 0 ? state.updates.push(update) : state.updates.splice(index,1,update)
    }
  },

  //TODO: REMOVE
  /**
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
  **/
}

export default mutations
