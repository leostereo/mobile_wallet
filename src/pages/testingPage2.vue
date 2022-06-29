<template>
  <q-page class="flex flex-center">
    <div class="row justify-center  full-width">
      <div class="col-12 col-sm-4 q-px-sm">
        <q-card class="text-white q-mx-md q-py-xl"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
          <CounterComponent />

          <div class="row justify-center">
            <div class="col-2 text-center">
              <q-btn round color="primary" label="+" @click="storeCounter.increaseCount" />
            </div>
            <div class="col-2 text-center">
              <q-btn round color="primary" label="-" @click="storeCounter.decreaseCount" />
            </div>
            <div class="col-4 text-center">
              This counter is {{ storeCounter.oddOrEven }}
            </div>
            <div class="col-4 text-center">
              <q-input v-model="storeCounter.count" filled size="5" label="Edit counter" />
            </div>
          </div>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useCounterStore } from 'src/stores/counter'
import CounterComponent from 'src/components/CounterComponent.vue'
const storeCounter = useCounterStore();


</script>
