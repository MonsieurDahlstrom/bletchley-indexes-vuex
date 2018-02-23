import path from 'path'
import fs from 'fs'
import parse from 'csv-parse/lib/sync'
import Vue from 'vue'
import Vuex from 'vuex'
import uuidv4 from 'uuid/v4';
import numeral from 'numeral'
//
import vuexModule from '../../../src'

Vue.use(Vuex)

export function CSVFile() {
  let datapath = path.resolve(__dirname, '../../data/jan-bletchley-10.csv')
  let csvfile = fs.readFileSync(datapath, "utf8");
  return csvfile
}

export function Bletchley10Index() {
  let rows = parse(CSVFile(),{})
  let dateNow = new Date()
  let index = {id: uuidv4(), name:rows[0][2], members:[], year: dateNow.getFullYear(), month: dateNow.getMonth()}
  for(let memberIndex=1; memberIndex < 11; memberIndex++) {
    let member = {id: uuidv4(), symbol:rows[memberIndex][0], capitalisation:numeral(rows[memberIndex][1]).value(), weight: numeral(rows[memberIndex][2]).value(), bletchley_index_id: index.id}
    index.members.push(member)
  }
  return index
}

export function StoreWithIndexes(indexArray) {
  let store = new Vuex.Store({state: {}, modules: {vuexModule}})
  for(let bletchleyIndex of indexArray) {
    store.commit("ADD_BLETCHLEY_INDEX",{index:bletchleyIndex})
    for(let bletchleyMember of bletchleyIndex.members) {
      store.commit("ADD_BLETCHLEY_MEMBER",{member:bletchleyMember})
    }
  }
  return store
}
