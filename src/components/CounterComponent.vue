<template>

                    <div class="text-h6 text-center">{{ storeCounter.count }}</div>


</template>

<script setup>

import { useCounterStore } from 'src/stores/counter'
const storeCounter = useCounterStore() ; 


</script>