import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class NewsletterConfirm {
    @Prop({ required: true })
    hash: string

    @Prop({ required: true, unique: true })
    email: string

}

export type NewsletterConfirmDocument = HydratedDocument<NewsletterConfirm> //Para tipagens em users.service
export const NewsletterConfirmSchema = SchemaFactory.createForClass(NewsletterConfirm)
