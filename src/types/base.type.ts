interface PagingType {
  current: number;
  pageSize: number;
}

interface BaseQuery extends PagingType {
  q?: string;
}

export type { PagingType, BaseQuery };
