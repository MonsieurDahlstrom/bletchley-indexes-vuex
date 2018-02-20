import 'babel-polyfill'
//
import {expect} from 'chai'
//
import module from '../../../src'

describe("BletchleyIndexesModule", function() {
  describe("Module Properties", function() {
    it("has state", () => expect(module.state).to.exist )
    it("has getters", () => expect(module.getters).to.exist )
    it("has actions", () => expect(module.actions).to.exist )
    it("has mutations", () => expect(module.mutations).to.exist )
  })
})
