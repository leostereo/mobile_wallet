<template>
  <q-page class="flex flex-center">
    <div class="row justify-center full-width">
      <div class="col-12 col-sm-4 q-px-sm">

        <q-card flat class="my-card transparent rounded-frame" v-if="true">
          <q-card-actions align="center">

            <q-btn @click="login" label="Login with google" stack class="text-h6 text-weight-bolder  q-px-md"
              icon="login" />

          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { ref, watch } from 'vue'

const auth0 = useAuth0();
const loading = ref(false);
const user = ref(auth0.user);

watch(user, (authenticated) => {
  console.log(`user is ${authenticated.name}`)

})

async function login() {
  loading.value = true;

  await auth0.loginWithRedirect();

}

</script>
