<template>
  <q-page class="flex flex-center">
    <div class="row justify-center full-width">
      <div class="col-12 col-sm-4 q-px-sm">

        <q-card flat class="my-card transparent rounded-frame" v-if="true">
          <q-card-actions align="center">

            <q-btn @click="onSubmit"
            label="Login with google" stack
            class="text-h6 text-weight-bolder  q-px-md" icon="login" />

          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>

import { useFirebaseAuthStore } from 'src/stores/firebase.auth.store';
import { ref } from 'vue'


const firebaseAuthStore = useFirebaseAuthStore();
const loading = ref(false);

//functions

function onSubmit() {

  loading.value = true;
  firebaseAuthStore.login()

}


const signInWithGoogle = () => {
  console.log('sgin wit google')
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user)


    });
}
</script>
