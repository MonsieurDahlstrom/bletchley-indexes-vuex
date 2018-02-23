import 'babel-polyfill'
//
import {expect} from 'chai'
import moment from 'moment'
//
import * as DataLoader from '../helpers/data-loader'
//



describe("BletchleyIndex Getters", function() {

  describe("indexes", function() {
    let store
    let dateForMonth
    let pastDate
    beforeEach(function() {
      dateForMonth = new Date()
      store = DataLoader.StoreWithIndexes([DataLoader.Bletchley10Index()])
      pastDate = moment().subtract(40, 'days').toDate()
    })
    it('returns existing index', () => {
      let result = store.getters.bletchleyIndexes(dateForMonth)
      expect(result).to.be.an('array')
      expect(result.length).to.equal(1)
    })
    it('returns empty array', () => {
      let result = store.getters.bletchleyIndexes(pastDate)
      expect(result).to.be.an('array')
      expect(result.length).to.equal(0)
    })
  })

  describe("membersForIndex", function() {
    let store
    beforeEach(function() {
      store = DataLoader.StoreWithIndexes([DataLoader.Bletchley10Index()])
    })
    it("bletchley indexes with members", function() {
      let list = store.getters.bletchleyIndexes(new Date())
      let result = store.getters.membersForBletchleyIndex(list[0])
      expect(result).to.be.an('array')
      expect(result.length).to.equal(10)
    })
    it("bletchley index not stored", function () {
      let bletchleyIndex = DataLoader.Bletchley10Index()
      let result = store.getters.membersForBletchleyIndex(bletchleyIndex)
      expect(result).to.be.an('array')
      expect(result.length).to.equal(0)
    })
  })

})
