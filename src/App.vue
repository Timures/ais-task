<template>
  <div id="app" class="container">
    <currency-component />
  </div>
</template>

<script>
import CurrencyComponent from './components/CurrencyComponent.vue'

export default {
  name: 'App',
  components: { 
    CurrencyComponent
  }
}
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

.container
  margin: 0 1em

</style>
