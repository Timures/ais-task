<template lang="pug">
    .currency-form
        .commission Комиссия {{ currencyTopUp.commission }} 
        .result(v-if="currencyTopUp.id == 1 || currencyTopUp.id == 7") Расчет {{ parseFloat(Number(currencySumm) * currencyTopUp.commission.toFixed(5)).toFixed(5) }}
        .result(v-else) Расчет {{ parseFloat(Number(currencySumm) * currencyTopUp.commission.toFixed(5)).toFixed(3) }}

        .currency-form__input
            label(for="summ") Сумма
            input.summ(type="number", id="summ", v-model="currencySumm")
        
        textarea.comment(placeholder="Комментарий")
        button( @click='topUpAction(currencyTopUp, currencySumm)' :class="{active : currencySumm > currencyTopUp.minimal }" ) Ввести
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'top-up-component',
    props: ["currencyTopUp"],
    data(){
        return {
            currencySumm: null
        }
    },
    methods:{

        ...mapActions([ "CHANGE_CURRENCY_BALANCE_TOPUP" ]),

        topUpAction(currency, curSumm){
            
            if(curSumm >= currency.minimal) {
                let result

                switch (currency.id) {
                    case 1: // BTC
                        result = parseFloat(Number(curSumm) - Number((curSumm * currency.commission).toFixed(5)))
                        break;
                    case 2: // USD
                        result = parseFloat(Number(curSumm) - Number((curSumm * currency.commission).toFixed(2)))
                        break;
                    case 3:
                    case 4: // LTc
                    case 5: // SHIB
                        result = parseFloat(Number((curSumm - currency.commission).toFixed(2)))
                        console.log(result, curSumm, (curSumm - currency.commission).toFixed(2))
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
            }
            
        },


    }
}
</script>