
const getters = {
  bletchleyIndexes: (state, getters, rootState) => (dateForMonth) => {
    let year = dateForMonth.getFullYear()
    let month = dateForMonth.getMonth()
    return state.indexes.filter( index => index.year === year && index.month === month)
  },
  membersForBletchleyIndex: (state, getters) => (bletchleyIndex) => state.indexes.find( index => index.id === bletchleyIndex.id).members
}

export default getters
