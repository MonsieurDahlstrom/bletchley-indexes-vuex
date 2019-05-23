
const getters = {
  updateForIndexAndDate: (state, getters, rootState) => (indexName, date) => {
    //updates are index based on the first day of the specific month
    let startOfTheMonth = new Date(date.getFullYear(), date.getMonth())
    let update = state.updates.find( update => update.name === indexName && update.date.getTime() === startOfTheMonth.getTime())
    return update
  },
  updatesForIndex: (state, getters, rootState) => (indexName) => {
    return state.updates.filter( update => update.name === indexName)
  }
}

export default getters
