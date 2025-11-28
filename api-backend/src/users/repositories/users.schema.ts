import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class User {
    @Prop({ required: true })
    hash: string

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, unique: true })
    email: string;
}

export type UserDocument = HydratedDocument<User> //Para tipagens em users.service
export const UserSchema = SchemaFactory.createForClass(User)