<template lang="pug">
    .currency-form
        .currency-form__calc
            .commission Комиссия {{ currencyWithdraw.commission }}

            .currency-form__input
                label(for="summ") Сумма
                input.summ(type="number", id="summ", v-model="withdrawSumm")
            
        .currency-form__input(v-if="currencyWithdraw.type == 'Фиатная'")
            label(for="adress") Адрес
            input.adress(type="text", id="adress")
        .currency-form__input(v-else)
            label(for="requisites") Реквизиты
            input.requisites(type="text", id="requisites")

        
        textarea.comment
        button( @click='withdrawAction(currencyWithdraw, withdrawSumm)' :class="{ active: (withdrawSumm < currencyWithdraw.balance)&&withdrawSumm != null }" ) Вывести
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'withdraw-component',
    props: ["currencyWithdraw"],
    data(){
        return {
            withdrawSumm: null
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
.currency-form
    margin-top: 1em
    border-top: 1px solid red
    display: flex
    flex-direction: column
    
    button
        margin-top: 0.5em
        &.active, &:active
           background-color: lightgreen 

.currency-form__calc
    display: flex
    flex-direction: column
    justify-content: start
.currency-form__input
    margin-bottom: 1em
    display: flex
    width: 100%
    justify-content: start
    label
        margin-right: 0.5em
    input
        width: 100%

.commission
    margin-left: 1em
    margin-bottom: 0.5em
    display: flex
    justify-content: end
    font-size: 0.8em
</style>