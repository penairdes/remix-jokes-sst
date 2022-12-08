export * as Dynamo from "./client"

import {EntityConfiguration} from "electrodb"
import {DynamoDBClient} from "@aws-sdk/client-dynamodb"

export const client = new DynamoDBClient({});

export const Configuration: EntityConfiguration = {
    table: process.env.TABLE_NAME,
    client
}