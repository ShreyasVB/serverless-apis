import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";
import AuthStack from "./AuthStack";
import FrontendStack from "./FrontendStack";

export default function main(app) {
  // Set default runtime for all functions
  const storageStack = new StorageStack(app, 'user-crud-operations');

  const apiStack = new ApiStack(app, 'api', {
    table: storageStack.table
  });

  const authStack = new AuthStack(app, 'auth', {
    api: apiStack.api,
  });

  new FrontendStack(app, 'frontend', {
    api: apiStack.api,
    auth: authStack.auth,
  });
}
