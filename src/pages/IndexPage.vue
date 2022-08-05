<template>
  <q-page class="flex flex-center">
    <div class="row justify-center full-width q-px-md">

      <div class="col-12 col-sm-4 q-px-sm">

        <q-card flat class="my-card transparent rounded-frame q-pa-md" v-if="true">
          <div align="center">
            DASHBOARD
          </div>
          <div align="center">
            {{ authStore.user.name }}
          </div>
          <q-card flat class="my-card transparent" v-if="authStore.token">

            <q-card-section class="text-primary q-ma-md">

              <q-scroll-area 
              style="height: 130px; ">
                <div class="row no-wrap">
                  {{ authStore.token }}
                </div>
              </q-scroll-area>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn icon="copy_all" round color="primary" class="text-h6 text-weight-bolder  q-px-md" 
              rounded outline @click="copy"/>
            </q-card-actions>
          </q-card>
        </q-card>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth.store';
import { useAuth0 } from '@auth0/auth0-vue';
import { copyToClipboard } from 'quasar'
import { onMounted } from 'vue'

const { getAccessTokenSilently } = useAuth0();
const authStore = useAuthStore();


onMounted(() => {
  console.log(`INDEX PAGE : mounted`)
  setToken()

})

async function setToken() {
  const token = await getAccessTokenSilently();
  console.log(`INDEX PAGE: token ready`)
  authStore.token = token;
  console.log(`INDEX PAGE getLocalUserDetails`)
  authStore.getDetails('users');
}

function copy(){
  copyToClipboard(authStore.token)
  .then(() => {
    alert('copied!')
  })
  .catch(() => {
    // fail
  })
}

</script>
