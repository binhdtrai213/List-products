import { useState } from "react";
import SearchIcon from "../../assets/icons/search";
import CloseIcon from "../../assets/icons/close";

export default function SearchInput({
  textSearch,
  setTextSearch,
  handleCancel
}: {
  textSearch: string;
  setTextSearch: React.Dispatch<React.SetStateAction<string>>;
  handleCancel: () => void;
}) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className="flex gap-3 items-center">
      <div className="relative w-3/5">
        <SearchIcon
          className={`w-7 h-7 absolute top-1/2 left-6 -translate-y-1/2 ${
            isFocused ? "text-neutral-1" : "text-neutral-3"
          }`}
        />
        <input
          type="text"
          id="search"
          className={`w-full px-12 py-5 border-[1px] rounded-full  focus:text-text-0 body-2 focus:outline-0 transition-all ${
            textSearch
              ? "border-neutral-1 text-neutral-0 bg-neutral-8"
              : "border-neutral-4 text-neutral-3 bg-neutral-7"
          } 
        hover:border-primary-30 hover:bg-neutral-8 focus:bg-neutral-8 focus-visible:ring-0 focus:border-primary-100`}
          placeholder="Search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
        />
        {textSearch && (
          <button
            onClick={() => {
              setTextSearch("");
              handleCancel();
            }}
            className="absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer bg-neutral-8 hover:bg-neutral-7 active:bg-neutral-6 border-2 border-transparent 
        focus:border-primary-30 p-2 rounded-full"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        )}
      </div>
      {textSearch && (
        <button
          className={`px-6 py-5 body-2 rounded-lg bg-neutral-8 hover:bg-neutral-7 active:bg-neutral-6 border-2 border-transparent focus:border-primary-30 transition-all`}
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </div>
  );
}
