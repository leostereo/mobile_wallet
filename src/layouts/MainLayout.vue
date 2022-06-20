<template>
  <q-layout view="hHh lpR fFf" class="bg-dark text-primary">
    <q-header elevated class="transparent" height-hint="98">
      <q-toolbar class="text-primary q-mt-md">
        <q-toolbar-title>
          <span class="text-weight-bolder">{{ $route.name }}</span>
        </q-toolbar-title>

        <div class="text-h6">

          <q-btn size="xl"  flat round icon="account_circle" class="q-ml-md">
            <q-badge color="primary" floating>4</q-badge>
            <q-menu class="bg-dark rounded-frame text-primary">
              <q-list>
                <q-item v-for="button in TopButtons" :key="button.link" :to="button.path" clickable v-close-popup
                  @click="onItemClick">
                  <q-item-section avatar>
                    <q-icon color="primary" :name="button.icon"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ button.label }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />

                <q-item clickable v-close-popup @click="authStore.logout()" v-if="!!authStore.user?.access_token">
                  <q-item-section avatar>
                    <q-icon color="primary" name="logout"/>
                  </q-item-section>
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

    <q-footer elevated class="transparent">
      <q-toolbar class="justify-center">

        <q-btn class="q-mx-sx text-primary"  v-for="navButton in BottomButtons" :key="navButton.path"
          :to="navButton.path" :icon="navButton.icon" stack size="xl" flat/>

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
