import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";

import db from "./_db.js";
const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, args) {
            return db.games.find((d) => d.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find((d) => d.id === args.id)
        },
        review(_, args) {
            return db.reviews.find((d) => d.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find((a) => a.id == parent.author_id)
        },
        game(parent) {
            return db.games.find((a) => a.id == parent.game_id)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});



const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})


console.log("Server ready at port ", url)