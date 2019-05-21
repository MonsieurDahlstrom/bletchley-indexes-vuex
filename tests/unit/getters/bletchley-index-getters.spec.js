import 'babel-polyfill'
//
import {expect} from 'chai'
//
import * as DataLoader from '../helpers/data-loader'
//
describe("Getters", function() {

  describe("bletchleyUpdate", function() {
    let store, coinIndex
    beforeEach(async function() {
      coinIndex = await DataLoader.Bletchley10Index()
      store = DataLoader.StoreWithIndexes([coinIndex])
    })
    it('returns existing index', () => {
      let result = store.getters.bletchleyUpdate(coinIndex.name, coinIndex.date)
      expect(result).to.be.an('object')
      expect(result).to.deep.equal(coinIndex)
    })
    it('returns empty array', () => {
      let result = store.getters.bletchleyUpdate(coinIndex.name, new Date())
      expect(result).to.be.undefined
    })
  })

  describe("bletchleyUpdates", function() {
    let store, coinIndex
    beforeEach(async function() {
      coinIndex = await DataLoader.Bletchley10Index()
      store = DataLoader.StoreWithIndexes([coinIndex])
    })
    it('returns existing indexes', () => {
      let result = store.getters.bletchleyUpdates(coinIndex.name)
      expect(result).to.be.an('array')
      expect(result.length).to.equal(1)
      expect(result[0]).to.deep.equal(coinIndex)
    })
    it('returns empty without stored updates', () => {
      let result = store.getters.bletchleyUpdates("20")
      expect(result).to.be.an('array')
      expect(result.length).to.equal(0)
    })
  })

})
