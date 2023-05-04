import * as S from "./suggestedSearchGroup.styles";

export default function SuggestedSearchGroup() {
  return (
    <>
      <S.SuggestionTitle>추천 검색어로 검색해보세요</S.SuggestionTitle>
      <S.SuggestionButtonWrapper>
        <S.SuggestionButton>B형간염</S.SuggestionButton>
        <S.SuggestionButton>비만</S.SuggestionButton>
        <S.SuggestionButton>관절염</S.SuggestionButton>
        <S.SuggestionButton>우울증</S.SuggestionButton>
        <S.SuggestionButton>식도염</S.SuggestionButton>
      </S.SuggestionButtonWrapper>
    </>
  );
}
