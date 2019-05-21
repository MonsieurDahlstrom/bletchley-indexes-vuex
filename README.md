# bletchley-indexes-vuex
vuex module for storing the cryptocurrencie indexes by bletchleyindexes.com

```js
import Vue from 'vue'
import Vuex from 'vue;
Vue.use(Vuex)

import BletchleyModule from 'bletchley-indexes-vuex'

const store = new Vuex.Store({state: {}, modules: {bletchley: BletchleyModule}})

```
