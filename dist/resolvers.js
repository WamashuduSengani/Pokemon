import axios from "axios";
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
export const resolvers = {
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
// export default resolvers
