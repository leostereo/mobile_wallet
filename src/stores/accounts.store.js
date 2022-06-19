import { defineStore } from 'pinia';
import { CONSTANTS } from 'src/constants'
import { useAuthStore } from 'src/stores/auth.store';
import { fetchWrapper } from 'src/helpers/fetch-wrapper';


export const useAccountsStore = defineStore({
    id: 'accounts',
    state: () => ({
        accounts: {},
        ready: false,
        firstSlide: '',
        response : {}
    }),
    actions: {
        async getDetails() {
            console.log(`getting accounts at: ${CONSTANTS.LARAVEL_API}/accounts/user/list`)
            this.ready = false;
            this.response = {};
            fetchWrapper.get(`${CONSTANTS.LARAVEL_API}/accounts/user/list`)
                .then(accounts => {
                  this.accounts = accounts
                  this.ready = true;
                  this.firstSlide = accounts.data[0].id;
                  })
                .catch(error => {

                  this.ready = true;
                  this.response = { error };
                  console.log('LOGIN NEEDED');
                  const authStore = useAuthStore();
                  authStore.logout();
                })
        }
    }
});
