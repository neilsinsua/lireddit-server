import {Post} from "./entities/Post";
import {MikroORM} from "@mikro-orm/core";
import path from "path";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations,
        pattern: /^[\w-]+\d+\.[tj]s$/, // migration files for javascript and typescript
    },
    dbName: 'lireddit',
    user: 'postgres',
    password: 'Trojan5599',
    type: 'postgresql',
    debug: process.env.NODE_ENV !== 'production',
    //tables in database
    entities: [Post],
} as Parameters<typeof MikroORM.init>[0]

