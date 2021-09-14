<template>
  <div id="app" class="container">
    <h1>Test task</h1>
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
@import './assets/reset';
@import './assets/normalize';
body
  background-color: #F8F6F6
  color: #283450
#app
  margin-top: 60px


.container
  padding: 0.5em
  margin: 0 auto
  max-width: 60em
  min-width: 20em
  h1
    text-align: center
button
  border: 1px solid lighten(#222b50, 10%)
  border-radius: 0.2em
  background-color: #F8F6F6
  cursor: pointer
  min-height: 1.8em
  min-width: 2.4em
  width: 4em
  transition: all ease-in 0.15s
  color: #222b50
  &:hover
    border-color: #222b50
    background-color: lighten(#222b50, 65%)
    
  &.active
    border-color: #222b50
    background-color: lighten(#222b50, 65%)
    color: #222b50

</style>
