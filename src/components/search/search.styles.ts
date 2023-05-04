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

export const SuggestionsWrapper = styled.div`
  display: ${(props: IProps) => (props.isVisible ? "" : "none")};
  margin-top: 10px;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
`;

export const SuggestionTitle = styled.div`
  font-size: 12px;
  padding: 25px 0;
  font-weight: 600;
  color: #767f86;
`;

export const SearchKeyword = styled.div`
  padding-top: 10px;
  font-size: 1.125rem;
  font-weight: 700;
`;
