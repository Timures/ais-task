<template lang="pug">
    .currency-form
        .currency-form__calc
            .commission Комиссия {{ currencyWithdraw.commission }}

            .currency-form__input
                label(for="summ") Сумма
                input.summ(type="number", id="summ")
            
        .currency-form__input(v-if="currencyWithdraw.type == 'Фиатная'")
            label(for="adress") Адрес
            input.adress(type="text", id="adress")
        .currency-form__input(v-else)
            label(for="requisites") Реквизиты
            input.requisites(type="text", id="requisites")

        
        textarea.comment
        button Вывести
</template>

<script>
export default {
    name: 'withdraw-component',
    props: ["currencyWithdraw"]
}
</script>

<style lang="sass">
.currency-form
    padding: 1em 0
    border-top: 1px solid red
    display: flex
    flex-direction: column
    button
        margin-top: 0.5em
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