<template>
  <q-page class="flex flex-center">
    <div class="row justify-center full-width">
      <div class="col-12 col-sm-4 q-px-sm">

        <q-card flat class="my-card transparent" v-if="true">
          <q-card-actions align="center">

            <q-btn @click="login" label="login" stack class="rounded-frame text-h6 text-weight-bolder  q-py-xl"
              icon="login" />

          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { onBeforeMount } from 'vue'

const auth0 = useAuth0();


onBeforeMount(() => {

  console.log(`the login component is before mounted.`)
  

})

async function login() {

  await auth0.loginWithRedirect();

}

</script>
