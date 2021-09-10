<template lang="pug">
    .currency-list
        <currency-card-component v-for="currency in mock_data" :key="currency.id" :currency="currency" />
            
</template>

<script>
import CurrencyCardComponent from './CurrencyCardComponent.vue'

export default {
    name: 'currency-component',
    props: [
        "mock_data"
    ],
    components: {
        CurrencyCardComponent
    }
}
</script>

<style lang="sass">
    .currency-list
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
    .currency-card
        border: 1px solid gray
        padding: 1em
        &.active 
            // grid-column: 1/2
            /* Extra small devices (phones, 600px and down) */
            @media only screen and (max-width: 547px)
                grid-column: 1/2
            /* Small devices (portrait tablets and large phones, 600px and up) */
            @media only screen and (min-width: 548px)
                grid-column: 1/3
            /* Medium devices (landscape tablets, 768px and up) */
            @media only screen and (min-width: 768px)
                grid-column: 1/4
            /* Large devices (laptops/desktops, 992px and up) */
            @media only screen and (min-width: 992px)
                grid-column: 1/4
            /* Extra large devices (large laptops and desktops, 1200px and up) */
            @media only screen and (min-width: 1200px)
                grid-column: 1/4
    .currency
        display: flex
        flex-direction: column
        

</style>