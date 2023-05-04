import * as S from "./autoComplete.styles";
import { IAutoCompleteProps } from "./autoComplete.types";

export default function AutoComplete(props: IAutoCompleteProps) {
  return (
    <>
      <S.SuggestionTitle>추천 검색어</S.SuggestionTitle>
      {props.searchSuggestions.map((keyword: { id: number; name: string }, index) => (
        <S.SuggestionKeywordWrapper
          key={index}
          onClick={() => props.onClickSearchKeyword(keyword.name)}
          onKeyUp={event => props.onKeyUpSearchKeyword(event, keyword.name)}
        >
          <div>{keyword.name}</div>
        </S.SuggestionKeywordWrapper>
      ))}
    </>
  );
}
