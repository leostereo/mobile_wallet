<template>



  <q-card flat class="my-card transparent">

    <LoadingComponent :ready="!authStore.ready" />

    <q-card flat class="my-card transparent" v-if="authStore.ready">

      <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated
        transition-duration="800" control-color="primary" padding arrows height="300px"
        class="rounded-borders transparent">
        <q-carousel-slide v-for="(account, index) in authStore.accounts.data" :key="index" :name="index"
          class="column no-wrap flex-center transparent">
          <div class="q-mt-md text-center">

            <q-card flat bordered class="my-card transparent rounded-frame"
              v-bind:class="{ 'back_menu': (show || addDialog) }">
              <q-card-section class="text-danger">
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-h4 text-weight-bolder">${{ account.balance }}</div>
                  </div>
                  <div class="col-auto">
                    <q-btn color="white" round flat icon="more_vert">
                      <q-menu v-model="show" cover auto-close class="bg-dark rounded-frame text-primary">
                        <q-list>
                          <q-item v-for="action in actions" :key="action.label" clickable
                            @click="action_handler('update', action.status, account.id)">
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
              <q-card-section class="text-primary">
                <div class="text-subtitle2">{{ account.status }}</div>
              </q-card-section>
              <q-separator />

              <q-card-actions v-if="account.status == 'ACTIVE'" class="text-primary">

                <q-btn v-for="operation in operations" padding="0px 0px" :key="operation.label"
                  @click="action_handler('cashModal', operation.type, account.id)" :size="operation.size" flat>
                  {{ operation.label }}</q-btn>

              </q-card-actions>

              <q-dialog v-model="sendModal">
                <q-card class="bg-dark rounded-frame rounded-borders text-primary"
                  style=" min-height: 45%; max-width: 80vw;">
                  <q-card-section>
                    <div class="text-h6">sendModal</div>
                  </q-card-section>
                </q-card>
              </q-dialog>
              <q-dialog v-model="cashinModal">
                <q-card class="bg-dark rounded-frame rounded-borders text-primary"
                  style=" min-height: 45%; max-width: 80vw;">

                  <q-card-section>
                    <div class="text-h6">Deposito de dinero</div>
                  </q-card-section>
                  <q-card-section  class="bg-primary text-white text-center">
                    <div class="text-h6">tiket generado OK</div>
                  </q-card-section>
                  <q-card-section  class="q-pt-none text-center q-mt-lg">
                    {{ alias }}
                  </q-card-section>

                </q-card>
              </q-dialog>
              <q-dialog v-model="cashoutModal">
                <q-card class="bg-dark rounded-frame rounded-borders text-primary"
                  style=" min-height: 45%; max-width: 80vw;">
                  <q-card-section>
                    <div class="text-h6">Extraccion de dinero</div>
                  </q-card-section>

                  <q-card-section v-if="!cashoutResult" class="q-pt-none">
                    <q-input dark v-model="amount" label="Monto" stack-label label-color="primary" color="primary"
                      type="number" class="text-h6 text-weight-bolder q-my-md" />
                  </q-card-section>

                  <q-card-section v-if="cashoutResult" class="bg-primary text-white text-center">
                    <div class="text-h6">tiket generado OK</div>
                  </q-card-section>
                  <q-card-section v-if="cashoutResult" class="q-pt-none text-center q-mt-lg">
                    {{ alias }}
                  </q-card-section>

                  <q-card-actions v-if="!cashoutResult" align="right" class="q-mt-xl">
                    <q-btn label="Solicitar" @click="action_handler('cashOper', 'cashout', account.id)" color="primary"
                      class="q-px-xl q-mr-md" rounded outline />
                  </q-card-actions>
                  <q-card-actions v-if="cashoutResult" align="right" class="q-mt-xl">
                    <q-btn label="Listo!" @click="(cashoutResult = false, cashoutModal = false, alias = '')"
                      color="primary" class="q-px-xl q-mr-md" rounded outline />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <q-dialog v-model="newCardModal">
                <q-card class="bg-dark rounded-frame rounded-borders text-primary text-center q-pa-xl">
                  <q-card-section>
                    <div class="text-h6">Crear tarjeta</div>
                  </q-card-section>

                  <q-card-actions align="center" class="q-mt-xl">
                    <q-btn disable label="Fisica" @click="action_handler('newCard', 'PHYSICAL', account.id)"
                      color="primary" class="" rounded outline />
                    <q-btn label="Virtual" @click="action_handler('newCard', 'VIRTUAL', account.id)" color="primary"
                      class="" rounded outline />
                  </q-card-actions>


                </q-card>
              </q-dialog>

            </q-card>

          </div>
        </q-carousel-slide>
      </q-carousel>

      <q-card-actions class="justify-center text-white">
        <q-btn @click="addDialog = true" icon="add" round color="primary" class="text-h6 text-weight-bolder  q-px-md"
          rounded outline />
        <q-dialog v-model="addDialog">
          <q-card class="bg-dark rounded-frame rounded-borders text-primary" style=" min-height: 45%; max-width: 80vw;">
            <q-card-section>
              <div class="text-h6">Crear cuenta</div>
            </q-card-section>
            <q-card-section class="q-pt-none">

              <q-input dark v-model="account_name" label="Nombre de la cuenta" stack-label label-color="primary"
                color="primary" class="text-h6 text-weight-bolder q-my-md" type="url" />

              <q-select dark color="grey-3" outlined label-color="primary" class="q-my-md text-weight-bolder"
                bg-color="dark" v-model="country" :options="countries" label="Pais">
              </q-select>

            </q-card-section>


            <q-card-actions align="right" class="q-mt-xl">
              <q-btn label="Crear" @click="action_handler('create')" color="primary" class="q-px-xl q-mr-md" rounded
                outline />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-actions>

    </q-card>

  </q-card>



