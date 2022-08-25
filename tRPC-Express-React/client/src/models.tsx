import { Field } from "@rijudev/parseus";

export class Product {
  @Field()
  name?: string;

  @Field()
  description?: string;

  @Field()
  price?: number;

  @Field()
  countInStock?: number;

  @Field()
  urlImage?: string;
}
