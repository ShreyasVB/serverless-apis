import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";
import AuthStack from "./AuthStack";

export default function main(app) {
  // Set default runtime for all functions
  const storageStack = new StorageStack(app, 'user-crud-operations');

  const apiStack = new ApiStack(app, 'api', {
    table: storageStack.table
  });

  new AuthStack(app, 'auth', {
    api: apiStack.api,
  });
}
