<template>

      <LoadingComponent :ready="!authStore.ready" />

      <q-card class="my-card  transparent rounded-frame q-pa-xs" flat v-if="authStore.ready">

        <q-card-section class="bg-primary text-white text-center">
          <div class="text-h6">{{ authStore.user.name }}</div>
        </q-card-section>
        <q-card-section text-color="primary" class="">
          <q-list dense bordered padding class="text-white">
            <q-item clickable>
              <q-item-section avatar>
                <q-avatar color="primary" icon="check" />
              </q-item-section>
              <q-item-section>{{ authStore.user.status }}</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-avatar color="primary" icon="phone" />
              </q-item-section>
              <q-item-section>{{ authStore.user.phone }}</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-avatar color="primary" icon="email" />
              </q-item-section>
              <q-item-section>{{ authStore.user.email }}</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-avatar color="primary" icon="badge" />
              </q-item-section>
              <q-item-section>{{ authStore.user.identification_value }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card flat class="transparent" v-if="authStore.ready">
        <q-card-actions align="right">
          <q-btn icon="edit" round color="primary" class="text-h6 text-weight-bolder  q-px-md" rounded outline />
        </q-card-actions>
      </q-card>

</template>

<script setup>

import { onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth.store';
import LoadingComponent from 'src/components/LoadingComponent.vue';

const authStore = useAuthStore();

onMounted(() => {
  console.log(`the component is now mounted.`)
  authStore.getLocalUserDetails();

})

</script>
