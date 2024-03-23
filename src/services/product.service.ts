import { BaseQuery } from "../types/base.type";
import {
  GetCategoriesApiResponse,
  GetProductsApiResponse,
} from "../types/product.type";
import { get } from "../utils/ApiCaller";

export const ProductService = {
  async getAllProducts(data: BaseQuery) {
    // const { current, pageSize, q = "" } = data;
    return await get({ endpoint: "/products" });
  },

  async getProductsByCat(
    category: string,
    query: BaseQuery
  ): Promise<GetProductsApiResponse> {
    const { current, pageSize, q = "" } = query;
    if (!category) return { products: [], total: 0, limit: 0, skip: 0 };
    // Comment: I'am so confused that I don't know why API get products by category doesn't has limit and skip, search. How can I apply infinite scroll(paging)?
    // const response = await get({ endpoint: `/products/category/${category}`, params: {
    //   q,
    //   limit: pageSize,
    //   skip: (current - 1) * pageSize
    // } });
    const response = await get({
      endpoint: `/products/search`,
      params: { q },
    });
    response.data.products = (response.data as GetProductsApiResponse).products.filter((item) => item.category === category);
    response.data.total = 0;
    return response.data;
  },

  async getAllCategories(): Promise<GetCategoriesApiResponse> {
    const response = await get({ endpoint: "/products/categories" });
    return response.data;
  },
};
