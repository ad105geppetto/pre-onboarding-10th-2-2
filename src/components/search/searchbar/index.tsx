import React, { useCallback, useState } from "react";
import fetchSearchSuggestions from "../../../api/fetchSearchSuggestions";
import { BASE_URL, CACHE_STORAGE_NAME, RESOURCE_PATH } from "../../../constant";
import * as S from "./searchbar.styles";
import SearchIcon from "../../common/SearchIcon";
import { ISearchBarProps } from "./searchbar.types";
import useDebounce from "../../../hooks/useDebounce";
import { handleCache } from "../../../utils";
import { DEBOUNCE_TIME } from "../../../constant";

export default function SearchBar({
  isVisible,
  setSearchSuggestions,
  setSearchKeyword,
  setIsVisible,
  searchRef,
  onKeyUpSearchKeyword,
  setBoldText
}: ISearchBarProps) {
  const [inpValue, setInpValue] = useState("");

  const searchAutoComplete = useCallback(
    async (value: any) => {
      let fetchData;

      if (value) {
        fetchData = await handleCache(
          {
            storageName: CACHE_STORAGE_NAME,
            url: `${BASE_URL}${RESOURCE_PATH}/?name=${value}`,
          },
          () => fetchSearchSuggestions(value)
        );
      }

      setSearchKeyword(value);
      setSearchSuggestions(fetchData?.slice(0, 7) || []);
    },
    [setSearchKeyword, setSearchSuggestions]
  );

  useDebounce(inpValue, searchAutoComplete, DEBOUNCE_TIME);

  const onInpChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setInpValue(target.value);
    setBoldText(target.value);
  };

  const onFocusAutoCompleteSearch = () => {
    setIsVisible(true);
  };

  // TODO: HTML 태그 구조 정리하기
  return (
    <S.Container isVisible={isVisible}>
      <S.TextInputWrapper>
        <label htmlFor="search_bar_main"></label>
        {!isVisible && <SearchIcon color="#BABABA" viewBox="0 -5 26 26" size={26} />}
        <S.TextInput
          type="text"
          id="search_bar_main"
          value={inpValue}
          placeholder={isVisible ? "" : "질환명을 입력해주세요."}
          ref={searchRef}
          onChange={onInpChange}
          onFocus={onFocusAutoCompleteSearch}
          onKeyUp={event =>
            onKeyUpSearchKeyword(event, searchRef.current ? searchRef.current.value : "")
          }
        />
      </S.TextInputWrapper>
      <S.SearchButton>
        <span className="ir">검색</span>
        <SearchIcon color="#FFFFFF" viewBox="-4 -5 24 24" size={28} />
      </S.SearchButton>
    </S.Container>
  );
}
