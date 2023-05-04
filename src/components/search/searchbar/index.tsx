import { ChangeEvent, useState } from "react";
import fetchSearchSuggestions from "../../../api/fetchSearchSuggestions";
import { CACHE_STORAGE_NAME, DATE_NAME } from "../../../constant";
import { isCacheExpired } from "../../../utils";
import * as S from "./searchbar.styles";
import { ISearchBarProps } from "./searchbar.types";

export default function SearchBar(props: ISearchBarProps) {
  const [debounce, setDebounce] = useState(0);

  const onChangAutoCompleteSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;

    if (debounce) window.clearTimeout(debounce);

    const time = window.setTimeout(async () => {
      let fetchData;

      if (keyword) {
        const cache = await caches.open(CACHE_STORAGE_NAME);
        const cacheResponse = await cache.match(
          `https://api.clinicaltrialskorea.com/api/v1/search-conditions/?name=${keyword}`
        );

        if (cacheResponse && !isCacheExpired(cacheResponse)) {
          fetchData = await cacheResponse.json();
        } else {
          fetchData = await fetchSearchSuggestions(keyword);

          let newHeaders = new Headers(fetchData.headers);
          newHeaders.append(DATE_NAME, new Date().toISOString());

          await cache.put(
            `https://api.clinicaltrialskorea.com/api/v1/search-conditions/?name=${keyword}`,
            new Response(JSON.stringify(fetchData), {
              headers: newHeaders,
            })
          );
        }

        console.info("calling api");
      }

      props.setSearchKeyword(keyword);
      props.setSearchSuggestions(fetchData.slice(0, 7) || []);
    }, 300);

    setDebounce(time);
  };

  const onFocusAutoCompleteSearch = () => {
    props.setIsVisible(true);
  };

  const onBlurAutoCompleteSearch = () => {
    if (props.searchRef.current !== null) {
      props.searchRef.current.value = "";
    }
    props.setSearchSuggestions([]);
    props.setIsVisible(false);
  };

  return (
    <S.Container isVisible={props.isVisible}>
      <S.TextInputWrapper>
        <label htmlFor="search_bar_main"></label>
        <S.TextInput
          type="text"
          id="search_bar_main"
          placeholder={props.isVisible ? "" : "질환명을 입력해주세요."}
          ref={props.searchRef}
          onChange={onChangAutoCompleteSearch}
          onFocus={onFocusAutoCompleteSearch}
          onBlur={onBlurAutoCompleteSearch}
          onKeyUp={event =>
            props.onKeyUpSearchKeyword(
              event,
              props.searchRef.current ? props.searchRef.current.value : ""
            )
          }
        />
      </S.TextInputWrapper>
      <S.ButtonWrapper>
        <S.SearchButton onClick={props.onClickSubmitSearch}>검색</S.SearchButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}