</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth.store';
import LoadingComponent from 'src/components/LoadingComponent.vue';
import { ACCOUNT_ACTIONS, ACCOUNT_CASH_OPERATION } from 'src/constants'


const slide = ref(0);
const show = ref(false);
const addDialog = ref(false);
const actions = ACCOUNT_ACTIONS;
const authStore = useAuthStore();
const operations = ACCOUNT_CASH_OPERATION;
const account_name = ref('');
const countries = ['Argentina', 'Brasil'];
const country = ref('Argentina');
//const cashinModal = ref(false);
const cashoutModal = ref(false);
const sendModal = ref(false);
const alias = ref('')
const cashoutResult = ref(false);
const cashinModal = ref(false);
const amount = ref(0);
const newCardModal = ref(false);

onMounted(() => {

  console.log(`the accounts carusel component is now mounted.`)
  authStore.getDetails('accounts/user/list');

})


async function action_handler(action, param = '', account_id = '') {

  console.log(`ACCOUNT ACCTION HANDLER : action ${action} param ${param} account_id : ${account_id}`);

  let call_data = {};

  if (action == 'cashModal') {

    switch (param) {
      case 'cashin':
        this.action_handler('cashOper', 'cashin', account_id);

        break;
      case 'cashout':
        cashoutModal.value = true;

        break;
      case 'send':
        sendModal.value = true;

        break;

      default:
        break;
    }

  } else {

    if (action == 'update') {

      if (param == 'NEW_CARD') {
        newCardModal.value = true;
        return;
      }

      let call_method = 'put';

      if (param == 'DELETED') {
        call_method = 'delete';
      }

      call_data = {
        call_method,
        return_data: false,
        refresh_url: 'accounts/user/list',
        call_endpoint: `accounts/${account_id}`,
        call_body: {
          status: param,
          account_id,
        },
        success_result: {
          message: `Cuenta paso a estado ${param} OK`,
          icon: 'thumb_up'
        }
      }

    } else if (action == 'create') {

      call_data = {
        call_method: 'post',
        return_data: false,
        refresh_url: 'accounts/user/list',
        call_endpoint: 'cards',
        call_body: {
          country: 'ARG',
          currency: 'ARS',
          name: account_name.value,
        },
        success_result: {
          message: `Cuenta ${account_name.value} creada OK`,
          icon: 'thumb_up'
        }
      }

    } else if (action == 'cashOper') {


      if (param == 'cashin') {
        call_data = {

          call_method: 'get',
          return_data: true,
          refresh_url: '',
          call_endpoint: `networks/cash/${param}/${account_id}`,
          call_body: {

          },
          success_result: {
            message: `Operacion cash: ${param}  OK`,
            icon: 'thumb_up'
          }
        }

      } else if (param == 'cashout') {

        call_data = {

          call_method: 'post',
          return_data: true,
          refresh_url: '',
          call_endpoint: `networks/cash/${param}`,
          call_body: {
            amount: amount.value,
            network_name: 'PAGO_FACIL',
            account_id,
          },
          success_result: {
            message: `Operacion cash: ${param}  OK`,
            icon: 'thumb_up'
          }
        }

      }

    } else if (action == 'newCard') {

      let call_body;

      if (param == 'PHYSICAL') {
        call_body = {
          card_type: param,
          user_id: authStore.user.data.id,
          legal_address: authStore.user.data.legal_address
        }
      } else if (param == 'VIRTUAL') {
        call_body = {
          card_type: param,
          affinity_group_id: 'afg-21gMEf4qwds84J8BU8DUmV3FhYW',
          account_id
        }
      }

      call_data = {
        call_method: 'post',
        return_data: false,
        refresh_url: 'accounts/user/list',
        call_endpoint: 'cards',
        call_body,
        success_result: {
          message: `Tarjeta creada OK`,
          icon: 'thumb_up'
        }
      }
    }


    const api_call_result = await authStore.api_call(call_data);

    if (action == 'cashOper') {

      if (param == 'cashout') {
        console.log(api_call_result)
        alias.value = api_call_result.data.cash_alias;
        cashoutResult.value = true;
      } else if (param == 'cashin') {
        console.log(api_call_result);
        alias.value = api_call_result.data.alias;
        cashinModal.value = true;
      }

    } else {

      show.value = false;
      addDialog.value = false;
      newCardModal.value = false
    }



  }




}


</script>
