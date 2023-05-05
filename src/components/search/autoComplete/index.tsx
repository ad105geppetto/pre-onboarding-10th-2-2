import * as S from "./autoComplete.styles";
import SearchIcon from "../../common/SearchIcon";
import { IAutoCompleteProps } from "./autoComplete.types";

export default function AutoComplete(props: IAutoCompleteProps) {
  let newName;
  const dataLength = props.searchSuggestions.length;

  return (
    <>
      {props.searchSuggestions.map((keyword: { id: number; name: string }, index) => {
        const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(props.boldText);
        const splited = isKorean ? keyword.name.split(props.boldText) : keyword.name.split("");
        const boldList = keyword.name.match(new RegExp(`${props.boldText}`, "ig"));

        if (splited.join("") === "") {
          newName = <S.Bold>{props.boldText}</S.Bold>;
        } else {
          newName = splited.map((char, idx) => {
            if (isKorean && char.trim() === "") return <S.Bold key={idx}>{props.boldText}</S.Bold>;
            if (!isKorean && boldList?.includes(char)) return <S.Bold key={idx}>{char}</S.Bold>;
            return <S.NormalText key={idx}>{char}</S.NormalText>;
          });
        }

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
