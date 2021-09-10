<template>
  <div id="app">
    
    
      <currency-component v-for="currency in mock_data" :key="currency.id" :currency="currency" />
 
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
