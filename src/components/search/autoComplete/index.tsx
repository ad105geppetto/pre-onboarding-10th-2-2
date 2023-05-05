import * as S from "./autoComplete.styles";
import SearchIcon from "../../common/SearchIcon";
import { IAutoCompleteProps } from "./autoComplete.types";

export default function AutoComplete(props: IAutoCompleteProps) {
  const dataLength = props.searchSuggestions.length;

  return (
    <>
      {props.searchSuggestions.map((keyword: { id: number; name: string }, index) => {
        let matchSplited;
        if (props.searchingValue) {
          matchSplited = keyword.name.split(props.searchingValue);
        }

        let isSame = matchSplited?.join("") === "";
        const isLastEl = index === dataLength - 1;

        return (
          <S.SuggestionKeywordWrapper
            key={keyword.id}
            onClick={() => props.onClickSearchKeyword(keyword.name)}
            onKeyUp={event => props.onKeyUpSearchKeyword(event, keyword.name)}
          >
            <button className={isLastEl ? "search-res-last-el" : ""}>
              <SearchIcon color="#BABABA" viewBox="0 -10 26 26" size={26} />
              {isSame ? (
                <strong>{keyword.name}</strong>
              ) : (
                matchSplited?.map((value, i) => {
                  if (value.trim() === "") {
                    return <strong key={i}>{props.searchingValue}</strong>;
                  } else {
                    return value;
                  }
                })
              )}
            </button>
          </S.SuggestionKeywordWrapper>
        );
      })}
    </>
  );
}
