<template lang="pug">
    .currency-card(:class="{ active: currency.isTopUpStatus && !currency.isWithdrawStatus || currency.isWithdrawStatus && !currency.isTopUpStatus }")
        .row
            .col
                .currency-top
                    .name {{ currency.name }}
                    .balance(v-if="currency.id == 1") {{ currency.balance.toFixed(5) }}
                    .balance(v-else) {{ currency.balance.toFixed(2) }}
                .currency-actions
                    button(@click='topUpBalance(currency.id, currency.isTopUpStatus)') Ввод
                    button(@click='withdrawBalance(currency.id, currency.isWithdrawStatus)') Вывод
        .row
            .col
                <top-up-component v-show="currency.isTopUpStatus" :currencyTopUp="currency" />
                <withdraw-component v-show="currency.isWithdrawStatus" :currencyWithdraw="currency" />

</template>

<script>
import { mapActions } from 'vuex'

import topUpComponent from './TopUpComponent.vue'
import withdrawComponent from './WithdrawComponent.vue'

export default {
    name: 'currency-card-component',
    props: ["currency"],
    components: {
       topUpComponent,
       withdrawComponent
    },
    data(){
        return {
            isTopUp: false,
            isWithdraw: false
        }
    },
    methods: {
        
        ...mapActions([
            "CHANGE_CURRENCY_TOPUP_STATUS",
            "CHANGE_CURRENCY_WITHDRAW_STATUS"
        ]),
        
        topUpBalance(currencyID, currencyStatus){            
            
            let topUpStatus = {id: currencyID, status: true}
            if(currencyStatus) {
                topUpStatus = {id: currencyID, status: false}
            }
            
            this.CHANGE_CURRENCY_TOPUP_STATUS(topUpStatus)
        },

        withdrawBalance(currencyID, currencyStatus){       

            let withDrawStatus = {id: currencyID, status: true}
            if(currencyStatus) {
                withDrawStatus = {id: currencyID, status: false}
            }

            this.CHANGE_CURRENCY_WITHDRAW_STATUS(withDrawStatus)
        }
    }
}
</script>

<style lang="sass" scoped>
.currency-card
    border: 1px solid gray
    padding: 1em
    
    &.active 
        // grid-column: 1/2
        /* Extra small devices (phones, 600px and down) */
        @media only screen and (max-width: 547px)
            grid-column: 1/2
            // grid-row: 1/auto
        /* Small devices (portrait tablets and large phones, 600px and up) */
        @media only screen and (min-width: 548px)
            grid-column: 1/3
            grid-row: 1/auto
        /* Medium devices (landscape tablets, 768px and up) */
        @media only screen and (min-width: 768px)
            grid-column: 1/4
            grid-row: 1/auto
        /* Large devices (laptops/desktops, 992px and up) */
        @media only screen and (min-width: 992px)
            grid-column: 1/4
            grid-row: 1/auto
        /* Extra large devices (large laptops and desktops, 1200px and up) */
        @media only screen and (min-width: 1200px)
            grid-column: 1/4
            grid-row: 1/auto
</style>