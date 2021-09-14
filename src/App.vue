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
@import './assets/reset';
@import './assets/normalize';
body
  background-color: #F8F6F6
  color: #283450
#app
  
  // text-align: center
  // color: #2c3e50
  margin-top: 60px
  // background-color: #c4c4c4

.container
  padding: 0.5em
  margin: 0 auto
  max-width: 60em
  min-width: 20em
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
