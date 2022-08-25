import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { infer, z } from "zod";
import connectToMongoDb from "./DB/config";
import ProductModel, { AddProduct } from "./Models/Product";

const getProducts = async () => {
  try {
    const products = await ProductModel.find();
    return products;
  } catch (e) {
    console.log(e);
  }
};

const getProductsById = async (id) => {
  try {
    const products = await ProductModel.findById(id);
    console.log(products);
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (product: AddProduct) => {
  try {
    const products = new ProductModel(product);

    products.save();
  } catch (error) {
    console.log(error);
  }
};

const updateProductById = async (product: AddProduct) => {
  try {
    ProductModel.findOneAndUpdate(
      { name: product.name }, // Why field do you want to look for it.
      { name: "Iphone 12" }, // What do you want to replace.
      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated : ", docs);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteProductById = async (id) => {
  try {
    ProductModel.findByIdAndDelete(id, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted : ", docs);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const appRouter = trpc
  .router()
  .query("getProducts", {
    resolve() {
      return getProducts();
    },
  })
  .mutation("addProduct", {
    input: z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      countInStock: z.number(),
      urlImage: z.string(),
    }),
    resolve({ input }) {
      createProduct(input);
      return "Messages added successfully";
    },
  });

export type appRouter = typeof appRouter;

const app = express();

app.use(cors());

const port = 8080;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
);

app.listen(port, () => {
  console.log(`api-service listening at http://localhost:${port}`);
});

connectToMongoDb();

const product = {
  name: "Iphone 13",
  description: "localhost",
  price: 99,
  countInStock: 2,
  urlImage: "localhost",
};
