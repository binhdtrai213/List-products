import { useMemo, useState, useEffect } from "react";
import SearchInput from "../../components/search-input";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../constant/QueryKey";
import { ProductService } from "../../services/product.service";
import { useDebounce } from "@uidotdev/usehooks";
import {
  GetCategoriesApiResponse,
  GetProductsApiResponse,
} from "../../types/product.type";
import { AxiosError } from "axios";
import ChevronIcon from "../../assets/icons/chevron";
import CardProduct from "../../components/card-product";
import CardSkeleton from "../../components/skeleton/card-skeleton";
import CategorySkeleton from "../../components/skeleton/category-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../components/spinner/spinner";

const PAGE_SIZE = 5;
const TIME_CACHE = 600000; //10 minutes

export default function Homepage() {
  const [textSearch, setTextSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setTextSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery<GetCategoriesApiResponse, AxiosError>({
    queryKey: [QueryKey.GET_CATEGORIES],
    queryFn: ProductService.getAllCategories,
    cacheTime: TIME_CACHE,
    staleTime: TIME_CACHE,
  });

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery<GetProductsApiResponse, AxiosError>({
    queryKey: [
      QueryKey.GET_CATEGORIES,
      selectCategory,
      textSearch,
      currentPage,
    ],
    queryFn: () =>
      ProductService.getProductsByCat(selectCategory, {
        current: currentPage,
        pageSize: PAGE_SIZE,
        q: textSearch,
      }),
    cacheTime: TIME_CACHE,
    staleTime: TIME_CACHE,
  });

  const handleCategoryChange = (category: string) => {
    setCurrentPage(1);
    if (selectCategory !== category) {
      setSelectCategory(category);
    } else {
      setSelectCategory("");
    }
  };

  const handleCancelSearch = () => {
    setTextSearch("");
  };

  return (
    <div
      className="w-1/3 p-9 mx-auto rounded-3xl bg-neutral-8"
      style={{
        boxShadow:
          "0px 0px 4px 0px rgba(5, 43, 97, 0.12), 2px 6px 12px 0px rgba(0, 0, 0, 0.12)",
      }}
    >
      <SearchInput
        textSearch={searchTerm}
        setTextSearch={setSearchTerm}
        handleCancel={handleCancelSearch}
      />
      <div className="mt-11 mb-9 flex gap-6 items-center">
        <p className="text-nowrap headline-2 text-text-0">Product List</p>
        <span className="w-full border-b-[1px] border-neutral-4 border-dashed" />
      </div>
      <div className="flex flex-col gap-3">
        {isCategoriesLoading && !products?.products?.length
          ? Array(10)
              .fill("")
              .map((item, index) => <CategorySkeleton key={index} />)
          : categories?.map((category) => (
              <div key={category}>
                <button
                  className="flex gap-3 px-5 py-6  items-center capitalize"
                  onClick={() => handleCategoryChange(category)}
                >
                  <ChevronIcon
                    className={`w-4 h-4 text-neutral-1 transition-all ${
                      selectCategory === category ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                  <p className="text-nowrap headline-3 text-text-0">
                    {category.replaceAll("-", " ")}
                  </p>
                </button>

                {selectCategory === category && (
                  <InfiniteScroll
                    className="flex flex-col gap-8"
                    dataLength={products?.products?.length ?? 0}
                    hasMore={Boolean(
                      (products?.total ?? 0) > (products?.products?.length ?? 0)
                    )}
                    next={() => setCurrentPage(currentPage + 1)}
                    loader={<Spinner />}
                  >
                    {!products?.products?.length &&
                    isProductsLoading &&
                    currentPage === 1
                      ? Array(PAGE_SIZE)
                          .fill("")
                          .map((item, index) => <CardSkeleton key={index} />)
                      : products?.products?.map((product) => (
                          <CardProduct key={product.id} product={product} />
                        ))}
                  </InfiniteScroll>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}
