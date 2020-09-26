import {Arg, Ctx, Int, Mutation, Query, Resolver} from "type-graphql";
import {Post} from "../entities/Post";
import {MyContext} from "../types";

@Resolver()
export class PostResolver {
    //set type graphql type
    @Query(() => [Post])
    posts(
        @Ctx() {em}: MyContext
        //set typescript type
    ): Promise<Post[]> {
        //find all posts
        return em.find(Post, {});
    }

    @Query(() => Post, {nullable: true})
    post(
        @Arg('id', () => Int) id: number,
        @Ctx() {em}: MyContext
    ): Promise<Post | null> {
        //find a post
        return em.findOne(Post, {id});
    }

    @Mutation(() => Post)
    async createPost(
        @Arg('title', () => String) title: string,
        @Ctx() {em}: MyContext
    ): Promise<Post> {
        //create a post
        const post = em.create(Post, {title});
        await em.persistAndFlush(post);
        return post;
    }

    @Mutation(() => Post, {nullable: true})
    async updatePost(
        @Arg('title', () => String) title: string,
        @Arg('id', () => Int) id: number,
        @Ctx() {em}: MyContext
    ): Promise<Post | null> {
        //find a post
        const post = await em.findOne(Post, {id});
        if (!post) {
            //if no post found return null
            return null;
        }
        if (typeof title !== "undefined") {
            post.title = title;
            //if title is not empty update post
            await em.persistAndFlush(post)
        }
        return post
    }

    @Mutation(() => Boolean)
    async deletePost(
        @Arg('id', () => Int) id: number,
        @Ctx() {em}: MyContext
    ): Promise<boolean> {
        const post = await em.findOne(Post, {id})
        if (!post) {
            return false
        }
        await em.nativeDelete(Post, {id})
        return true
    }
}
