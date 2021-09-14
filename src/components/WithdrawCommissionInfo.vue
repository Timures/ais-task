<template lang="pug">
    .currency-desc
        .type Тип валюты: {{ currencyWithdraw.type }}
        .minimal Минимальная сумма ввода: {{ currencyWithdraw.minimal }} {{ currencyWithdraw.name }}
        .commission-info
            .commission(v-if="currencyWithdraw.id == 1 || currencyWithdraw.id == 2 || currencyWithdraw.id == 6") Комиссия: {{ currencyWithdraw.commission * 100}} %
            .commission(v-else) Комиссия: {{ currencyWithdraw.commission }} {{ currencyWithdraw.name }}
            
        .divider

        .info(v-if="currencySumm >= currencyWithdraw.minimal")
            .result(v-if="currencyWithdraw.id == 1") 
                div Сумма комиссии: {{ parseFloat(Number(currencySumm) * Number(currencyWithdraw.commission)).toFixed(5) }} {{ currencyWithdraw.name }} 
                div Будет зачислено: {{ parseFloat( Number(currencySumm) - parseFloat(Number(currencySumm) * Number(currencyWithdraw.commission)).toFixed(5) )  }} {{ currencyWithdraw.name }}

            .result(v-if="currencyWithdraw.id == 2 || currencyWithdraw.id == 6")
                div Сумма комиссии: {{ parseFloat(Number(currencySumm) * Number(currencyWithdraw.commission)) }} {{ currencyWithdraw.name }}
                div Будет зачислено: {{ parseFloat( Number(currencySumm) - parseFloat(Number(currencySumm) * Number(currencyWithdraw.commission)) ) }} {{ currencyWithdraw.name }}

            .result(v-if="currencyWithdraw.id == 3 || currencyWithdraw.id == 4 || currencyWithdraw.id == 5")
                div Будет зачислено: {{ parseFloat(Number((currencySumm - currencyWithdraw.commission).toFixed(2))) }} {{ currencyWithdraw.name }}

        .divider

        .danger(v-if="currencySumm != null && currencyWithdraw.minimal > currencySumm")
            .message Указанная сумма ниже необходимого минимума

        button( @click='withdrawAction(currencyWithdraw, currencySumm)' :class="{active : currencySumm >= currencyWithdraw.balance }" ) Ввести

</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'withdraw-commission-info',
    props: ["currencyWithdraw", "currencySumm"],
    data(){
        return {
            // currencySumm: null,
            comment: ''
        }
    },
    methods: {

        ...mapActions([ "CHANGE_CURRENCY_BALANCE_WITHDRAW" ]),

        withdrawAction(currency, wdSumm){

            // first get commision summ
            let result_with_commision = null

            switch (currency.id) {
                case 1:
                    result_with_commision = parseFloat(Number(wdSumm) + Number((wdSumm * currency.commission).toFixed(5)))
                    break;
                case 2:
                    result_with_commision = parseFloat(Number(wdSumm) + Number((wdSumm * currency.commission).toFixed(2)))
                    break;
                case 3:
                case 4:
                case 5:
                case 7:
                    result_with_commision = parseFloat(Number(wdSumm) + Number(currency.commission.toFixed(2)))
                    break;            
                default:
                    result_with_commision = Number(wdSumm) + ( Number(wdSumm) - Number(currency.commission)).toFixed(5)
                    break;
            }
            // console.log('result_with_commision ', result_with_commision)
            if(result_with_commision <= currency.balance) {
                
                let balanceToWithdraw = {id: currency.id, balance: result_with_commision}

                this.CHANGE_CURRENCY_BALANCE_WITHDRAW(balanceToWithdraw)
            }
            
        },
    }
}
</script>

<style lang="sass">
.content__right
    padding-left: 1em
    grid-column: 3/4
    
    button
        width: 80%
        margin: 1em auto 0 auto
        cursor: not-allowed
        &.active
            cursor: pointer  
    @media only screen and (max-width: 547px)
        padding-left: 0
        margin: 1.5em auto 0 auto
        grid-column: 1/4
        width: 100%
    
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