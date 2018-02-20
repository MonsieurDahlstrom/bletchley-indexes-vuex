import * as MutationTypes from './mutation-types'
import BletchleyIndexes from 'bletchley-indexes'

export async function retrive ({ state, commit, rootState }, payload) {
  let year = payload.date.getFullYear()
  let month = payload.date.getMonth()
  let indexes = state.indexes.filter( item => item.month === month && item.year === year)
  if(indexes.length > 0) return
  try {
    let list = await BletchleyIndexes.retriveIndexes(payload.date)
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
