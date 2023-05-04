import { Dispatch, SetStateAction, RefObject, KeyboardEvent } from "react";

interface searchItem {
  id: number;
  name: string;
}

export interface ISearchBarProps {
  isVisible: boolean;
  setSearchSuggestions: Dispatch<SetStateAction<searchItem[]>>;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  searchRef: RefObject<HTMLInputElement>;
  onClickSubmitSearch: () => void;
  onKeyUpSearchKeyword: (event: KeyboardEvent, keyword: string) => void;
}
