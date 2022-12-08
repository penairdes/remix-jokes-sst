import {ulid} from "ulid"
import type { EntityItem} from "electrodb";
import {Entity} from "electrodb"
import {Dynamo} from "./client"

export * as Joke from "./joke"

export const JokeEntity = new Entity({
    model: {
        version: "1",
        entity: "joke",
        service: "remix-jokes-sst"
    },
    attributes: {
        jokeID: {
            type: "string",
            required: true,
            readOnly: true
        },
        createdAt: {
            type: "number",
            readOnly: true,
            set: () => Date.now()
        },
        updatedAt: {
            type: "number",
            readOnly: true,
            watch: "*",
            set: () => Date.now()
        },
        name: {
            type: "string",
            required: true
        },
        content: {
            type: "string",
            required: true
        }
    },
    indexes: {
        primary: {
            pk: {
                field: "pk",
                composite: []
            },
            sk: {
                field: "sk",
                composite: ["jokeID"]
            }
        }
    },
},
Dynamo.Configuration
)

export type JokeEntityType = EntityItem<typeof JokeEntity>;

export async function create(name: string, content: string) {
    const result = await JokeEntity.create({
        jokeID: ulid(),
        name,
        content
    }).go();
    
    return result.data
}

export async function list(attributes?: ("jokeID" | "name" | "content" | "createdAt" | "updatedAt")[]){
    const jokes = await JokeEntity.query.primary({}).go({attributes})
    return jokes.data
}

export async function byId(id: string){
    const joke = await JokeEntity.get({jokeID: id}).go();
    return joke.data;
}