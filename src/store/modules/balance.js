export default {
    namespaced: true,

    state: {
        btc: null,
    },

    mutations: {
        SET_BTC: (state, payload) => {
            state.btc = payload
        },
    },

    actions: {
        CHANGE_BTC: (context, payload) => {
            context.commit('SET_BTC', payload)
        },
    },

    getters: {
        GET_BTC: state => {
            return state.btc
        },
    },
}