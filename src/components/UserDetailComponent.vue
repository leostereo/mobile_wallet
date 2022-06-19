<template>

  <div v-if="!userStore.ready">
    <q-spinner-clock color="primary" size="2em" />
    <q-tooltip :offset="[0, 8]">QSpinnerClock</q-tooltip>
  </div>

  <q-card class="my-card" v-if="userStore.ready">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{ userStore.user.data.name }}</div>
    </q-card-section>
    <q-card-section>
      <q-list dense bordered padding class="rounded-borders">

        <q-item clickable>
          <q-item-section avatar>
            <q-avatar color="teal" text-color="white" icon="check" />
          </q-item-section>
          <q-item-section>{{ userStore.user.data.status }}</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-avatar color="teal" text-color="white" icon="phone" />
          </q-item-section>
          <q-item-section>{{ userStore.user.data.phone }}</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-avatar color="teal" text-color="white" icon="email" />
          </q-item-section>
          <q-item-section>{{ userStore.user.data.email }}</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-avatar color="teal" text-color="white" icon="badge" />
          </q-item-section>
          <q-item-section>{{ userStore.user.data.identification_value }}</q-item-section>
        </q-item>
      </q-list>


    </q-card-section>
    <q-separator />

    <q-card-actions align="right">
      <q-btn flat>Editar</q-btn>
    </q-card-actions>
  </q-card>

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
