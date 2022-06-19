<template>
  <q-page class="flex flex-center">
    <div class="row justify-center  full-width">
      <div class="col-12 col-md-4 ">
        <q-card class="text-white q-mx-md q-py-xl">
          <div class="q-pa-md">
            <div class="q-gutter-y-md column text-center" style="max-width: 300px">
              <div v-if="loading">
                <q-spinner-clock color="primary" size="2em" />
                <q-tooltip :offset="[0, 8]">QSpinnerClock</q-tooltip>
              </div>

              <q-input v-model="email" label="usuario (email)" stack-label />
              <q-input v-model="password" filled type="password" hint="PAssword" />
              <q-btn @click="onSubmit" color="primary" label="Login" />
            </div>
          </div>
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
    .catch(error =>
    {
      loading.value = false;
      console.log('El server devuelve: ' + error)
    });
}


</script>
