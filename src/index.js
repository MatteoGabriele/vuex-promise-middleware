export default function vuexPromiseMiddleware (store) {
  store.subscribe((mutation, state) => {
    const isPromise = mutation.payload && mutation.payload.then

    if (!isPromise) {
      return
    }

    const succeded = `${mutation.type}_SUCCEEDED`
    const failed = `${mutation.type}_FAILED`

    store.hotUpdate({
      mutations: {
        [succeded] (state, payload) {},
        [failed] (state, payload) {}
      }
    })

    mutation.payload.then((response) => {
      store.commit(succeded, response)
    }).catch((response) => {
      store.commit(failed, response)
    })
  })
}
