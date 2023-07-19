import styled from "styled-components";
import { Button } from "antd";

const StyledButton = styled(Button)`
  background-color: ${(props) => (props.isFollowed ? '#d30069' : '#7a7a7a')};
  color: #fff !important;
  border: none;
  font-weight: 500;
  transition: background-color 0.5s ease-in-out;
  margin-left: auto;
  margin-right: 16px;

  &:hover {
    background-color: ${(props) => (props.isFollowed ? '#f02222' : '#878787')} !important;
    transition: background-color 0.5s ease-in-out;
  }
`;

export { StyledButton };