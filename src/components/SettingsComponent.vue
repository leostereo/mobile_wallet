<template>
<span>version 1.0.0</span>
      <q-card flat class="my-card transparent rounded-frame q-pa-md" v-if="true">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md text-h6">
            <q-input dark v-model="base_api" label="base api url with port included" stack-label label-color="primary"
              color="primary" class="text-h6 text-weight-bolder" type="url" />

            <q-toggle v-model="theme" label="dark mode(very soon!)" />
           

          </q-form>
      </q-card>

      <q-card  flat class="transparent q-mt-md" align="right">
        <q-btn icon="save" round color="primary" class="text-h6 text-weight-bolder  q-px-md" type="submit" rounded
          outline />
      </q-card>
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
