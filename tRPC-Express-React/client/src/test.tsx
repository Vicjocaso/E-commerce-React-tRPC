import React, { useState } from "react";
import { trpc } from "./utils/trpc";
import { QueryClient } from "react-query";
import { Product } from "./models";

export const client = new QueryClient();

export const Test = () => {
  const [product, setProduct] = useState<Product>({});

  const getProducts = trpc.useQuery(["getProducts"]);
  const addProduct = trpc.useMutation(["addProduct"]);

  const onAddProduct = async () => {
    addProduct.mutate(
      {
        name: product.name!,
        description: product.description!,
        price: Number(product.price)!,
        countInStock: Number(product.countInStock)!,
        urlImage: product.urlImage!,
      },
      {
        onSuccess: async () => {
          await client.invalidateQueries(["getProducts"]);
        },
      }
    );
  };

  const onchange = (e) => {
    const { name, value } = e.target;
    setProduct((prevSate) => ({ ...prevSate, [name]: value }));
    console.log(product);
  };

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl ">
      <div>{JSON.stringify(getProducts.data)}</div>
      <div className="flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            onAddProduct();
            console.log(product);
          }}
        >
          <input
            type="text"
            name="name"
            value={product.name}
            className="border-2 mr-4 h-10 border-gray-300 rounded-lg"
            onChange={onchange}
            placeholder="name"
          />
          <input
            type="text"
            name="description"
            value={product.description}
            className="border-2 h-10 mr-4 border-gray-300 rounded-lg"
            onChange={onchange}
            placeholder="description"
          />
          <input
            type="text"
            name="price"
            value={product.price}
            className="border-2 h-10 mr-4 border-gray-300 rounded-lg"
            onChange={onchange}
            placeholder="price"
          />
          <input
            type="text"
            name="countInStock"
            value={product.countInStock}
            className="border-2 h-10 mr-4 border-gray-300 rounded-lg"
            onChange={onchange}
            placeholder="countInStock"
          />
          <input
            type="text"
            name="urlImage"
            value={product.urlImage}
            className="border-2 h-10 mr-4 border-gray-300 rounded-lg"
            onChange={onchange}
            placeholder="urlImage"
          />
          <div>
            <button className="relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Menssage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
