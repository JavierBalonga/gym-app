import { dump } from "auth0-deploy-cli";
import env from "./env";

dump({
  output_folder: `./dumps/${new Date()
    .toISOString()
    .replace(/\D/g, "-")
    .slice(0, -1)}`,
  format: "yaml",
  config: {
    AUTH0_DOMAIN: env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: env.AUTH0_CLIENT_SECRET,
  },
})
  .then(() => {
    console.log("Auth0 configuration export successful");
  })
  .catch((err) => {
    console.log("Error during Auth0 configuration export:", err);
  });
