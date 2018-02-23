import * as MutationTypes from './mutation-types'
import BletchleyIndexes from 'bletchley-indexes'

export async function retrive ({ state, commit, rootState }, date) {
  let year = date.getFullYear()
  let month = date.getMonth()
  let indexes = state.indexes.filter( item => item.month === month && item.year === year)
  if(indexes.length > 0) return
  try {
    let list = await BletchleyIndexes.retriveIndexes(date)
    for(let bletchleyIndex of list) {
      commit(MutationTypes.ADD_BLETCHLEY_INDEX, {index: bletchleyIndex} )
      for(let bletchleyMember of bletchleyIndex.members) {
        commit(MutationTypes.ADD_BLETCHLEY_MEMBER, {member: bletchleyMember} )
      }
    }
  }catch(err) {
    console.error("bletchley-indexes-vuex action retrive: " + err)
  }
}
