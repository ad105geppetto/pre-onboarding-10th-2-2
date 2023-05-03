import styled from "styled-components";

export const SearchTitle = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2.125rem;
  font-weight: 700;
  letter-spacing: -0.018em;
  line-height: 1.6;
  margin-bottom: 40px;
`;

interface IProps {
  isVisible: boolean;
}

export const Suggestions = styled.div`
  padding: 20px;
`;

export const SuggestionsWrapper = styled.div`
  display: ${(props: IProps) => (props.isVisible ? "" : "none")};
  margin-top: 10px;
  border-radius: 20px;
  background-color: white;
`;

export const SuggestionTitle = styled.div`
  font-size: 12px;
  padding: 25px 0;
  font-weight: 600;
  color: #767f86;
`;

export const NoSearch = styled.div`
  padding-bottom: 20px;
  font-weight: 600;
  border-bottom: 1px solid #edf0f2;
  color: #a7afb7;
`;

export const SuggestionButtonWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
  gap: 10px;
`;

export const SuggestionButton = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  color: #007be9;
  background-color: #eef8ff;
  cursor: pointer;
`;

export const SearchKeyword = styled.div`
  padding-top: 10px;
  font-size: 1.125rem;
  font-weight: 700;
`;

export const SuggestionKeywordWrapper = styled.div`
  padding: 10px 0;
`;
