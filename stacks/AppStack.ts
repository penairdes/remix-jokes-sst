import { StackContext, Table, RemixSite } from "@serverless-stack/resources";

export function AppStack({ stack }: StackContext) {
  const table = new Table(stack, "table", {
    fields: {
      pk: "string",
      sk: "string"
    },
    primaryIndex: {
      partitionKey: "pk",
      sortKey: "sk"
    }
  })

  const site = new RemixSite(stack, "site", {
    path: "web",
    environment: {
      TABLE_NAME: table.tableName
    }
  });
}
