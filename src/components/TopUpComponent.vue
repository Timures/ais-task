<template lang="pug">
    .currency-form
        .summ 
        .commission {{ currencyTopUp.commission }}
        .comment
        button Ввести
</template>

<script>
export default {
    name: 'top-up-component',
    props: ["currencyTopUp"]
}
</script>