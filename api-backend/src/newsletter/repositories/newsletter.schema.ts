import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Newsletter {
    @Prop()
    hash: string

    @Prop({ required: true, unique: true })
    email: string

}

export type NewsletterDocument = HydratedDocument<Newsletter> //Para tipagens em users.service
export const NewsletterSchema = SchemaFactory.createForClass(Newsletter)
