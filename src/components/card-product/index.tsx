import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetProductsApiResponse, Product } from "../../types/product.type";
import { QueryKey } from "../../constant/QueryKey";
import { useState } from "react";

export default function CardProduct({
  product,
  queryKey,
}: {
  product: Product;
  queryKey: Array<string | number>;
}) {
  const [newTitle, setNewTitle] = useState<string>(product.title);
  const queryClient = useQueryClient();

  const handleUpdateData = () => {
    try {
      const oldProducts = queryClient.getQueryData<GetProductsApiResponse>(queryKey);

      console.log(oldProducts);

      if (!oldProducts) {
        throw new Error("Data not found in cache");
      }

      const index = oldProducts.products.findIndex(
        (record) => record.id === product.id
      );

      if (index === -1) {
        throw new Error("Record not found in data");
      }

      const updatedProducts = {
        ...oldProducts,
        products: oldProducts.products.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              title: newTitle,
            };
          } else {
            return item;
          }
        }),
      };

      // Set the updated data back to the cache
      queryClient.setQueryData(queryKey, updatedProducts);
    } catch (error) {
      console.log(error);
      setNewTitle(product.title);
    }
  };

  return (
    <div className="flex gap-9 items-center px-6 py-5 bg-neutral-8 rounded-lg border-[1px] border-transparent hover:border-primary-30 transition-all">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-16 h-16 rounded-lg"
      />
      <div>
        <input
          type="text"
          className="headline-4 px-3 py-[6px] text-text-0 w-full rounded-lg hover:bg-neutral-7 active:bg-neutral-6 focus:outline-0 focus:bg-neutral-8
          border-[1px] border-transparent focus:border-primary-100 text-ellipsis"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleUpdateData}
        />
        <p className="body-2 px-3 mt-3 text-text-1">$ {product.price}</p>
      </div>
    </div>
  );
}
