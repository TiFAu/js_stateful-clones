'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let cloneStatus = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(cloneStatus, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(cloneStatus, action.keysToRemove);
        break;

      case 'clear':
        cloneStatus = {};
        break;
    }

    result.push({ ...cloneStatus });
  }

  return result;
}

function addProperties(cloneStatus, extraData) {
  Object.assign(cloneStatus, extraData);
}

function removeProperties(cloneStatus, keysToRemove) {
  for (const key of keysToRemove) {
    if (cloneStatus[key]) {
      delete cloneStatus[key];
    }
  }
}

module.exports = transformStateWithClones;
