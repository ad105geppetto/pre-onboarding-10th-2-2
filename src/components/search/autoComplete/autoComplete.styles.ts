import styled from "styled-components";

export const SuggestionKeywordWrapper = styled.li`
  padding: 10px 0;

  strong {
    font-weight: bold;
  }

  button {
    display: block;
    width: 100%;
    text-align: left;
  }
`;

export const Bold = styled.span`
  font-weight: bold;
  text-indent: 0;
`;

export const NormalText = styled.span`
  text-indent: 0;
  white-space: pre;
`;
