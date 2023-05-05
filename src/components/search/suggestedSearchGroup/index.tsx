import * as S from "./suggestedSearchGroup.styles";

export default function SuggestedSearchGroup() {
  const data = [
    {
      id: 1,
      value: "B형감염",
    },
    {
      id: 2,
      value: "비만",
    },
    {
      id: 3,
      value: "관절염",
    },
    {
      id: 4,
      value: "우울증",
    },
    {
      id: 5,
      value: "식도염",
    },
  ];
  return (
    <>
      <S.SuggestionTitle>추천 검색어로 검색해보세요</S.SuggestionTitle>
      <S.SuggestionButtonWrapper>
        {data.map((e, i) => {
          const isLastEl = i === data.length - 1;
          return (
            <S.SuggestionButton key={e.id} className={isLastEl ? "search-res-last-el" : ""}>
              {e.value}
            </S.SuggestionButton>
          );
        })}
      </S.SuggestionButtonWrapper>
    </>
  );
}
