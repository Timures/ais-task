<template>
  <div id="app">
      <currency-component v-for="currency in fiatMockData" :key="currency.id" :currency="currency" />
      <currency-component v-for="currency in cryptoMockData" :key="currency.id" :currency="currency" />
  </div>
</template>

<script>
import mock from './assets/mock.json'


import CurrencyComponent from './components/CurrencyComponent.vue'

export default {
  name: 'App',
  components: { 
    CurrencyComponent
  },
  data(){
    return {
      mock_data: mock
    }
  },
  computed:{
    fiatMockData: function() {
      let fiat = this.mock_data.filter(item => item.type == 'Фиатная')
      return fiat
    },
    cryptoMockData: function() {
      let crypto = this.mock_data.filter(item => item.type == 'Криптовалюта')
      return crypto
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
