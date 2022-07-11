import { defineStore } from "pinia";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth"

import { CONSTANTS } from 'src/constants'

export const useAuth0AuthStore = defineStore({
  id: "auth0-auth",

  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    isAuthenticated : false,

  }),
  actions: {

    login() {

      console.log('sgin wit google')
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result.user)
          this.user = result.user;

          localStorage.setItem("firebase_user", JSON.stringify(result.user));

          // redirect to previous url or default to home page
          this.router.push(this.returnUrl || '/');

        });


      // redirect to previous url or default to home page
      //this.router.push(this.returnUrl || '/');
    },
  },
});
