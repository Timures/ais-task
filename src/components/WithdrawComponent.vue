<template lang="pug">
    .currency-form

        .currency-form-content
            .content__left
                .currency-form__inputs
                    input.summ(type="number", id="summ", placeholder="Сумма", v-model="withdrawSumm")
                    .currency-form__input(v-if="currencyWithdraw.type == 'Фиатная'")
                        input.summ(type="text", id="summ", placeholder="Реквизиты", v-model="withdrawAdress")
                    .currency-form__input(v-else)
                        input.summ(type="text", id="summ", placeholder="Адрес", v-model="withdrawAdress")
                    textarea.comment(placeholder="Комментарий", v-model="comment")

            .content__right
                <withdraw-commission-info @clear-inputs="clearInputsAfterWithdraw" :currencyWithdraw="currencyWithdraw" :currencySumm="withdrawSumm" />
</template>

<script>
import withdrawCommissionInfo from './WithdrawCommissionInfo.vue'

export default {
    name: 'withdraw-component',
    props: ["currencyWithdraw"],
    data(){
        return {
            withdrawSumm: null,
            withdrawAdress: '',
            comment: ''
        }
    },
    components:{
        withdrawCommissionInfo
    },
    methods: {
        clearInputsAfterWithdraw(){
            this.withdrawSumm = null,
            this.withdrawAdress = '',
            this.comment = ''
        }
    }
}
</script>