<template>

  <q-page class="flex flex-center">

    <q-card flat class="my-card transparent">

      <div class="q-pa-md" style="max-width: 400px">

        <div v-if="!accountsStore.ready">
          <q-spinner-clock color="primary" size="8em" />
          <q-tooltip :offset="[0, 8]">QSpinnerClock</q-tooltip>
        </div>

        <q-card flat class="my-card transparent " v-if="accountsStore.ready">

          <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated
            control-color="primary" padding arrows height="300px" class="rounded-borders transparent">
            <q-carousel-slide v-for="account in accountsStore.accounts.data" :key="account.id" :name="account.id"
              class="column no-wrap flex-center transparent">
              <div class="q-mt-md text-center">

                <q-card flat bordered class="my-card transparent rounded-frame">
                  <q-card-section class="text-danger">
                    <div class="row items-center no-wrap">
                      <div class="col">
                        <div class="text-h4 text-weight-bolder">${{ account.balance }}</div>
                      </div>
                      <div class="col-auto">
                        <q-btn color="white" round flat icon="more_vert">
                          <q-menu cover auto-close class="bg-dark rounded-frame text-primary">
                            <q-list>
                              <q-item v-for="action in actions" :key="action.label" clickable>
                                <q-item-section>{{ action.label }}</q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-section class="text-primary">
                    <div class="text-subtitle2">{{ account.metadata.name }}</div>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions class="text-primary">
                    <q-btn v-for="operation in operations" :key="operation.label" :size="operation.size" flat>
                      {{ operation.label }}</q-btn>
                  </q-card-actions>
                </q-card>

              </div>
            </q-carousel-slide>
          </q-carousel>

          <q-card-actions class="justify-end text-white">

          <div class="row justify-end">
            <q-btn  icon="add" round color="primary"
            class="text-h6 text-weight-bolder  q-px-md" rounded outline/>
          </div>
          </q-card-actions>

        </q-card>


      </div>



    </q-card>
  </q-page>


</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { ACCOUNT_ACTIONS, ACCOUNT_CASH_OPERATION } from 'src/constants'
import { useAccountsStore } from 'src/stores/accounts.store';


const operations = ACCOUNT_CASH_OPERATION;
const actions = ACCOUNT_ACTIONS;
const accountsStore = useAccountsStore();
const slide = ref('');

onMounted(() => {
  console.log(`the carusel component is now mounted.`)
  accountsStore.getDetails();
  slide.value = accountsStore.firstSlide;
})

</script>
