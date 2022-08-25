import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { Comment } from "./Comment";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    _id: false,
  },
})
class Product {
  @prop({ required: true }) //nanoId default: () => nanoId()
  id: number;

  @prop({ type: String, required: true, trim: true }) //mongoose
  name: string; //typescript

  @prop({ required: true })
  description: string;

  @prop({ type: Number, required: true, default: 0 })
  price: number;

  @prop({ type: Number, required: true, default: 0 })
  countInStock: number;

  @prop({ type: String, required: true, lowercase: true })
  urlImage: string;

  @prop({ type: () => [String] })
  tags: string[];

  @prop({ type: () => [Comment] })
  commets: Comment[];
}

export type AddProduct = {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  urlImage: string;
};

const ProductModel = getModelForClass(Product);
export default ProductModel;
