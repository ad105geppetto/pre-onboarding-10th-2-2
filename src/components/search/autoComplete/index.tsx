import * as S from "./autoComplete.styles";
import SearchIcon from "../../common/SearchIcon";
import { IAutoCompleteProps } from "./autoComplete.types";

export default function AutoComplete(props: IAutoCompleteProps) {
  const dataLength = props.searchSuggestions.length;
  return (
    <>
      {props.searchSuggestions.map((keyword: { id: number; name: string }, index) => {
        const regex = new RegExp(`(${props.boldText})`, "gi");
        const chunks = keyword.name.split(regex);

        const newName = chunks.map((chunk, index) => {
          if (chunk.toLowerCase() === props.boldText.toLowerCase()) {
            return <S.Bold key={index}>{chunk}</S.Bold>;
          } else {
            return <S.NormalText key={index}>{chunk}</S.NormalText>;
          }
        });

        const isLastEl = index === dataLength - 1;
        const isSelected =
          props.currentNumber === -1 ||
          props.searchSuggestions[props.currentNumber].id !== keyword.id
            ? false
            : true;

        return (
          <S.SuggestionKeywordWrapper
            key={keyword.id}
            onClick={() => props.onClickSearchKeyword(keyword.name)}
            onKeyUp={event => props.onKeyUpSearchKeyword(event, keyword.name)}
            style={isSelected ? { background: "#f7f7fb" } : {}}
            isSelected={isSelected}
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
