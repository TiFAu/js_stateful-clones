'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let obj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(obj, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(obj, action.keysToRemove);
        break;

      case 'clear':
        obj = clearProperties(state);
        break;
    }

    result.push({ ...obj });
  }

  return result;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }

  return state;
}

function clearProperties(state) {
  return {};
}

module.exports = transformStateWithClones;
