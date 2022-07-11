<template>

      <div v-if="ready" align="center" class="q-mt-xl">
        <q-spinner-clock color="primary" size="8em" />
        <q-tooltip :offset="[0, 8]">QSpinnerClock</q-tooltip>
      </div>

</template>

<script setup>


const props = defineProps(['ready'])


</script>
