import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import typeDefs from "./queries";
import resolvers from "./resolvers";
dotenv.config();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
