import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Joke } from "../../dynamo/joke";

type LoaderData = { randomJoke: Joke.JokeEntityType };

export const loader: LoaderFunction = async () => {
  const jokes = await Joke.list();
  const count = jokes.length;
  const randomRowNumber = Math.floor(Math.random() * count);
  console.log({ randomRowNumber });

  const data: LoaderData = { randomJoke: jokes.at(randomRowNumber)! };
  return json(data);
};

export default function JokesIndexRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's a random joke:</p>
      <p>{data.randomJoke.content}</p>
      <Link to={data.randomJoke.jokeID}>
        "{data.randomJoke.name}" Permalink
      </Link>
    </div>
  );
}
