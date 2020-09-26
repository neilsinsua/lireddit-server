import 'reflect-metadata'
import {MikroORM} from '@mikro-orm/core';
import microConfig from './mikro-orm.config';
import express from 'express';
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {HelloResolver} from "./resolvers/hello";
import {PostResolver} from "./resolvers/post";

//await can't be at top level
const main = async () => {
    //Initialize ORM
    const orm = await MikroORM.init(microConfig);
    const app = express();
    //create express endpoint
    const apolloServer = new ApolloServer({
       schema: await buildSchema({
           resolvers: [HelloResolver, PostResolver],
           validate: false
       }),
        context: () => ({em: orm.em})
    });
    apolloServer.applyMiddleware({app});
    app.listen(8080, () => {
        console.log(`server started on localhost:8080`)
    })
    //run migrations
    await orm.getMigrator().up();
    //Create and persist new post entry
}

main().catch(err => console.log(err));
