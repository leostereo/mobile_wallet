<template>
  <q-card flat class="my-card transparent q-mt-xs">

    <LoadingComponent :ready="!authStore.ready" />

    <div v-if="Object.keys(authStore.cards).length === 0 && authStore.ready">
      <q-card class="q-mx-md bg-dark rounded-frame rounded-borders text-primary text-center">
        <q-card-section>
          <div class="text-h6">NO HAS CREADO NINGUNA TARJETA</div>
          <div class="text-h6">PUEDES CREARLAS DESDE EL MENU DE CUENTAS</div>
        </q-card-section>
      </q-card>
    </div>

    <q-card v-else flat class="my-card transparent">
      <q-carousel v-if="authStore.ready" v-model="slide" transition-prev="scale" transition-next="scale" swipeable
        animated transition-duration="800" control-color="primary" padding arrows class="transparent">
        <q-carousel-slide v-for="(card, index) in authStore.cards.db_data" :key="index" :name="index"
          class="column no-wrap flex-center transparent">
          <div class="q-mt-md text-center">
            <q-card flat class="my-card transparent  rounded-frame q-pa-xs">
              <q-card-section class="bg-primary text-white">
                <div class="text-subtitle2">{{ card.card_type }}</div>
              </q-card-section>

              <q-card-section class="text-primary">
                <CardNumberComponent :pan="card.pan" />
              </q-card-section>

              <q-card-section class="text-primary justify-around">
                <div class="row justify-around">
                  <div class="col">
                    <span>EXP </span>{{ card.expiration }}
                  </div>
                  <div class="col">
                    <CvvComponent :cvv="card.cvv" />
                  </div>
                </div>
              </q-card-section>


            </q-card>

            <div class="row q-mt-lg text-primary justify-around">
              <div v-for="action in actions" :key="action.label" class="col">
                <q-btn :size="action.size" flat> {{ action.label }}
                </q-btn>
              </div>
            </div>

          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-card>
  </q-card>
</template>

<script setup>

import { CARD_ACTIONS } from 'src/constants'
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth.store';
import CvvComponent from 'src/components/CvvComponent.vue';
import LoadingComponent from 'src/components/LoadingComponent.vue';
import CardNumberComponent from 'src/components/CardNumberComponent.vue';


const authStore = useAuthStore();
const actions = CARD_ACTIONS;
const slide = ref(0);
const slides = computed(() => cardsStore.firstSlide)

onMounted(() => {

  console.log(`the carusel cards component is now mounted.`)
  authStore.getDetails('cards/users/list');

})


</script>
