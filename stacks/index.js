import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";

export default function main(app) {
  // Set default runtime for all functions
  const storageStack = new StorageStack(app, 'user-crud-operations');

  new ApiStack(app, 'api', {
    table: storageStack.table
  })
}
