import { defineStore } from 'pinia';
import { fetchWrapper } from 'src/helpers/fetch-wrapper';
import { CONSTANTS } from 'src/constants'

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        user: {},
        ready: false,
    }),
    actions: {
        async getDetails() {
            console.log(`getting user at: ${CONSTANTS.LARAVEL_API}/users`)
            this.ready = false;
            fetchWrapper.get(`${CONSTANTS.LARAVEL_API}/users`)
                .then(users => {
                  this.user = users
                  this.ready = true;
                  })
                .catch(error => this.user = { error })
        }
    }
});
