import { fetchWrapper } from "src/helpers/fetch-wrapper";
import { CONSTANTS } from "src/constants";
import { defineStore } from "pinia";
import { Notify } from "quasar";
import { registerRuntimeHelpers } from "@vue/compiler-core";

export const useAuthStore = defineStore({
  id: "auth",

  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    isAuthenticated: false,
    auth0user: {},
    last_response: "",
    token: null,
    user: {},
    //loading: false,
    ready: false,
    accounts: {},
    firstSlide: "",
    cards: {},
  }),
  actions: {
    async pushTest() {
      console.log("pushing");
      this.router.push("/");
    },

    async clearState() {
      this.token = null;
      this.auth0user = {};
      this.user = {};
      localStorage.removeItem("user");
    },

    async getDetails(end_point) {
      const url = `${CONSTANTS.LARAVEL_API}/${end_point}`;
      console.log(`AUTH STORE getting  details at: ${url}`);
      console.log(`AUTH STORE , with token : ${this.token}`);

      this.ready = false;
      this.firstSlide = "";
      this.response = {};

      const response = await fetch(url, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });
      const api_response = await response.json();

      if (api_response.length !== 0) {
        if (end_point == "accounts/user/list") {
          if (api_response.data.length !== 0) {
            this.accounts = api_response;
            this.firstSlide = api_response.data[0].id;
          } else {
            console.log(` DETAIL RESPONSE : NO ACCOUNTS`);
          }
        } else if (end_point == "cards/users/list") {
          if (api_response.db_data.length !== 0) {
            this.cards = api_response;
            this.firstSlide = api_response.db_data[0].card_id;
          } else {
            console.log(` DETAIL RESPONSE : NO CARDS`);
          }
        } else if (end_point == "users") {
          this.user = api_response;
        }
      } else {
        console.log(` DETAIL RESPONSE : EMPTY ARRAY`);
      }
      this.ready = true;
    },

    async api_call(call_data) {
      console.log(`AUTH.STORE ${JSON.stringify(call_data)}`);
      this.ready = false;
      const url = `${CONSTANTS.LARAVEL_API}/${call_data.call_endpoint}`;

      let call_obj = {};

      if (call_data.call_method == "get") {
        call_obj = {
          method: call_data.call_method, // *GET, POST, PUT, DELETE, etc.
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            Authorization: "Bearer " + this.token,
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };
      } else {
        call_obj = {
          method: call_data.call_method, // *GET, POST, PUT, DELETE, etc.
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(call_data.call_body), // body data type must match "Content-Type" header
        };
      }

      try {
        const response = await fetch(url, call_obj);

        if (response.ok) {
          var data = await response.json();
        } else if (response.status == "403") {
        } else {
          this.notify(`API RETURNS ${response.status}`, "warning");
          this.ready = true;
        }

        if (call_data.return_data) {
          this.ready = true;
          return data;
        } else {
          await this.getDetails(call_data.refresh_url);
          this.notify(
            call_data.success_result.message,
            call_data.success_result.icon
          );
          this.ready = true;
        }

        //console.log(`status ${response.status}`);

        //return data;
      } catch (err) {
        console.log(`error ${err}`);
      }
    },

    notify(message = "HOLA", icon = "thumb_up") {
      Notify.create({
        message,
        position: "top",
        icon,
        color: "dark",
        textColor: "primary",
        classes: "rounded-frame notify",
        timeout: 2500,
      });
    },

    // logout() {
    //   this.router.push("/login");
    // },
  },
});
