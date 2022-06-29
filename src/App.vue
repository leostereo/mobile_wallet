<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>

.rounded-frame{

  border: 3px;
  border-style: solid;
  border-color: #ff8800;
  border-radius: 10px;
}

.q-btn--outline:before {
    border: 4px solid currentColor;
}

.back_menu {
  opacity: 0.2;
}
</style>
