import * as S from "./autoComplete.styles";
import SearchIcon from "../../common/SearchIcon";
import { IAutoCompleteProps } from "./autoComplete.types";

export default function AutoComplete(props: IAutoCompleteProps) {
  return (
    <>
      {props.searchSuggestions.map((keyword: { id: number; name: string }, index) => {
        let matchSplited;
        if (props.searchingValue) {
          matchSplited = keyword.name.split(props.searchingValue);
        }

        let isSame = matchSplited?.join("") === "";

        return (
          <S.SuggestionKeywordWrapper
            key={index}
            onClick={() => props.onClickSearchKeyword(keyword.name)}
            onKeyUp={event => props.onKeyUpSearchKeyword(event, keyword.name)}
          >
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
          </S.SuggestionKeywordWrapper>
        );
      })}
    </>
  );
}
