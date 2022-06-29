import { defineStore } from "pinia";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth"

import { CONSTANTS } from 'src/constants'

export const useFirebaseAuthStore = defineStore({
  id: "firebase-auth",

  state: () => ({
    // initialize state from local storage to enable user to stay logged in

    user: JSON.parse(localStorage.getItem("firebase_user")),
    returnUrl: null,
    loading: false,
    base_api : ''
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
