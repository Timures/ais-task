<template lang="pug">
    .currency-list
        <currency-card-component v-for="currency in currentCurrencies" :key="currency.id" :currency="currency" />
</template>

<script>
import CurrencyCardComponent from './CurrencyCardComponent.vue'

export default {
    name: 'currency-component',
    data(){
        return {
            mock_data: null
        }
    },
    components: {
        CurrencyCardComponent
    },
    computed: {
        currentCurrencies(){
            
            return this.$store.getters.GET_CURRENCIES
        }
    }
}
</script>

<style lang="sass">
    .currency-list
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
        grid-gap: 1em
    .currency
        display: flex
        flex-direction: column
    
            
        

</style>