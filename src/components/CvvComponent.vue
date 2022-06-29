<template>

      <div align="center" @click="toggle">
          <span> <strong>CVV  </strong></span>
          <span v-if="visible">{{cvv}}</span>
          <span v-else> •••</span>
      </div>

</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false)
const props = defineProps(['cvv'])
function toggle(){
  visible.value = !visible.value;
}

</script>
