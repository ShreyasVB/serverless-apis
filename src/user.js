import * as uuid from 'uuid';
import handler from "./utils/handler";
import dynamoDb from "./utils/dynamodb";

export const create = handler(async (event) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            id: uuid.v1(),
            email: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            full_name: data.name,
            age: data.age,
            created_at: new Date(),
        }
    };

    await dynamoDb.put(params);

    return params.Item;
});

export const get = handler(async (event) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            email: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            full_name: event.pathParameters.name,
        }
    };

    const userData = await dynamoDb.get(params);

    if (!userData.Item) {
        throw new Error("User not found.");
    }

    return userData.Item;
});

export const getAll = handler(async(event) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: { ":email":  event.requestContext.authorizer.iam.cognitoIdentity.identityId},
    }

    const allUsers = await dynamoDb.query(params);

    if(!allUsers.Items) {
        throw new Error('No users found!');
    }

    return allUsers.Items;
});

export const update = handler(async(event) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            email: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            full_name: data.name
        },
        UpdateExpression: 'SET age = :age',
        ExpressionAttributeValues: {
            ':age': data.age,
        },
        ReturnValues: "ALL_NEW",
    };

    await dynamoDb.update(params);

    return { status: true };
});

export const deleteRecord = handler(async(event) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            email: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            full_name: event.pathParameters.emailId
        },
    };

    await dynamoDb.delete(params);

    return { status: true };
});
