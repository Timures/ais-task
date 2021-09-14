<template lang="pug">
    .currency-form
        
        .currency-form-content
            .content__left
                .currency-form__inputs
                    input.summ(type="number", placeholder="Сумма", v-model="inputSumm", :class="{error: inputSumm <= currencyTopUp.minimal}")
                    textarea.comment(placeholder="Комментарий", v-model="comment")

            .content__right
                <currency-info-component @clear-inputs="clearInputsAfterTopUp" :currencyTopUp="currencyTopUp" :currencySumm="inputSumm" />

                    
</template>

<script>

import currencyInfoComponent from './currencyInfoComponent.vue'

export default {
    name: 'top-up-component',
    props: ["currencyTopUp"],
    data(){
        return {
            inputSumm: null,
            comment: ''
        }
    },
    components: {
        currencyInfoComponent
    },
    methods: {
        clearInputsAfterTopUp(){
            console.log('emit')
            this.inputSumm = null
            this.comment = ''
        }
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
        


    
</style>