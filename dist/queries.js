export const typeDefs = `#graphql


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
// export default typeDefs;
