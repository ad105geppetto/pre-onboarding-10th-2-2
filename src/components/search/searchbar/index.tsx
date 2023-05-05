import React from "react";
import fetchSearchSuggestions from "../../../api/fetchSearchSuggestions";
import { BASE_URL, CACHE_STORAGE_NAME, RESOURCE_PATH } from "../../../constant";
import * as S from "./searchbar.styles";
import SearchIcon from "../../common/SearchIcon";
import { ISearchBarProps } from "./searchbar.types";
import { debounce } from "../../../utils";
import { handleCache } from "../../../utils";
import { DEBOUNCE_TIME } from "../../../constant";

export default function SearchBar({
  isVisible,
  setSearchSuggestions,
  setSearchKeyword,
  setIsVisible,
  searchRef,
  onKeyUpSearchKeyword,
  setBoldText,
  onClickSubmitSearch,
}: ISearchBarProps) {
  const onInpChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    let fetchData;

    if (target.value) {
      fetchData = await handleCache(
        {
          storageName: CACHE_STORAGE_NAME,
          url: `${BASE_URL}${RESOURCE_PATH}/?name=${target.value}`,
        },
        () => fetchSearchSuggestions(target.value.toLowerCase())
      );
    }
    setBoldText(target.value);
    setSearchKeyword(target.value);
    setSearchSuggestions(fetchData?.slice(0, 7) || []);
  };

  const debouncedOnInpChange = debounce(onInpChange, DEBOUNCE_TIME);

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
          placeholder={isVisible ? "" : "질환명을 입력해주세요."}
          ref={searchRef}
          onChange={(event: React.FormEvent<HTMLInputElement>) => debouncedOnInpChange(event)}
          onFocus={onFocusAutoCompleteSearch}
          onKeyUp={event =>
            onKeyUpSearchKeyword(event, searchRef.current ? searchRef.current.value : "")
          }
        />
      </S.TextInputWrapper>
      <S.SearchButton>
        <span className="ir" onClick={onClickSubmitSearch}>
          검색
        </span>
        <SearchIcon color="#FFFFFF" viewBox="-4 -5 24 24" size={28} />
      </S.SearchButton>
    </S.Container>
  );
}
