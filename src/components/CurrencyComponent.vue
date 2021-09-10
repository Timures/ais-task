<template lang="pug">
    .currency
        .currency-top
            .name {{ currency.name }}
            .balance
        .currency-actions
            button(@click='topUpBalance()') Ввод
            button(@click='withdrawBalance()') Вывод
        <top-up-component :currencyTopUp=currency v-show="isTopUp" />
        <withdraw-component :currencyWithdraw=currency v-show="isWithdraw" />
</template>

<script>
import TopUpComponent from './TopUpComponent.vue'
import WithdrawComponent from './WithdrawComponent.vue'

export default {
    name: 'currency-component',
    props: [
        "currency"
    ],
    components: {
        TopUpComponent,
        WithdrawComponent
    },
    data(){
        return {
            isTopUp: false,
            isWithdraw: false
        }
    },
    methods: {
        topUpBalance(){
            if( this.isWithdraw ) {
                this.isWithdraw = !this.isWithdraw
            }
            this.isTopUp = !this.isTopUp
            
        },
        withdrawBalance(){
            if(this.isTopUp) {
                this.isTopUp = !this.isTopUp            
            }
            this.isWithdraw = !this.isWithdraw
            
        }
    }
}
</script>