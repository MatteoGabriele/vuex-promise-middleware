# vuex-promise-middleware
Vuex promise state dispatcher

### Installation

```bash
$ npm install vuex-promise-middleware
```

### Usage

Add the plugin in the store


```js
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPromiseMiddleware from 'vuex-promise-middleware'

Vue.use(Vuex)

const plugins = [VuexPromiseMiddleware]

export default new Vuex.Store({
  plugins,
  ...
})

```

In your actions make sure to pass a Promise in the payload and the middleware is going to fire two new events with the same name of your event with two suffix: `_SUCCEEDED` and `_FAILED`

i.e. `GET_STUFF` will also fire `GET_STUFF_SUCCEEDED` and `GET_STUFF_FAILED`

### Example

In this example I will use a public api from https://opentdb.com which retrieves random questions

`state.js`

```js
export default {
  questions: [],
  pending: false,
  error: null
}
```
---

`events.js`

```js
export default {
  RETRIEVE: 'quiz/RETRIEVE',
  RETRIEVE_SUCCEEDED: 'quiz/RETRIEVE_SUCCEEDED',
  RETRIEVE_FAILED: 'quiz/RETRIEVE_FAILED'
}
```

---

`actions.js`

```js
import axios from 'axios' // for http requests
import events from './events'

export default {
  [events.RETRIEVE] ({ commit }) {
    const url = 'https://opentdb.com/api.php?amount=10'
    const request = axios.get(url)

    commit(events.RETRIEVE, request)
  }
}

```
---

`mutations.js`

```js
import events from './events'

export default {
  [events.RETRIEVE] (state) {
    state.pending = true
    state.error = null
  },

  [events.RETRIEVE_SUCCEEDED] (state, payload) {
    state.questions = payload.data.results
    state.pending = false
    state.error = null
  },

  [events.RETRIEVE_FAILED] (state, payload) {
    state.pending = false
    state.error = payload
    state.questions = []
  }
}

```


# Issues and features requests
Please drop an issue, if you find something that doesn't work, or a feature request at https://github.com/MatteoGabriele/vuex-promise-middleware/issues

Follow me on twitter [@matteo_gabriele](https://twitter.com/matteo_gabriele)
