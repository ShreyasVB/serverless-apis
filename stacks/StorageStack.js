import * as sst from '@serverless-stack/resources';

export default class StorageStack extends sst.Stack {
    table;

    constructor (scope, id, props) {
        super (scope, id, props);

        this.table = new sst.Table(this, 'userInfo', {
            fields: {
                email: sst.TableFieldType.STRING,
            },
            primaryIndex: { partitionKey: 'email' },
        });
    }
}