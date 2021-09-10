<template lang="pug">
    .currency-form
        .summ 
        .commission {{ currencyWithdraw.commission }}
        .comment
        button Вывести
</template>

<script>
export default {
    name: 'withdraw-component',
    props: ["currencyWithdraw"]
}
</script>