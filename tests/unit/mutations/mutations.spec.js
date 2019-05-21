import 'babel-polyfill'
import {expect} from 'chai'
import sinon from 'sinon'

import Mutations from '../../../src/mutations'

const { ADD_BLETCHLEY_INDEXES, ADD_CRYPTOCURRENCY_SYMBOLS, ADD_BLETCHLEY_INDEX_UPDATES} = Mutations

describe("Mutations", function() {

  let state
  beforeEach(() => {
    state = {indexes:[], currencies:[] ,updates:[]}
  })

  describe("#ADD_BLETCHLEY_INDEXES", () => {
    it("add new indexes", () => {
      // apply mutation
      ADD_BLETCHLEY_INDEXES(state, {indexes:["10"]})
      // assert result
      expect(state.indexes.length).to.equal(1)
      expect(state.indexes[0]).to.equal('10')
    })
    it("no duplicates", function () {
      //mock state
      state.indexes.push("10")
      // apply mutation
      ADD_BLETCHLEY_INDEXES(state, {indexes:["10"]})
      // assert result
      expect(state.indexes.length).to.equal(1)
      expect(state.indexes[0]).to.equal('10')
    })
  })

  describe("ADD_CRYPTOCURRENCY_SYMBOLS", () => {
    it("add new symbols", () => {
      // apply mutation
      ADD_CRYPTOCURRENCY_SYMBOLS(state, {currencies:["BTC"]})
      // assert result
      expect(state.currencies.length).to.equal(1)
      expect(state.currencies[0]).to.equal("BTC")
    })
    it("no duplicates", function () {
      //mock state
      state.currencies.push("BTC")
      // apply mutation
      ADD_CRYPTOCURRENCY_SYMBOLS(state, {currencies:["BTC"]})
      // assert result
      expect(state.currencies.length).to.equal(1)
      expect(state.currencies[0]).to.equal("BTC")
    })

  })

  describe("ADD_BLETCHLEY_INDEX_UPDATES", () => {

    let update, btcCurrency, ethCurrency
    beforeEach(() => {
      btcCurrency = {symbol:"BTC", weight:0.345, previousWeigth: 0.2354, turnover: 0.42344}
      ethCurrency = {symbol:"ETH", weight:0.44, previousWeigth: 0.753, turnover: 0.92457}
      update = {name:"10", turnover:0.9876 ,date:new Date(2018,8), currencies:[btcCurrency,ethCurrency]}
    })

    it("adds a index update", function() {
      // apply mutation
      ADD_BLETCHLEY_INDEX_UPDATES(state, {updates:[update]})
      // assert result
      expect(state.updates.length).to.equal(1)
      expect(state.updates[0]).to.deep.equal(update)
    })
    it("no duplicates", function() {
      //mock state
      state.updates.push(update)
      // apply mutation
      ADD_BLETCHLEY_INDEX_UPDATES(state, {updates:[update]})
      // assert result
      expect(state.updates.length).to.equal(1)
      expect(state.updates[0]).to.deep.equal(update)
    })
    it("updates stored value", function() {
      //mock state
      state.updates.push(update)
      let refreshedUpdate = {name:"10", turnover:0.9876 ,date:new Date(2018,8), currencies:[btcCurrency]}
      // apply mutation
      ADD_BLETCHLEY_INDEX_UPDATES(state, {updates:[refreshedUpdate]})
      // assert result
      expect(state.updates.length).to.equal(1)
      expect(state.updates[0]).to.deep.equal(refreshedUpdate)
    })
  })

})
