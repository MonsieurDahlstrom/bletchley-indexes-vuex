# bletchley-indexes-vuex
[Vuex](https://vuex.vuejs.org/) module for caching cryptocurrency indexes in a Vue applicatoin. This module
depends on the [bletchley-indexes](https://www.npmjs.com/package/bletchley-indexes) package, which parses and download the CSV
updates published by bletchley indexes. Since CORS is not supported by
bletchleyindexes.com you would have to cache the CSV files yourself.

## Installation
```console
$ yarn add bletchley-indexes-vuex
# OR
$ npm install bletchley-indexes-vuex
```

## Configuration
```js
import Vue from 'vue'
import Vuex from 'vue'
Vue.use(Vuex)

import BletchleyModule from 'bletchley-indexes-vuex'

const store = new Vuex.Store({state: {}, modules: {bletchley: BletchleyModule}})
```

## Use inside a .vue
```js
<template>
  <div>
    <h2>Bletchley Indexes</h2>
    <form v-on:submit.prevent>
      <select v-model="currentCryptoSymbol">
        <option disabled>Select Currency</option>
        <option v-for="(crypto) in cryptoCurrencies" v-bind:key="crypto.crypto">
          {{ crypto }}
        </option>
      </select>
      <button>Refresh</button>
    </form>
    <ul>
      <li v-for="(bletchleyName,bletchleyIndex) in filterBletchleyIndexNames"
          v-bind:key="bletchleyIndex">
        <p>{{ bletchleyName }}</p>
        <ul>
          <li v-for="(currency,currencyIndex) in cryptocurrenciesForIndex(bletchleyName)"
              v-bind:key="currencyIndex">
              {{ currency.symbol }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
// helper methods to unpack the coinmarketcap module state and actions
import { mapState, mapActions } from 'vuex';
// Convenience method for date manipulation
import moment from 'moment';

export default {
  name: 'BletchleyList',
  mounted() {
    this.retrive(this.lastMonth);
  },
  data() {
    return { lastMonth: moment().subtract(1, 'months').toDate(), currentCryptoSymbol: undefined };
  },
  computed: {
    // mapping out the isloading, in case disable form submission when requesting valuations
    ...mapState('bletchley', {
      bletchleyIndexNames: state => state.indexes,
      cryptoCurrencies: state => state.currencies,
    }),
    // if a cryptocurrency has been slected with currentCryptoSymbol,
    // filter the index name list to contain indexe names that includes the
    // crypto currency
    filterBletchleyIndexNames() {
      let result = this.bletchleyIndexNames;
      if (this.currentCryptoSymbol) {
        result = result.filter((name) => {
          const month = this.$store.getters['bletchley/updateForIndexAndDate'](name, this.lastMonth);
          const test = month.currencies.findIndex(item => item.symbol === this.currentCryptoSymbol);
          return test > 0;
        });
      }
      return result;
    },
  },
  methods: {
    // mapping out  updateCoins action retrives latest valuations for specfic fiat currency
    ...mapActions('bletchley', ['retrive']),
    cryptocurrenciesForIndex(indexName) {
      return this.$store.getters['bletchley/updateForIndexAndDate'](indexName, this.lastMonth).currencies;
    },
  },
};
</script>

```

## Available actions
```js
//Given a year and a month, retrive the corresponding indexes from
//bletchleyindexes.com
let payload =  new Date(2018,9)
store.dispatch('bletchley/retrive',payload);
```

## Available getters
```js
//returns cached update for a specific month and index name.
store.getters['bletchley/updateForIndexAndDate']('10 Index',new Date(2018,9))
```
```js
//returns all cached updates for a index.
store.getters['bletchley/updatesForIndex']('10 Index')
```
## Available state

```js
//array of index names cached
store.coinmarketcap.state.indexes
//array of cryptocurrency symbols tracked through the different indexes
store.coinmarketcap.state.currencies
```
