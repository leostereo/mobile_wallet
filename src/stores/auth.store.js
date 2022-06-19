import { defineStore } from "pinia";
import { fetchWrapper } from "src/helpers/fetch-wrapper";

import { CONSTANTS } from 'src/constants'

export const useAuthStore = defineStore({
  id: "auth",

  state: () => ({
    // initialize state from local storage to enable user to stay logged in

    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
    loading: false,
  }),
  actions: {
    async pushTest() {
      console.log("pushing");
      this.router.push('/')
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
      this.user = null;
      localStorage.removeItem("user");
      this.router.push("/login");
    },
  },
});
