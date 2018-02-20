import BletchleyIndexes from 'bletchley-indexes'

export async function retrive ({ state, commit, rootState }, payload) {
  let year = payload.date.getFullYear()
  let month = payload.date.getMonth()
  let indexes = state.indexes.filter( item => item.month === month && item.year === year)
  if(indexes.length > 0) return
  try {
    let list = await BletchleyIndexes.retriveIndexes(payload.date)
    console.log(list);
    for(let bletchleyIndex of list) {
      console.log(Object.entries(bletchleyIndex))
      for(let indexMember of bletchleyIndex.members) {
        console.log(indexMember);
      }
    }
  }catch(err) {
    console.error("bletchley-indexes-vuex action retrive: " + err)
  }
}
