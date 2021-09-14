<template lang="pug">
    .currency-desc
        .type Тип валюты: {{ currencyWithdraw.type }}
        
        .commission-info
            .commission(v-if="currencyWithdraw.id == 1 || currencyWithdraw.id == 2 || currencyWithdraw.id == 6") Комиссия: {{ currencyWithdraw.commission * 100}} %
            .commission(v-else) Комиссия: {{ currencyWithdraw.commission }} {{ currencyWithdraw.name }}
            
        .divider

        .info(v-if="getWithdrawSumm(currencyWithdraw.id) <= currencyWithdraw.balance")
            .result
                div Сумма комиссии: {{ getCommissionSumm(currencyWithdraw.id) }} {{ currencyWithdraw.name }}
                div(v-if="currencySumm") Будет списано: {{ getWithdrawSumm(currencyWithdraw.id) }} {{ currencyWithdraw.name }}

        .divider

        .danger(v-if="currencySumm != null && currencyWithdraw.balance < currencySumm")
            .message Указанная сумма больше чем имеется на балансе

        button( @click='withdrawAction(currencyWithdraw, currencySumm)' :class="{active : getWithdrawSumm(currencyWithdraw.id) <= currencyWithdraw.balance && currencySumm != null }" ) Вывести

</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'withdraw-commission-info',
    props: ["currencyWithdraw", "currencySumm"],
    data(){
        return {
            // currencySumm: null,
            // comment: ''
        }
    },
    methods: {

        ...mapActions([ "CHANGE_CURRENCY_BALANCE_WITHDRAW" ]),

        withdrawAction(currency){

            // first get commision summ
            let result_with_commision = this.getWithdrawSumm(currency.id)
            // console.log('result_with_commision ', result_with_commision)
            if(result_with_commision <= currency.balance && this.currencySumm > 0) {
                
                let balanceToWithdraw = {id: currency.id, balance: result_with_commision}

                this.CHANGE_CURRENCY_BALANCE_WITHDRAW(balanceToWithdraw)
                this.$emit('clear-inputs')
            }
            
        },

        getCommissionSumm(currencyID){
            let result_commission_summ = null
            switch (currencyID) {
                case 1:
                    // BTC 0.05 
                    result_commission_summ = Number(this.currencySumm) * Number(this.currencyWithdraw.commission)
                    
                    break;
                case 2:
                    // USD 0.05 100 * 0.05
                    result_commission_summ = Number(this.currencySumm) * Number(this.currencyWithdraw.commission)
                    break;
                case 3:
                case 4:
                case 5:
                case 7:
                    result_commission_summ = Number(this.currencyWithdraw.commission)
                    break;
                default:
                    result_commission_summ = 0
                    break;
            }

            return result_commission_summ
        },

        getWithdrawSumm(currencyID){
            let result_withdraw_summ = null
            switch (currencyID) {
                case 1:
                    // BTC 0.05 
                    result_withdraw_summ = Number(this.currencySumm) + (Number(this.currencySumm) * Number(this.currencyWithdraw.commission))                    
                    break;
                case 2:
                case 6:
                    // USD 0.05 100 * 0.05
                    result_withdraw_summ = Number(this.currencySumm) + (Number(this.currencySumm) * Number(this.currencyWithdraw.commission))
                    // console.log('result_withdraw_summ ', result_withdraw_summ)
                    break;
                case 3:
                case 4:
                case 5:
                case 7:
                    result_withdraw_summ = Number(this.currencySumm) + Number(this.currencyWithdraw.commission)
                    break;
                default:
                    break;
            }

            return result_withdraw_summ
        }
    }
}
</script>