<template lang="pug">
    .currency-form
        input.summ(type="number") 
        .commission {{ currencyTopUp.commission }}
        textarea.comment
        button Ввести
</template>

<script>
export default {
    name: 'top-up-component',
    props: ["currencyTopUp"]
}
</script>