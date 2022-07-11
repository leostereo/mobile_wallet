import { defineStore } from "pinia";
import { fetchWrapper } from "src/helpers/fetch-wrapper";

import { CONSTANTS } from 'src/constants'

export const useAuthStore = defineStore({
  id: "auth",

  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    authenticatedInAuth0 : false,
    isAuthenticated: false,
    auth0user : {},
    last_response : '',
    api_token : '',
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
    loading: false,

  }),
  actions: {
    async pushTest() {
      console.log("pushing");
      this.router.push('/')
    },

    async clearState() {
      this.authenticatedInAuth0 = false;
      this.isAuthenticated = false;
      this.api_token = '';
      this.auth0user = {};
      this.user = null;
      localStorage.removeItem("user");
    },

    async register() {
      console.log('LETS REGISTER')
    },

    async logister() {
      
      console.log(this.auth0user.authenticated.email);
      let email = this.auth0user.authenticated.email;

      const user = await fetchWrapper.post(
        `${CONSTANTS.LARAVEL_API}/login`,
        { email, password:'password'}
        
      ).catch(error => {
        console.log('El server devuelve: ' + error)
        if(error===401){
          this.last_response = 401;
          this.register();
        }
      });
      
      console.log(user);
      // update pinia state
      this.isAuthenticated = true;
      this.user = user;

      localStorage.setItem("user", JSON.stringify(user));

      // redirect to previous url or default to home page
      this.router.push('/');


    },
    async login(email, password) {

      const user = await fetchWrapper.post(
        `${CONSTANTS.LARAVEL_API}/login`,
        { email, password }
      );

      console.log(user);
      // update pinia state
      this.user = user;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      // redirect to previous url or default to home page
      this.router.push(this.returnUrl || '/');
    },
    logout() {
      //this.router.push("/login");
    },
  },
});
