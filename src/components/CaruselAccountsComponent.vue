<template>



    <q-card flat class="my-card transparent">

      <LoadingComponent :ready="!accountsStore.ready" />

        <q-card flat class="my-card transparent"  v-if="accountsStore.ready">

          <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated
            transition-duration="800" control-color="primary" padding arrows height="300px" class="rounded-borders transparent">
            <q-carousel-slide v-for="(account, index) in accountsStore.accounts.data" :key="index" :name="index"
              class="column no-wrap flex-center transparent" >
              <div class="q-mt-md text-center">

                <q-card flat bordered class="my-card transparent rounded-frame" v-bind:class="{ 'back_menu': show  }">
                  <q-card-section class="text-danger">
                    <div class="row items-center no-wrap">
                      <div class="col">
                        <div class="text-h4 text-weight-bolder">${{ account.balance }}</div>
                      </div>
                      <div class="col-auto">
                        <q-btn color="white" round flat icon="more_vert">
                          <q-menu  v-model="show" cover auto-close class="bg-dark rounded-frame text-primary">
                            <q-list>
                              <q-item v-for="action in actions" :key="action.label" clickable @click="accountsStore.action_handler(action.label , account.id)">
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
                    <q-btn v-for="operation in operations" padding="0px 0px" :key="operation.label" :size="operation.size" flat>
                      {{ operation.label }}</q-btn>
                  </q-card-actions>
                </q-card>

              </div>
            </q-carousel-slide>
          </q-carousel>

          <q-card-actions class="justify-center text-white">

         
            <q-btn  icon="add" round color="primary"
            class="text-h6 text-weight-bolder  q-px-md" rounded outline/>
      
          </q-card-actions>

        </q-card>

    </q-card>



</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useAccountsStore } from 'src/stores/accounts.store';
import LoadingComponent from 'src/components/LoadingComponent.vue';
import { ACCOUNT_ACTIONS, ACCOUNT_CASH_OPERATION } from 'src/constants'


const operations = ACCOUNT_CASH_OPERATION;
const accountsStore = useAccountsStore();
const actions = ACCOUNT_ACTIONS;
const show = ref(false);
const slide = ref(0);

 

onMounted(() => {

  console.log(`the accounts carusel component is now mounted.`)
  accountsStore.getDetails();

})



</script>
