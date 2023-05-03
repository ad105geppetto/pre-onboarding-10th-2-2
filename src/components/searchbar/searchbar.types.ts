import { Dispatch, SetStateAction, RefObject } from "react";

export interface ISearchBarProps {
  isVisible: boolean;
  setSearchSuggestions: Dispatch<SetStateAction<never[]>>;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  searchRef: RefObject<HTMLInputElement>;
  onClickSubmitSearch: () => void;
}
