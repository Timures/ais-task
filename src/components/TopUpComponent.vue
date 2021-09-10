<template lang="pug">
    .currency-form
        .commission Комиссия {{ currencyTopUp.commission }}

        .currency-form__input
            label(for="summ") Сумма
            input.summ(type="number", id="summ")
        
        textarea.comment
        button Ввести
</template>

<script>
export default {
    name: 'top-up-component',
    props: ["currencyTopUp"]
}
</script>