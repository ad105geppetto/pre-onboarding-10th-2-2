import * as S from "./autoComplete.styles";
import SearchIcon from "../../common/SearchIcon";
import { IAutoCompleteProps } from "./autoComplete.types";

export default function AutoComplete(props: IAutoCompleteProps) {
  const dataLength = props.searchSuggestions.length;

  return (
    <>
      {props.searchSuggestions.map((keyword: { id: number; name: string }, index) => {

        const tempName = keyword.name.replaceAll(props.boldText, "@").split("");
        const newName = tempName.map((char, idx) => {
          if (char === "@") return <S.Bold key={idx}>{props.boldText}</S.Bold>;
          return <S.NormalText key={idx}>{char}</S.NormalText>;
        });
        const isLastEl = index === dataLength - 1;

        return (
          <S.SuggestionKeywordWrapper
            key={keyword.id}
            onClick={() => props.onClickSearchKeyword(keyword.name)}
            onKeyUp={event => props.onKeyUpSearchKeyword(event, keyword.name)}
          >
            <button className={isLastEl ? "search-res-last-el" : ""}>
              <SearchIcon color="#BABABA" viewBox="0 -10 26 26" size={26} />
              {newName}
            </button>
          </S.SuggestionKeywordWrapper>
        );
      })}
    </>
  );
}
