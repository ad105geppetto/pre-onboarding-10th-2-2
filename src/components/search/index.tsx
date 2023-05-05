import React, { KeyboardEvent, useRef, useState, useEffect } from "react";
import { MAX_NUMBER, SESSION_STORAGE_KEY } from "../../constant";
import AutoComplete from "./autoComplete";
import SearchBar from "./searchbar";
import SearchHistory from "./searchHistory";
import SuggestedSearchGroup from "./suggestedSearchGroup";
import * as S from "./search.styles";
import { searchItem } from "./search.types";
import { moveDown, moveUp } from "../../utils";
import SearchIcon from "../common/SearchIcon";

export default function Search() {
  const [searchSuggestions, setSearchSuggestions] = useState<searchItem[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [boldText, setBoldText] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef(-1);

  useEffect(() => {
    const keywords = sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (keywords !== null) {
      setRecentSearches(JSON.parse(keywords));
    }
  }, []);

  const onClickSearchKeyword = async (keyword: string) => {
    if (searchRef.current !== null) {
      searchRef.current.value = keyword;
    }

    // 과제 홈페이지: 검색어 클릭 -> 인풋 값 클릭한 값대로 바꾼 뒤 -> 검색어 페이지로 넘어가는 과정
    // 그래서 state 초기화를 진행했습니다.
    onClickSubmitSearch();
    setIsVisible(false);
    setSearchSuggestions([]);
  };

  const onKeyUpSearchKeyword = (event: KeyboardEvent, keyword: string) => {
    if (!keyword) return;

    let currentNumber = numberRef.current;

    if (event.key === "Enter") {
      onClickSearchKeyword(keyword);
      setIsVisible(false);
      alert(searchKeyword);
    }

    if (event.key === "ArrowUp") {
      moveUp({ currentNumber, searchSuggestions, setSearchKeyword, searchRef, numberRef });
    }

    if (event.key === "ArrowDown") {
      moveDown({ currentNumber, searchSuggestions, setSearchKeyword, searchRef, numberRef });
    }
  };

  const onClickSubmitSearch = () => {
    let keys = sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (keys === null) {
      keys = `[]`;
    }

    const searchKeywordList = JSON.parse(keys);

    if (searchKeywordList.includes(searchRef.current?.value)) {
      return;
    }

    if (searchKeywordList.length >= MAX_NUMBER) {
      searchKeywordList.pop();
    }

    sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify([searchRef.current?.value, ...searchKeywordList])
    );
    setRecentSearches([searchRef.current?.value, ...searchKeywordList]);

    if (searchRef.current !== null) {
      searchRef.current.value = "";
    }
    setSearchKeyword("");
  };

  const onTabClose = (event: React.FocusEvent<HTMLElement>) => {
    const isClosing = event.target.classList.contains("search-res-last-el");
    isClosing && setIsVisible(false);
  };

  return (
    <section>
      <S.SearchTitle>
        <span>국내 모든 임상시험 검색하고</span>
        <span>온라인으로 참여하기</span>
      </S.SearchTitle>
      <SearchBar
        setSearchSuggestions={setSearchSuggestions}
        setSearchKeyword={setSearchKeyword}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        searchRef={searchRef}
        onClickSubmitSearch={onClickSubmitSearch}
        onKeyUpSearchKeyword={onKeyUpSearchKeyword}
        setBoldText={setBoldText}
      />
      <S.SuggestionsWrapper isVisible={isVisible} onBlur={onTabClose}>
        {searchSuggestions.length === 0 ? (
          <>
            <SearchHistory recentSearches={recentSearches} />
            <SuggestedSearchGroup />
          </>
        ) : (
          <>
            <S.SearchKeyword>
              <SearchIcon color="#BABABA" viewBox="0 -10 26 26" size={26} />
              {boldText}
            </S.SearchKeyword>
            <S.SuggestionTitle>추천 검색어</S.SuggestionTitle>
            <ul>
              <AutoComplete
                searchSuggestions={searchSuggestions}
                onClickSearchKeyword={onClickSearchKeyword}
                onKeyUpSearchKeyword={onKeyUpSearchKeyword}
                boldText={boldText}
                currentNumber={numberRef.current}
              />
            </ul>
          </>
        )}
      </S.SuggestionsWrapper>
    </section>
  );
}
