<template lang="pug">
    .currency-card(:class="{ active: currency.isTopUpStatus && !currency.isWithdrawStatus || currency.isWithdrawStatus && !currency.isTopUpStatus }")
        .currency-info
            .currency-info__left
                .name {{ currency.name }}
                    
                .currency-actions
                    button(@click='topUpBalance(currency.id, currency.isTopUpStatus)' :class="{active: currency.isTopUpStatus}") Ввод
                    button(@click='withdrawBalance(currency.id, currency.isWithdrawStatus)'  :class="{active: currency.isWithdrawStatus}") Вывод
            .currency-info__right
                .balance(v-if="currency.id == 1") {{ currency.balance.toFixed(5) }}
                .balance(v-else) {{ currency.balance.toFixed(2) }}
        .currency-card-form
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
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2)
    border-radius: 0.5em
    padding: 1em 0
    transition: 0.15s all ease-in
    &:hover, &:focus
        transform: translate3d(0,-1px, 2px)
        box-shadow: 0px 5px 10px 2px rgba(80, 34, 37, 0.3)
    &.active 
        .currency-info
            box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.3) inset
            padding: 0 1em 1em 1em
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

.currency-info
    display: flex
    justify-content: space-between
    padding: 0 1em
    &__left
        display: flex
        flex-direction: column
        align-items: start
        .name
            font-size: 1.2em
            font-weight: 600
            margin-bottom: 0.5em
    &__right
        display: flex
        justify-content: flex-end
        align-items: flex-start
        
        .balance
            font-size: 1.7em
            font-weight: 500

.currency-actions
    display: flex
    justify-content: flex-start
    button
        &:first-child
            margin-right: 0.5em
</style>