import * as MutationTypes from './mutation-types'
import BletchleyCSV from 'bletchley-indexes'

export async function retrive ({ state, commit, rootState }, date) {
  let startOfTheMonth = new Date(date.getFullYear(), date.getMonth())
  let indexes = state.updates.filter( item => item.date.getFullYear() === startOfTheMonth.getFullYear() && startOfTheMonth.getMonth() === item.date.getMonth() )
  if(indexes.length > 0) return
  try {
    let bletchley = new BletchleyCSV(startOfTheMonth)
    let list = await bletchley.fetch()
    let names = list.map( index => index.name)
    let currencies = new Set()
    list.forEach( (index) => index.currencies.forEach( (coin) => currencies.add(coin.symbol)) )
    commit(MutationTypes.ADD_INDEXES, {indexes: names} )
    commit(MutationTypes.ADD_CURRENCY_SYMBOLS, {currencies: Array.from(currencies)} )
    commit(MutationTypes.ADD_INDEX_UPDATES, {updates: list} )
  }catch(err) {
    console.error("bletchley-indexes-vuex action retrive: " + err)
  }
}
