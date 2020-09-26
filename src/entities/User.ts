import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {Field, ObjectType} from "type-graphql";

//type-graphql decorator
@ObjectType()
//mikro-orm decorator
@Entity()
export class User {
    @Field(() => String)
    @PrimaryKey()
    id!: number;

    @Field(() => Date)
    @Property({type: 'Date'})
    createdAt = new Date();

    @Field(() => Date)
    @Property({ type: 'Date', onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field(() => String)
    @Property({type: 'text', unique: true})
    name!: string;

    @Property({type: 'text'})
    password!: string;
}
