import styled from "styled-components";
import { Input, Button } from "antd";

const StyledInput = styled(Input)`
  background-color: #f3f4f6;
  padding: 8px;
`;

const StyledPublicationButton = styled(Button)`
  background-color: #d30069;
  color: #fff;
  max-width: 160px;
  border: none;

  && {

    &:hover,
    &:focus {
      background-color: #e90074 !important;
      color: #fff;
    }
  }
`;

export { StyledInput, StyledPublicationButton };
