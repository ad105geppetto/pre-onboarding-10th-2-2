import { KeyboardEvent, useRef, useState, useEffect } from "react";
import SearchBar from "../searchbar";
import * as S from "./search.styles";

export default function Search() {
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const keywords = sessionStorage.getItem("key");

    if (keywords !== null) {
      setRecentSearches(JSON.parse(keywords));
    }
  }, []);

  const onClickSearchKeyword = (keyword: string) => {
    if (searchRef.current !== null) {
      searchRef.current.value = keyword;
    }

    onClickSubmitSearch();
  };

  const onKeyUpSearchKeyword = (event: KeyboardEvent, keyword: string) => {
    if (event.key === "Enter") {
      onClickSearchKeyword(keyword);
    }
  };

  const onClickSubmitSearch = () => {
    let keys = sessionStorage.getItem("key");

    if (keys === null) {
      keys = `[]`;
    }

    const searchKeywordList = JSON.parse(keys);
    const MAX_NUMBER = 7;

    if (searchKeywordList.includes(searchKeyword)) {
      return;
    }

    if (searchKeywordList.length >= MAX_NUMBER) {
      searchKeywordList.pop();
    }

    sessionStorage.setItem("key", JSON.stringify([searchKeyword, ...searchKeywordList]));
    setRecentSearches([searchKeyword, ...searchKeywordList]);

    if (searchRef.current !== null) {
      searchRef.current.value = "";
    }
    setSearchKeyword("");
    console.info("click search button");
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
      />
      <S.SuggestionsWrapper isVisible={isVisible}>
        {searchSuggestions.length === 0 ? (
          <S.Suggestions>
            <S.SuggestionTitle>최근 검색어</S.SuggestionTitle>
            {sessionStorage.getItem("key") ? (
              recentSearches.map((searchKeyword, key) => (
                <S.RecentSearcheItem key={key}>{searchKeyword}</S.RecentSearcheItem>
              ))
            ) : (
              <S.NoSearch>최근 검색어가 없습니다</S.NoSearch>
            )}

            <S.SuggestionTitle>추천 검색어로 검색해보세요</S.SuggestionTitle>
            <S.SuggestionButtonWrapper>
              <S.SuggestionButton>B형간염</S.SuggestionButton>
              <S.SuggestionButton>비만</S.SuggestionButton>
              <S.SuggestionButton>관절염</S.SuggestionButton>
              <S.SuggestionButton>우울증</S.SuggestionButton>
              <S.SuggestionButton>식도염</S.SuggestionButton>
            </S.SuggestionButtonWrapper>
          </S.Suggestions>
        ) : (
          <S.Suggestions>
            <S.SearchKeyword>{searchKeyword}</S.SearchKeyword>
            <S.SuggestionTitle>추천 검색어</S.SuggestionTitle>
            {searchSuggestions
              .map((keyword: { id: number; name: string }, index) => (
                <S.SuggestionKeywordWrapper
                  key={index}
                  onClick={() => onClickSearchKeyword(keyword.name)}
                  onKeyUp={event => onKeyUpSearchKeyword(event, keyword.name)}
                >
                  <div>{keyword.name}</div>
                </S.SuggestionKeywordWrapper>
              ))
              .slice(0, 7)}
          </S.Suggestions>
        )}
      </S.SuggestionsWrapper>
    </section>
  );
}
