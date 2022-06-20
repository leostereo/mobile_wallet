<template>
  <q-page class="flex flex-center">

    <q-card flat class="my-card transparent rounded-frame" v-if="true">

      <div class="q-pa-md" style="max-width: 400px">

        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md text-h6">
          <q-input dark v-model="base_api" label="base api url with port included"
          stack-label label-color="primary" color="primary"
          class="text-h6 text-weight-bolder" type="url"
          />


          <q-toggle v-model="theme" label="dark mode(very soon!)" />


          <div class="row justify-end">
            <q-btn label="Guardar" type="submit" color="primary"
            class="text-h6 text-weight-bolder" rounded outline/>
          </div>

        </q-form>

      </div>



    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { CONSTANTS } from 'src/constants'
import { useAuthStore } from 'src/stores/auth.store';

const authStore = useAuthStore();
const base_api = ref('');
const theme = ref(false)

function onSubmit() {
  CONSTANTS.base_url = base_api.value;
  authStore.base_api = base_api.value;

}

function onReset() {
  base_api.value = null
}

onMounted(() => {

})

</script>
