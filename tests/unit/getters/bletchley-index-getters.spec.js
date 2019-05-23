import 'babel-polyfill'
//
import {expect} from 'chai'
//
import * as DataLoader from '../helpers/data-loader'
//
describe("Getters", function() {

  describe("#update", function() {
    let store, coinIndex
    beforeEach(async function() {
      coinIndex = await DataLoader.Bletchley10Index()
      store = DataLoader.StoreWithIndexes([coinIndex])
    })
    it('returns existing index', () => {
      let result = store.getters['bletchley/updateForIndexAndDate'](coinIndex.name, coinIndex.date)
      expect(result).to.be.an('object')
      expect(result).to.deep.equal(coinIndex)
    })
    it('returns empty array', () => {
      let result = store.getters['bletchley/updateForIndexAndDate'](coinIndex.name, new Date())
      expect(result).to.be.undefined
    })
  })

  describe("#updates", function() {
    let store, coinIndex
    beforeEach(async function() {
      coinIndex = await DataLoader.Bletchley10Index()
      store = DataLoader.StoreWithIndexes([coinIndex])
    })
    it('returns existing indexes', () => {
      let result = store.getters['bletchley/updatesForIndex'](coinIndex.name)
      expect(result).to.be.an('array')
      expect(result.length).to.equal(1)
      expect(result[0]).to.deep.equal(coinIndex)
    })
    it('returns empty without stored updates', () => {
      let result = store.getters['bletchley/updatesForIndex']("20")
      expect(result).to.be.an('array')
      expect(result.length).to.equal(0)
    })
  })

})
