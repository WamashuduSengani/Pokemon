import axios from "axios";
const fetchPokemonByName = async (name) => {
    const response = await axios.get(`${process.env.API_URL}pokemon/${name}`);
    const pokemonData = response.data;
    return transformPokemonData(pokemonData);
};
const fetchAllPokemons = async () => {
    const response = await axios.get(`${process.env.API_URL}pokemon`);
    const pokemons = response.data.results;
    const pokemonPromises = pokemons.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        const pokemonData = response.data;
        return transformPokemonData(pokemonData);
    });
    return Promise.all(pokemonPromises);
};
const transformPokemonData = (pokemonData) => {
    return {
        name: pokemonData.name,
        height: pokemonData.height,
        weight: pokemonData.weight,
        abilities: pokemonData.abilities.map((ability) => ({
            name: ability.ability.name,
        })),
    };
};
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
export default resolvers;
