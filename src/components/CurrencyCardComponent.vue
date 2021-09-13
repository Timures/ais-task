<template lang="pug">
    .currency-card(:class="{ active: currency.isTopUpStatus && !currency.isWithdrawStatus || currency.isWithdrawStatus && !currency.isTopUpStatus }")
        .row
            .col
                .currency-top
                    .name {{ currency.name }}
                    .balance {{ currency.balance }}
                .currency-actions
                    button(@click='topUpBalance(currency.id, currency.isTopUpStatus)') Ввод
                    button(@click='withdrawBalance(currency.id, currency.isWithdrawStatus)') Вывод
        .row
            .col
                <top-up-component v-show="currency.isTopUpStatus" currencyTopUp=currency />
                <withdraw-component v-show="currency.isWithdrawStatus" currencyWithdraw=currency />

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