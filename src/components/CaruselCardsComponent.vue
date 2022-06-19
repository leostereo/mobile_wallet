<template>

  <div v-if="!cardsStore.ready">
    <q-spinner-clock color="primary" size="2em" />
    <q-tooltip :offset="[0, 8]">QSpinnerClock</q-tooltip>
  </div>

  <q-card flat class="my-card" v-if="cardsStore.ready">

    <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated
      control-color="primary" padding arrows height="300px" class="bg-white text-white shadow-5 rounded-borders">
      <q-carousel-slide v-for="card in cardsStore.cards.db_data" :key="card.card_id" :name="card.card_id"
        class="column no-wrap flex-center">
        <div class="q-mt-md text-center">

          <q-card flat bordered class="my-card bg-grey-1">
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


            <q-separator />
          </q-card>
              <div class="row q-mt-lg text-primary">
                            <q-btn v-for="action in actions" :key="action.label"
                            :size="action.size" flat>  {{ action.label }}
                            </q-btn>
              </div>



        </div>



      </q-carousel-slide>
    </q-carousel>



  </q-card>

</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useCardsStore } from 'src/stores/cards.store';
import { CARD_ACTIONS } from 'src/constants'



const cardsStore = useCardsStore();
const actions = CARD_ACTIONS;
const slide = ref('');

onMounted(() => {
  console.log(`the carusel component is now mounted.`)
  cardsStore.getDetails();
  slide.value = cardsStore.firstSlide;

})

</script>
