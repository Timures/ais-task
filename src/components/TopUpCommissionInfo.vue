<template lang="pug">
    .currency-desc
        .type Тип валюты: {{ currencyTopUp.type }}
        .minimal Минимальная сумма ввода: {{ currencyTopUp.minimal }} {{ currencyTopUp.name }}
        .commission-info
            .commission(v-if="currencyTopUp.id == 1 || currencyTopUp.id == 2 || currencyTopUp.id == 6") Комиссия: {{ currencyTopUp.commission * 100}} %
            .commission(v-else) Комиссия: {{ currencyTopUp.commission }} {{ currencyTopUp.name }}
            
        .divider

        .info(v-if="currencySumm >= currencyTopUp.minimal")
            .result(v-if="currencyTopUp.id == 1") 
                div Сумма комиссии: {{ getCommissionSumm(currencyTopUp.id) }} {{ currencyTopUp.name }} 
                div Будет зачислено: {{ getTopUpSumm(currencyTopUp.id)  }} {{ currencyTopUp.name }}

            .result(v-if="currencyTopUp.id == 2 || currencyTopUp.id == 6")
                div Сумма комиссии: {{ parseFloat(Number(currencySumm) * Number(currencyTopUp.commission)) }} {{ currencyTopUp.name }}
                div Будет зачислено: {{ parseFloat( Number(currencySumm) - parseFloat(Number(currencySumm) * Number(currencyTopUp.commission)) ) }} {{ currencyTopUp.name }}

            .result(v-if="currencyTopUp.id == 3 || currencyTopUp.id == 4 || currencyTopUp.id == 5")
                div Будет зачислено: {{ parseFloat(Number((currencySumm - currencyTopUp.commission).toFixed(2))) }} {{ currencyTopUp.name }}

        .divider

        .danger(v-if="currencySumm != null && currencyTopUp.minimal > currencySumm")
            .message Указанная сумма ниже необходимого минимума

        button( @click='topUpAction(currencyTopUp, currencySumm)' :class="{active : currencySumm >= currencyTopUp.minimal }" ) Ввести

</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'top-up-commission-info',
    props: ["currencyTopUp", "currencySumm"],
    data(){
        return {
            // currencySumm: null,
            comment: ''
        }
    },
    methods:{

        ...mapActions([ "CHANGE_CURRENCY_BALANCE_TOPUP" ]),

        topUpAction(currency, curSumm){
            
            if(curSumm >= currency.minimal) {
                let result = this.getTopUpSumm(currency.id)
                
                let balanceToChangeTopUp = {id: currency.id, balance: result}

                this.CHANGE_CURRENCY_BALANCE_TOPUP(balanceToChangeTopUp)
                
                this.$emit('clear-inputs')
            }
            
        },

        getCommissionSumm(currencyID){
            let result_commission_summ = null
            switch (currencyID) {
                case 1:
                    // BTC 0.05 
                    result_commission_summ = Number(this.currencySumm) * Number(this.currencyTopUp.commission)
                    
                    break;
                case 2:
                    // USD 0.05 100 * 0.05
                    result_commission_summ = Number(this.currencySumm) * Number(this.currencyTopUp.commission)
                    break;
                case 3:
                case 4:
                case 5:
                case 7:
                    result_commission_summ = Number(this.currencyTopUp.commission)
                    break;
                default:
                    result_commission_summ = 0
                    break;
            }

            return result_commission_summ
        },

        getTopUpSumm(currencyID){
            let result_withdraw_summ = null
            switch (currencyID) {
                case 1:
                    // BTC 0.05 
                    result_withdraw_summ = Number(this.currencySumm) - (Number(this.currencySumm) * Number(this.currencyTopUp.commission))                    
                    break;
                case 2:
                case 6:
                    // USD 0.05 100 * 0.05
                    result_withdraw_summ = Number(this.currencySumm) - (Number(this.currencySumm) * Number(this.currencyTopUp.commission))
                    // console.log('result_withdraw_summ ', result_withdraw_summ)
                    break;
                case 3:
                case 4:
                case 5:
                case 7:
                    result_withdraw_summ = Number(this.currencySumm) - Number(this.currencyTopUp.commission)
                    break;
                default:
                    break;
            }

            return result_withdraw_summ
        }


    }
}
</script>

<style lang="sass">
.content__right
    
    button
        width: 80%
        margin: 1em auto 0 auto
        cursor: not-allowed
        &.active
            cursor: pointer  
    
    
    .currency-desc
        width: auto
        height: 100%
        box-shadow: 1px 1px 11px -5px rgba(34, 60, 80, 60%)
        padding: 0.7em
        display: flex
        flex-direction: column
        align-items: flex-start
        font-size: 0.9em
        line-height: 1.2em
        border-radius: 0.5em
        .commission-info
            display: flex
        .commission
            margin-right: 0.5em
        .divider
            height: 0.5em
        .danger
            color: #502225
        .message
            text-align: center
            padding-bottom: 0.5em
</style>