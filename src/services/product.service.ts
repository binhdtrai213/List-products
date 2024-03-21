import { BaseQuery } from "../types/base.type";

export class ProductService {
    getAll(data: BaseQuery) {
        const { current, pageSize, q = ''} = data;
        return [
            { id: 1, name: 'Product 1' },
            { id: 2, name: 'Product 2' },
            { id: 3, name: 'Product 3' },
        ];
    }
}