export default {
    namespaced: true,

    state: {
        currencies: [
            {
               "id":1,
               "name":"BTC",
               "type":"Криптовалюта",
               "commission":5,
               "minimal":0,
               "status": false,
               "balance": 0.01
            },
            {
               "id":2,
               "name":"USD",
               "type":"Фиатная",
               "commission":5,
               "minimal":100,
               "status": false,
               "balance": 100
            },
            {
               "id":3,
               "name":"DOGE",
               "type":"Криптовалюта",
               "commission":0.5,
               "minimal":5,
               "status": false,
               "balance": 15
            },
            {
               "id":4,
               "name":"LTC",
               "type":"Криптовалюта",
               "commission":0.5,
               "minimal":1,
               "status": false,
               "balance": 25
            },
            {
               "id":5,
               "name":"SHIB",
               "type":"Криптовалюта",
               "commission":10,
               "minimal":500,
               "status": false,
               "balance": 350
            },
            {
               "id":6,
               "name":"RUR",
               "type":"Фиатная",
               "commission":0,
               "minimal":10000,
               "status": false,
               "balance": 5000
            },
            {
               "id":7,
               "name":"BNB",
               "type":"Криптовалюта",
               "commission":0.01,
               "minimal":0.15,
               "status": false,
               "balance": 120
            }
         ]
    },

    mutations: {
        SET_CURRENCY_STATUS: (state, payload) => {
            let current_currency = state.currencies.filter(el => el.id == payload)
            current_currency.status = true
        },
        SET_CURRENCY_BALANCE: (state, payload) => {
            let current_currency = state.currencies.filter(el => el.id == payload.id)
            current_currency.balance = payload.balance
        },
    },

    actions: {
        CHANGE_CURRENCY_STATUS: (context, payload) => {
            console.log('actions ', payload)
            context.commit('SET_CURRENCY_STATUS', payload)
        },
        CHANGE_CURRENCY_BALANCE: (context, payload) => {
            context.commit('SET_CURRENCY_BALANCE', payload)
        },
    },

    getters: {
        GET_CURRENCIES: (state) => {
            return state.currencies
        },
        GET_CURRENCY_BY_ID: (state) => (id) => {
            return state.currencies.find(currency => currency.id == id)
        }
    }
}