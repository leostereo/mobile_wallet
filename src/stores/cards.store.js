import { defineStore } from 'pinia';
import { CONSTANTS } from 'src/constants'
import { useAuthStore } from 'src/stores/auth.store';
import { fetchWrapper } from 'src/helpers/fetch-wrapper';


export const useCardsStore = defineStore({
    id: 'cards',
    state: () => ({
        cards: {},
        ready: false,
        firstSlide: '',
        response : {}
    }),
    actions: {
        async getDetails() {
            console.log(`getting cards at: ${CONSTANTS.LARAVEL_API}/cards/users/list`)
            this.ready = false;
            this.response = {};
            fetchWrapper.get(`${CONSTANTS.LARAVEL_API}/cards/users/list`)
                .then(cards => {
                  this.cards = cards
                  this.ready = true;
                  this.firstSlide = cards.db_data[0].card_id;
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
