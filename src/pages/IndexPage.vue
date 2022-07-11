<template>
  <q-page class="flex flex-center">
    <div class="row justify-center  full-width">
      <div class="col-12 col-sm-4 q-px-sm">

            <LoadingComponent :ready="ready" />


        <div v-if="isAuthenticated" align="center">
        {{user.name}}
        </div>
        <div align="center">
        DASHBOARD
        </div>
        <button @click="doSomethingWithToken">
          play
        </button>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import { ref,  watch, onMounted   } from 'vue'
import { useAuthStore } from 'src/stores/auth.store';
import LoadingComponent from 'src/components/LoadingComponent.vue';


const authStore = useAuthStore();
const auth0 = useAuth0();
const { getAccessTokenSilently } = useAuth0();

const isAuthenticated = ref(auth0.isAuthenticated);
const user = ref(auth0.user);
const ready = ref(true)
const router = useRouter()
const token = ref('')

watch(isAuthenticated, (newX) => {
  console.log(`isAuthenticated is ${newX}`)
  authStore.authenticatedInAuth0 = true;
})
watch(user, (authenticated) => {
  console.log(`user is ${authenticated.name}`)
  ready.value = false;
  authStore.auth0user = {authenticated};
  //LTES GET TOVKRN
  authStore.logister();
})

 async function doSomethingWithToken ()  {
          const token = await getAccessTokenSilently();
          console.log('tooooken : '+token);
          const response = await fetch('http://komuny.waas.financial/api/testPomeloUser', {
            headers: {
              Authorization: 'Bearer ' + token
            }
          });
          const data = await response.json();
          console.lod(data);
}

onMounted(() => {
  console.clear();
  console.log(window.location.origin);
  console.log(`the component DASHBOARD is now mounted.`)


  if(typeof user.value === 'undefined'){

    console.log(`FORBIDEN#1`)
    router.push('/login');

  }else{

    if (authStore.authenticatedInAuth0){
      console.log(`RETURN TO DASHBOAR: NOTHING TO DO`)
    }else{
      console.log(`FIRST TIME ON DASHBOAR: NOTHING TO DO`)
      
    }

    ready.value = false;
  }
  
})

</script>
