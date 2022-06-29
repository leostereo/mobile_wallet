<template>

      <div @click="toggle" align="center">

                    <span  v-show="visible">{{ pan.substr(0, 4)+' ' }}</span>
                    <span  v-show="visible">{{ pan.substr(4, 4)+' ' }}</span>
                    <span  v-show="visible">{{ pan.substr(8, 4)+' ' }}</span>

            <span v-show="!visible">•••• •••• •••• </span>

      <span>{{ pan.substr(12, 4) }}</span>
      </div>


</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false)
const props = defineProps(['pan'])
function toggle(){
  visible.value = !visible.value;
}

</script>
