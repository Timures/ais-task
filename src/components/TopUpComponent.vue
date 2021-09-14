<template lang="pug">
    .currency-form
        
        .currency-form-content
            .content__left
                .currency-form__inputs
                    input.summ(type="number", placeholder="Сумма", v-model="currencySumm", :class="{error: currencySumm <= currencyTopUp.minimal}")
                    textarea.comment(placeholder="Комментарий", v-model="comment")

            .content__right
                .currency-desc
                    .type Тип валюты: {{ currencyTopUp.type }}
                    .minimal Минимальная сумма ввода: {{ currencyTopUp.minimal }} {{ currencyTopUp.name }}
                    .commission-info
                        .commission(v-if="currencyTopUp.id == 1 || currencyTopUp.id == 2 || currencyTopUp.id == 6") Комиссия: {{ currencyTopUp.commission * 100}} %
                        .commission(v-else) Комиссия: {{ currencyTopUp.commission }} {{ currencyTopUp.name }}
                       
                    .divider

                    .info(v-if="currencySumm >= currencyTopUp.minimal")
                        .result(v-if="currencyTopUp.id == 1") 
                            div Сумма комиссии: {{ parseFloat(Number(currencySumm) * Number(currencyTopUp.commission)).toFixed(5) }} {{ currencyTopUp.name }} 
                            div Будет зачислено: {{ parseFloat( Number(currencySumm) - parseFloat(Number(currencySumm) * Number(currencyTopUp.commission)).toFixed(5) )  }} {{ currencyTopUp.name }}

                        .result(v-if="currencyTopUp.id == 2 || currencyTopUp.id == 6")
                            div Сумма комиссии: {{ parseFloat(Number(currencySumm) * (Number(currencyTopUp.commission.toFixed(2)/100))).toFixed(2) }} {{ currencyTopUp.name }}
                            div Будет зачислено: {{ parseFloat( Number(currencySumm) - parseFloat(Number(currencySumm) * (Number(currencyTopUp.commission.toFixed(2)/100))).toFixed(2) ) }} {{ currencyTopUp.name }}

                        .result(v-if="currencyTopUp.id == 3 || currencyTopUp.id == 4 || currencyTopUp.id == 5")
                            div Будет зачислено: {{ parseFloat(Number((currencySumm - currencyTopUp.commission).toFixed(2))) }} {{ currencyTopUp.name }}

                    .divider

                    .danger(v-if="currencySumm != null && currencyTopUp.minimal > currencySumm")
                        .message Указанная сумма ниже необходимого минимума

                    button( @click='topUpAction(currencyTopUp, currencySumm)' :class="{active : currencySumm > currencyTopUp.minimal }" ) Ввести
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'top-up-component',
    props: ["currencyTopUp"],
    data(){
        return {
            currencySumm: null,
            comment: ''
        }
    },
    methods:{

        ...mapActions([ "CHANGE_CURRENCY_BALANCE_TOPUP" ]),

        topUpAction(currency, curSumm){
            
            if(curSumm >= currency.minimal) {
                let result

                switch (currency.id) {
                    case 1: // BTC 0.001 - (0.001 * 0.05) = 0.00095 (0.001 - 0.00005) = 0.00095
                        result = parseFloat( Number(curSumm) - ( Number(curSumm) * Number(currency.commission) ) )                        
                        break;
                    case 2: // USD 100 - (100 * 0.05) = 99.95
                        result = parseFloat( Number(curSumm) - ( Number(curSumm) * Number(currency.commission) ) )                   
                        break;
                    case 3:
                    case 4: // LTc
                    case 5: // SHIB
                        result = parseFloat(Number((curSumm - currency.commission).toFixed(2)))
                        // console.log(result, curSumm, (curSumm - currency.commission).toFixed(2))
                        break;
                    case 7: // BNB
                        result = parseFloat(Number((curSumm - currency.commission).toFixed(5)))
                        break;
                
                    default:
                        result = parseFloat(Number((curSumm - currency.commission).toFixed(2)))
                        break;
                }
                
                let balanceToChangeTopUp = {id: currency.id, balance: result}

                this.CHANGE_CURRENCY_BALANCE_TOPUP(balanceToChangeTopUp)
                this.currencySumm = null
                this.comment = ''
            }
            
        },


    }
}
</script>

<style lang="sass">
.currency-form
    margin-top: 1em
    &__inputs
        display: flex
        flex-direction: column
        width: 100%
    &-content
        display: grid
        grid-template-columns: repeat(auto-fill)
        .content__left
            grid-column: 1/3
            @media only screen and (max-width: 547px)
                grid-column: 1/4
            padding-top: 1em
            input
                margin-bottom: 1em
                border-top: none
                border-left: none
                border-right: none
                border-bottom: 1px solid rgba(34, 60, 80, 50%)
                background-color: transparent
                padding-left: 0.5em
                &.error
                    border-bottom-color: #502225
                &:focus, &:focus-visible
                    outline: none
                    outline-width: 0
            textarea
                width: 100%
                min-height: 5em
                padding: 0.5em
                &:focus, &:focus-visible
                    outline: none
                    outline-width: 0
        .content__right
            padding-left: 1em
            grid-column: 3/4
            
            button
                width: 7em
                cursor: not-allowed
                &.active
                  cursor: pointer  
            @media only screen and (max-width: 547px)
                padding-left: 0
                margin-top: 1.5em
                grid-column: 1/4
                button
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