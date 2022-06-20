<template>
  <q-page class="flex flex-center">
    <div class="row justify-center">
      <div class="col-12 col-md-8">

    <q-card flat class="my-card transparent rounded-frame" v-if="true">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md text-h6">
          <q-input dark v-model="email" label="user (your email)" stack-label label-color="primary" color="primary"
            class="text-h6 text-weight-bolder" type="email" />
          <q-input dark v-model="password" label="Password" stack-label label-color="primary" color="primary"
            class="text-h6 text-weight-bolder" type="password" />
        </q-form>
      </div>
    </q-card>

      <q-card  flat class="transparent q-mt-md" align="right">
        <q-btn icon="login" round color="primary" class="text-h6 text-weight-bolder  q-px-md" @click="onSubmit" rounded
          outline />
      </q-card>

      </div>
    </div>
  </q-page>
</template>

<script setup>

import { useAuthStore } from 'src/stores/auth.store';
import { ref } from 'vue'


const authStore = useAuthStore();
const email = ref('leandro@komuny.org');
const password = ref('');
const loading = ref(false);


function onSubmit() {

  loading.value = true;
  return authStore.login(email.value, password.value)
    .catch(error => {
      loading.value = false;
      console.log('El server devuelve: ' + error)
    });
}


</script>


