import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        currencies: [
            {
               "id":1,
               "name": "BTC",
               "type": "Криптовалюта",
               "commission": 0.05,
               "minimal": 0.001,
               "isTopUpStatus": false,
               "isWithdrawStatus": false,
               "balance": 0.01
            },
            {
               "id":2,
               "name": "USD",
               "type": "Фиатная",
               "commission": 0.05,
               "minimal": 100,
               "isTopUpStatus": false,
               "isWithdrawStatus": false,
               "balance": 100
            },
            {
               "id":3,
               "name": "DOGE",
               "type": "Криптовалюта",
               "commission": 0.5,
               "minimal": 5,
               "isTopUpStatus": false,
               "isWithdrawStatus": false,
               "balance": 15
            },
            {
               "id":4,
               "name": "LTC",
               "type": "Криптовалюта",
               "commission": 0.5,
               "minimal": 1,
               "isTopUpStatus": false,
               "isWithdrawStatus": false,
               "balance": 25
            },
            {
               "id":5,
               "name": "SHIB",
               "type": "Криптовалюта",
               "commission": 10,
               "minimal": 500,
               "isTopUpStatus": false,
               "isWithdrawStatus": false,
               "balance": 350
            },
            {
               "id":6,
               "name": "RUR",
               "type": "Фиатная",
               "commission": 0,
               "minimal": 10000,
               "isTopUpStatus": false,
               "isWithdrawStatus": false,
               "balance": 5000
            },
            {
               "id":7,
               "name": "BNB",
               "type": "Криптовалюта",
               "commission": 0.01,
               "minimal": 0.15,
               "isTopUpStatus": false,
               "isWithdrawStatus": false,
               "balance": 120
            }
         ]
    },

    mutations: {
        SET_CURRENCY_TOPUP_STATUS: (state, payload) => {
             // clear all statuses
            let current_currency = state.currencies.filter(el => el.id == payload.id)
            
            // console.log('current ', current_currency[0])
            current_currency[0].isTopUpStatus = payload.status
        },
        SET_CURRENCY_WITHDRAW_STATUS: (state, payload) => {
            // clear all statuses
           let current_currency = state.currencies.filter(el => el.id == payload.id)
           
           // console.log('current ', current_currency[0])
           current_currency[0].isWithdrawStatus = payload.status
       },
        SET_CURENCIES_STATUS_CLEAR: (state) =>{
            state.currencies.forEach((elem) =>{
                elem.isTopUpStatus = false
                elem.isWithdrawStatus = false
            })
        },
        // balance
        SET_CURRENCY_BALANCE_TOPUP: (state, payload) => {
            let current_currency = state.currencies.filter(el => el.id == payload.id)
            
            current_currency[0].balance = current_currency[0].balance + payload.balance
            console.log('balance ste', current_currency.balance, payload.balance)
        },
        SET_CURRENCY_BALANCE_WITHDRAW: (state, payload) => {
            let current_currency = state.currencies.filter(el => el.id == payload.id)
            
            current_currency[0].balance = current_currency[0].balance - payload.balance
            console.log('balance wd', current_currency.balance, payload.balance)
        },
    },

    actions: {
        CHANGE_CURRENCY_TOPUP_STATUS: (context, payload) => {
            // console.log('actions ', payload)
            context.commit('SET_CURENCIES_STATUS_CLEAR')
            context.commit('SET_CURRENCY_TOPUP_STATUS', payload)
        },
        CHANGE_CURRENCY_WITHDRAW_STATUS: (context, payload) => {
            // console.log('actions ', payload)
            context.commit('SET_CURENCIES_STATUS_CLEAR')
            context.commit('SET_CURRENCY_WITHDRAW_STATUS', payload)
        },
        // balance
        CHANGE_CURRENCY_BALANCE_TOPUP: (context, payload) => {
            console.log('balance act', payload.balance)
            context.commit('SET_CURRENCY_BALANCE_TOPUP', payload)
        },
        CHANGE_CURRENCY_BALANCE_WITHDRAW: (context, payload) => {
            console.log('balance act', payload.balance)
            context.commit('SET_CURRENCY_BALANCE_WITHDRAW', payload)
        },
    },

    getters: {
        GET_CURRENCIES: (state) => {
            return state.currencies
        },
        GET_CURRENCY_BY_ID: (state) => (id) => {

            let currency = state.currencies.filter(currency => currency.id == id)
            return currency
        }
    }
})