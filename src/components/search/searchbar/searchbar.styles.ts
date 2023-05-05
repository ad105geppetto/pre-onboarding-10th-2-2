import styled from "styled-components";

interface IProps {
  isVisible: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 490px;
  padding-right: 8px;
  background-color: white;
  border-radius: 42px;
  border: ${(props: IProps) => (props.isVisible ? "2px solid #007be9" : "2px solid white")};
`;

export const TextInputWrapper = styled.div`
  display: flex;
  width: 430px;
  padding: 20px 10px 20px 24px;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 1px 25px 1px 2px;
  border: none;
  outline: none;
  font-size: 1.125rem;
  font-weight: 400;
`;

export const SearchButton = styled.button`
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 100%;
  color: white;
  background-color: #007be9;
  cursor: pointer;
`;
