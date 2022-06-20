<template>
  <q-page class="flex flex-center">
    <q-card flat class="my-card transparent">
      <div class="q-pa-xs" style="max-width: 400px">

        <div v-if="!cardsStore.ready">
          <q-spinner-clock color="primary" size="8em" />
          <q-tooltip :offset="[0, 8]">QSpinnerClock</q-tooltip>
        </div>

        <q-card flat class="my-card transparent" v-if="cardsStore.ready">

          <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated
            transition-duration="800" control-color="primary" padding arrows height="320px" class="transparent">
            <q-carousel-slide v-for="(card, index) in cardsStore.cards.db_data" :key="index" :name="index"
              class="column no-wrap flex-center transparent">
              <div class="q-mt-md text-center">

                <q-card flat class="my-card transparent  rounded-frame q-pa-xs">
                  <q-card-section class="bg-primary text-white">
                    <div class="text-subtitle2">{{ card.card_type }}</div>
                  </q-card-section>

                  <q-card-section class="text-primary">
                    <span>{{ card.pan.substr(0, 4) }}</span><br>
                    <span>{{ card.pan.substr(4, 4) }}</span><br>
                    <span>{{ card.pan.substr(8, 4) }}</span><br>
                    <span>{{ card.pan.substr(12, 4) }}</span><br>
                  </q-card-section>

                  <q-card-section class="text-primary">
                    <span>EXP </span>{{ card.expiration }}
                  </q-card-section>


                </q-card>
                <div class="row q-mt-lg text-primary">
                  <q-btn v-for="action in actions" :key="action.label" :size="action.size" flat> {{ action.label }}
                  </q-btn>
                </div>

              </div>
            </q-carousel-slide>
          </q-carousel>
        </q-card>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed , onMounted} from 'vue'
import { useCardsStore } from 'src/stores/cards.store';
import { CARD_ACTIONS } from 'src/constants'

const cardsStore = useCardsStore();
const actions = CARD_ACTIONS;
const slide = ref(0);
const slides = computed(() => cardsStore.firstSlide)

onMounted(() => {

  console.log(`the carusel component is now mounted.`)
  cardsStore.getDetails();

})


</script>
