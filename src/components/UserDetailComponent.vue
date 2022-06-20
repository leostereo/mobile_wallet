<template>

  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">

      <div v-if="!userStore.ready">
        <q-spinner-clock color="primary" size="8em" />
        <q-tooltip :offset="[0, 8]">QSpinnerClock</q-tooltip>
      </div>

      <q-card class="my-card  transparent rounded-frame q-pa-xs" flat v-if="userStore.ready">

        <q-card-section class="bg-primary text-white text-center">
          <div class="text-h6">{{ userStore.user.data.name }}</div>
        </q-card-section>
        <q-card-section text-color="primary" class="">
          <q-list dense bordered padding class="text-white">
            <q-item clickable>
              <q-item-section avatar>
                <q-avatar color="primary" icon="check" />
              </q-item-section>
              <q-item-section>{{ userStore.user.data.status }}</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-avatar color="primary" icon="phone" />
              </q-item-section>
              <q-item-section>{{ userStore.user.data.phone }}</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-avatar color="primary" icon="email" />
              </q-item-section>
              <q-item-section>{{ userStore.user.data.email }}</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-avatar color="primary" icon="badge" />
              </q-item-section>
              <q-item-section>{{ userStore.user.data.identification_value }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card flat class="transparent" v-if="userStore.ready">
        <q-card-actions align="right">
          <q-btn icon="edit" round color="primary" class="text-h6 text-weight-bolder  q-px-md" rounded outline />
        </q-card-actions>
      </q-card>


    </div>
  </q-page>
</template>

<script setup>

import { onMounted } from 'vue'
import { useUsersStore } from 'src/stores/users.store';
const userStore = useUsersStore();

onMounted(() => {
  console.log(`the component is now mounted.`)
  userStore.getDetails();

})

</script>
