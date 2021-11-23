const state = {
  rules: [],
}

const mutations = {
  addRule(state, payload) {
    state.rules.unshift(payload);
  },
  updateRule(state, payload) {
    const index = state.rules.findIndex(rule => rule.id === payload.id);

    state.rules[index] = payload;
  },
  removeRule(state, ruleId) {
    state.rules = state.rules.filter(rule => rule.id !== ruleId);
  },
  updateRules(state, rules) {
    state.rules = rules;
  },
}

const actions = {
  getRules() {
    // FETCH EXAMPLE
    // return new Promise((resolve, reject) => {
    // return new Promise((resolve, reject) => {
    //   fetch('https://www.myapi.com/rules', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    //   })
    //     .then(response => {
    //       commit('setRules', response);
    //       resolve(response);
    //     })
    //     .catch(error => {
    //       // DO SOMETHING...
    //       reject(error);
    //     })
    //     .finally(() => {
    //       // DO SOMETHING...
    //     })
    // });
    // });
  },
  addRule({ commit }, newEvent) {
    newEvent.id = new Date().getTime();
    commit('addRule', newEvent);

    // FETCH EXAMPLE
    // return new Promise((resolve, reject) => {
    //   fetch('https://www.myapi.com/rules', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: newEvent,
    //   })
    //     .then(response => {
    //       commit('addRule', response);
    //       resolve(response);
    //     })
    //     .catch(error => {
    //       // DO SOMETHING...
    //       reject(error);
    //     })
    //     .finally(() => {
    //       // DO SOMETHING...
    //     })
    // });

  },
  updateRules({ commit }, rules) {
    commit('updateRules', rules);
  },
  updateRule({ commit }, rule) {
    commit('updateRule', rule);
  },
  removeRule({ commit }, ruleId) {
    commit('removeRule', ruleId);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}