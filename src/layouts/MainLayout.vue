<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          {{ $route.name }}
        </q-toolbar-title>

        <div class="text-h6">

          <q-btn size="md" flat color="white" round icon="account_circle" class="q-ml-md">
            <q-badge color="red" floating>4</q-badge>
            <q-menu>
              <q-list>
                <q-item>
                  <q-toggle v-model="bluetooth" label="dark (soon)" />
                </q-item>

                <q-item v-for="button in TopButtons" :key="button.link" :to="button.path" clickable v-close-popup
                  @click="onItemClick">
                  <q-item-section>
                    <q-item-label>{{ button.label }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="authStore.logout()" v-if="!!authStore.user?.access_token">
                  <q-item-section>
                    <q-item-label>Logout</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>



        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <q-toolbar class="justify-center">
        <q-btn class="q-mx-sx" v-for="navButton in navButtons" :key="navButton.title" :label="navButton.title"
          :icon="navButton.icon" :to="navButton.link" stack />

        <q-btn class="q-mx-sx" v-for="navButton in BottomButtons" :key="navButton.path" :label="navButton.label"
          :to="navButton.path" :icon="navButton.icon" stack />

      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>

import { useAuthStore } from 'src/stores/auth.store';
import routes from 'src/router/routes'
import { ref } from 'vue'



const authStore = useAuthStore();

const BottomButtons = routes.filter(

  function (route) {
    return route.pos == 'bottom';
  });

const TopButtons = routes.filter(

  function (route) {
    return route.pos == 'top';
  });


</script>
