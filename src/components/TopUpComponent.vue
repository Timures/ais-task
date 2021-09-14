<template lang="pug">
    .currency-form
        
        .currency-form-content
            .content__left
                .currency-form__inputs
                    input.summ(type="number", placeholder="Сумма", v-model="inputSumm", :class="{error: inputSumm <= currencyTopUp.minimal}")
                    textarea.comment(placeholder="Комментарий", v-model="comment")

            .content__right
                <top-up-commission-info @clear-inputs="clearInputsAfterTopUp" :currencyTopUp="currencyTopUp" :currencySumm="inputSumm" />

                    
</template>

<script>

import topUpCommissionInfo from './TopUpCommissionInfo.vue'

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
        topUpCommissionInfo
    },
    methods: {
        clearInputsAfterTopUp(){
            
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
        padding: 0 1em
        display: grid
        grid-template-columns: 1fr
        grid-gap: 1em
        @media only screen and (max-width: 547px)
            grid-template-columns: 1fr
        @media only screen and (min-width: 548px)
            grid-template-columns: 1fr 1fr
        @media only screen and (min-width: 768px)
            grid-template-columns: 1fr 1fr 1fr
        
        .content__left
            padding-top: 1em
            grid-column: 1/2
            @media only screen and (max-width: 547px)
                grid-column: 1/2
            @media only screen and (min-width: 548px)
                grid-column: 1/2
            @media only screen and (min-width: 768px)
                grid-column: 1/3
            
            input
                width: 100%
                margin-bottom: 1em
                border-top: none
                border-left: none
                border-right: none
                border-bottom: 1px solid rgba(34, 60, 80, 50%)
                background-color: transparent
                padding-left: 0.5em
                border-radius: 0.1em
                &.error
                    border-bottom-color: #502225
                &:focus, &:focus-visible
                    outline: none
                    outline-width: 0
            textarea
                width: 100%
                min-height: 5em
                padding: 0.5em
                border-radius: 0.25em
                &:focus, &:focus-visible
                    outline: none
                    outline-width: 0
        
        .content__right
            
            @media only screen and (max-width: 547px)
                grid-column: 1/2
            @media only screen and (min-width: 548px)
                grid-column: 2/4
            @media only screen and (min-width: 768px)
                grid-column: 3/4
       


    
</style>