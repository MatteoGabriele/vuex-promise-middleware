/*!
 * vuex-promise-middleware v1.0.0
 * (c) 2017 Matteo Gabriele
 * Released under the ISC License.
 */
'use strict';

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

function vuexPromiseMiddleware(store) {
  store.subscribe(function (mutation, state) {
    var _mutations;

    var isPromise = mutation.payload && mutation.payload.then;

    if (!isPromise) {
      return;
    }

    var succeded = mutation.type + "_SUCCEEDED";
    var failed = mutation.type + "_FAILED";

    store.hotUpdate({
      mutations: (_mutations = {}, defineProperty(_mutations, succeded, function (state, payload) {}), defineProperty(_mutations, failed, function (state, payload) {}), _mutations)
    });

    mutation.payload.then(function (response) {
      store.commit(succeded, response);
    }).catch(function (response) {
      store.commit(failed, response);
    });
  });
}

module.exports = vuexPromiseMiddleware;
