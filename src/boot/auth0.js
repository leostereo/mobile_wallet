import { boot } from "quasar/wrappers";
import { createAuth0 } from "@auth0/auth0-vue";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do

  app.use(
    createAuth0({
      domain: "dev-tokk7fzg.us.auth0.com",
      client_id: "ZFHZD96r877ELN81riv1uVb95KyG4JXE",
      redirect_uri: window.location.origin,
    })
  );
});
