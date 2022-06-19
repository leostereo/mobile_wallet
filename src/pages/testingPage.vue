<template>
  <q-page class="flex flex-center">
    testing

    <q-input v-model="token" filled hint="result" />
    <q-btn @click="fireLogin" color="primary" label="call login" />
    <q-btn @click="fireTest" color="primary" label="call test" />
    {{posts}}

  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { api } from 'boot/axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router';


const token = ref('');
const posts = ref('');

onMounted(() => {
  console.log(`the component TESTING is now mounted.`)

  console.log(useRoute());
})

function fireLogin() {
  api.post('http://app.wave/api/login', {

    email: 'ingrogger@gmail.com',
    password: 'Leo!321'
  })
    .then((response) => {
      console.log(response.data)
      token.value = response.data.access_token;
    })
    .catch(() => {
      alert(response.data)
    })

}

function fireTest() {
  api.get('http://app.wave/api/posts', {
          headers: {
        'Authorization': `Bearer ${token.value}`
      }
  }

  )
    .then((response) => {
      console.log(response.data)
      posts.value = response.data;
    })
    .catch(() => {
      alert(response.data)
    })

}
</script>
