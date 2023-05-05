import styled from "styled-components";

interface Props {
  isSelected: boolean;
}

export const SuggestionKeywordWrapper = styled.li<Props>`
  padding: 10px 0;
  strong {
    font-weight: bold;
  }
  button {
    display: block;
    width: 100%;
    text-align: left;
  }

  :hover {
    background-color: #f7f7fb;
  }
  background-color: ${props => (props.isSelected ? "#f7f7fb" : "none")};
`;

export const Bold = styled.span`
  font-weight: bold;
  text-indent: 0;
`;

export const NormalText = styled.span`
  text-indent: 0;
  white-space: pre;
`;
