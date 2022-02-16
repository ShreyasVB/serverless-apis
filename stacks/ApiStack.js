import * as sst from '@serverless-stack/resources';

export default class ApiStack extends sst.Stack {
    api;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { table } = props;

        this.api = new sst.Api(this, 'Api', {
            defaultAuthorizationType: 'AWS_IAM',
            defaultFunctionProps: {
                environment: {
                    TABLE_NAME: table.tableName,
                },
            },
            routes: {
                'POST   /user': 'src/user.create',
                'GET    /user/{name}': 'src/user.get',
                'GET    /user/getAll': 'src/user.getAll',
                'PUT    /user': 'src/user.update',
                'DELETE /user/{emailId}': 'src/user.deleteRecord',
            },
        });

        this.api.attachPermissions([table]);

        this.addOutputs({
            ApiEndpoint: this.api.url,
        });
    }
}