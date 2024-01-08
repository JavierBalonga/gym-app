import { deploy } from "auth0-deploy-cli";
import env from "./env";

deploy({
  input_file: "./config/tenant.yaml",
  config: {
    AUTH0_DOMAIN: env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: env.AUTH0_CLIENT_SECRET,
  },
})
  .then(() => {
    console.log("Auth0 configuration applied to tenant successful");
  })
  .catch((err) => {
    console.log("Error when applying configuration to Auth0 tenant:", err);
  });
