import path from 'path'
import fs from 'fs'
import Vue from 'vue'
import Vuex from 'vuex'
import BletchleyCSV from 'bletchley-indexes'
import parse from 'csv-parse/lib/sync'

//
import vuexModule from '../../../src'
import * as MutationTypes from '../../../src/mutation-types'

Vue.use(Vuex)

export function CSVData() {
  let datapath = path.resolve(__dirname, '../../data/august_2018.csv')
  let csvfile = fs.readFileSync(datapath, "utf8");
  return parse(csvfile)
}

export async function Bletchley10Index() {
  let bletchley = new BletchleyCSV()
  let list = await bletchley.findCoinIndexes( CSVData() )
  let index10 = list.find( index => index.name === "10")
  index10.date = new Date(2018,8)
  return index10
}

export function StoreWithIndexes(list) {
  let store = new Vuex.Store({state: {}, modules: {vuexModule}})
  let names = list.map( index => index.name)
  let currencies = new Set()
  list.forEach( (entry) => entry.currencies.forEach( (coin) => currencies.add(coin.symbol)) )
  store.commit(MutationTypes.ADD_INDEXES, {indexes: names} )
  store.commit(MutationTypes.ADD_CURRENCY_SYMBOLS, {currencies: Array.from(currencies)} )
  store.commit(MutationTypes.ADD_INDEX_UPDATES, {updates: list} )
  return store
}
