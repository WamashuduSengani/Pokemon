import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";
// import axios from "axios";
const typeDefs = `#graphql


type Pokemon {
    name: String!
    height: Int!
    weight: Int!
    abilities: [Ability!]!
  }

  type Ability {
    name: String!
  }

  type Query {
    getPokemon(name: String!): Pokemon
    getAllPokemons: [Pokemon!]!
  }
`;
const resolvers = {
    Query: {
        getPokemon: async (_parent, args) => {
            const { name } = args;
            const pokemon = await fetchPokemonByName(name);
            return pokemon;
        },
        getAllPokemons: async () => {
            const pokemons = await fetchAllPokemons();
            return pokemons;
        },
    },
};
async function fetchPokemonByName(name) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonData = response.data;
    return transformPokemonData(pokemonData);
}
async function fetchAllPokemons() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const pokemons = response.data.results;
    const pokemonPromises = pokemons.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        const pokemonData = response.data;
        return transformPokemonData(pokemonData);
    });
    return Promise.all(pokemonPromises);
}
function transformPokemonData(pokemonData) {
    return {
        name: pokemonData.name,
        height: pokemonData.height,
        weight: pokemonData.weight,
        abilities: pokemonData.abilities.map((ability) => ({
            name: ability.ability.name,
        })),
    };
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
// const { url, port } = await server.listen({ port: process.env.PORT || 4000 });
// console.log(`🚀 Server running 
// 🔊 Listening on port ${port}
// 👨🏾‍💻 Query at ${url}`);
