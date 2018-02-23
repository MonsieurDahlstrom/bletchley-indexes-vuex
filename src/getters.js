
const getters = {
  bletchleyIndexes: (state, getters, rootState) => (dateForMonth) => {
    let year = dateForMonth.getFullYear()
    let month = dateForMonth.getMonth()
    return state.indexes.filter( index => index.year === year && index.month === month)
  },
  membersForBletchleyIndex: (state, getters) => (bletchleyIndex) => {
    return state.members.filter(member => member.bletchley_index_id === bletchleyIndex.id)
  }
}

export default getters
