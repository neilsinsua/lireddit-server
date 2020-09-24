import {MikroORM} from '@mikro-orm/core';
import {Post} from "./entities/Post";
import microConfig from './mikro-orm.config';

//await can't be at top level
const main = async () => {
    //Initialize ORM
    const orm = await MikroORM.init(microConfig);
    //run migrations
    await orm.getMigrator().up();
    //Create and persist new post entry
    const post = orm.em.create(Post, {title: 'my first post'});
    await orm.em.persistAndFlush(post);
}

main().catch(err => console.log(err));
