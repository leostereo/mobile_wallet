<template>
  <q-layout view="hHh lpR fFf" class="bg-dark text-primary">

      <q-header elevated class="transparent" height-hint="98" v-if="isAuthenticated">
        <q-toolbar class="text-primary q-mt-md">
          <q-toolbar-title>
            <span class="text-weight-bolder">{{ $route.name }}</span>
          </q-toolbar-title>

          <div class="text-h6">
            <q-btn size="xl" flat round icon="account_circle" class="q-ml-md">
              <q-badge color="primary" floating>4</q-badge>
              <q-menu v-model="show" class="bg-dark rounded-frame text-primary">
                <q-list v-if="isAuthenticated">
                  <q-item>
                    <q-item-section>
                      {{ user.name }}
                    </q-item-section>
                  </q-item>
                  <q-item v-for="button in TopButtons" :key="button.link" :to="button.path" clickable v-close-popup>
                    <q-item-section avatar>
                      <q-icon color="primary" :name="button.icon" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ button.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="primary" name="swipe_left_alt" />
                    </q-item-section>
                    <q-item-section>
                      <q-slider v-model="vert_pos" :min="0" :max="200" color="primary" />

                    </q-item-section>
                  </q-item>


                  <q-item clickable v-close-popup @click="logout">
                    <q-item-section avatar>
                      <q-icon color="primary" name="logout" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Logout</q-item-label>
                    </q-item-section>
                  </q-item>

                </q-list>
                <q-list v-if="!isAuthenticated">
                  <q-separator />
                  <q-item clickable v-close-popup to="/login">
                    <q-item-section avatar>
                      <q-icon color="primary" name="login" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Login</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>

          </div>
        </q-toolbar>
      </q-header>

    <q-page-container v-bind:class="{ 'back_menu': show }">
      <router-view />
      <q-page-sticky v-if="vert_pos" position="bottom-right" :offset="[18, vert_pos]">
        <q-fab color="primary" text-color="black" icon="keyboard_arrow_left" size="lg" direction="left">
          <q-fab-action v-for="navButton in BottomButtons" :key="navButton.path" :icon="navButton.icon" outline
            :to="navButton.path" color="primary" />
        </q-fab>
      </q-page-sticky>

    </q-page-container>

    <q-footer v-if="(!vert_pos) && (isAuthenticated)" elevated class="transparent">
      <q-toolbar :class="{ 'justify-center': !vert_pos, 'justify-end': vert_pos }">

        <div class="text-primary" v-if="false">
          {{ slide }}
        </div>
        <q-carousel v-if="false" v-model="slide" vertical transition-prev="slide-down" transition-next="slide-up"
          swipeable animated control-color="white" padding arrows height="150px"
          class="transparent text-primary  rounded-borders">

          <q-carousel-slide v-for="navButton in BottomButtons" :key="navButton.path" :name="navButton.label"
            class="column no-wrap flex-center">
            <q-btn color="primary" round outline :to="navButton.path" :icon="navButton.icon" />
          </q-carousel-slide>

        </q-carousel>

        <div>
          <q-btn class="q-mx-sx text-primary" v-for="navButton in BottomButtons" :key="navButton.path"
            :to="navButton.path" :icon="navButton.icon" stack size="xl" flat />
        </div>

      </q-toolbar>
    </q-footer>
   

  </q-layout>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { useAuthStore } from 'src/stores/auth.store';
import { useRouter } from "vue-router";
import routes from 'src/router/routes';
import { ref, watch } from 'vue';


//import { useAuth0AuthStore } from 'src/stores/auth0.auth.store';


//const auth0Store = useAuth0AuthStore();
const authStore = useAuthStore();
const router = useRouter(); //borrar
const auth0 = useAuth0();
const show = ref(false);

const isAuthenticated = ref(auth0.isAuthenticated);
const isLoading = ref(auth0.isLoading);
const user = ref(auth0.user);
const ver_pos = ref('40');

//auth0Store.isAuthenticated = ref(auth0.isAuthenticated);
const slide = ref('Dashboard');

const vert_mode = ref(true);
const vert_pos = ref(0);

const BottomButtons = routes.filter(

  function (route) {
    return route.pos == 'bottom';
  });

const TopButtons = routes.filter(

  function (route) {
    return route.pos == 'top';
  });


watch(vert_mode, (mode) => {
  console.log(`pos is ${mode}`)

})

function logout() {

  authStore.clearState();

  auth0.logout({

    returnTo: `${window.location.origin}/login`

  });
}
</script>
