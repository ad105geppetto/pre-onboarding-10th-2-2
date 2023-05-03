import { ChangeEvent, useState } from "react";
import fetchSearchSuggestions from "../../api/fetchSearchSuggestions";
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
        fetchData = await fetchSearchSuggestions(keyword);
        console.info("calling api");
      }

      props.setSearchKeyword(keyword);
      props.setSearchSuggestions(fetchData || []);
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
    props.setSearchKeyword("");
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
        />
      </S.TextInputWrapper>
      <S.ButtonWrapper>
        <S.SearchButton onClick={props.onClickSubmitSearch}>검색</S.SearchButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}
