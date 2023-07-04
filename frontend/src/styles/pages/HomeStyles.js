import styled from "styled-components";
import { Input, Select, Menu } from "antd";

const StyledInput = styled(Input)`
  && {
    max-width: 280px;

    &:hover,
    &:focus {
      border-color: #e90074 !important;
    }
  }
`;

const StyledSelect = styled(Select)`
  && {
    .ant-select-selector:hover,
    .ant-select-selector:focus {
      border-color: #e90074 !important;
    }
  }
`;

const StyledMenuItem = styled(Menu.Item)`
  color: #000;
  border: none;

  &:focus {
    background-color: #dedede;
    color: #000;
  }
`;

const StyledMenu = styled(Menu)`
  background-color: transparent;

  .ant-menu-item-selected {
    background-color: #dedede;
    color: #e90074;
  }
`;

export { StyledInput, StyledSelect, StyledMenuItem, StyledMenu };