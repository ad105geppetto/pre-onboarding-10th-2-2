import { RefObject, MutableRefObject } from "react";
import { searchItem } from "../components/search/search.types";

export interface IMoveProps {
  currentNumber: number;
  searchSuggestions: searchItem[];
  setSearchKeyword: (keyword: string) => void;
  searchRef: RefObject<HTMLInputElement>;
  numberRef: MutableRefObject<number>;
}
