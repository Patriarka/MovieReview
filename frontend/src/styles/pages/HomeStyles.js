import styled from "styled-components";
import { Input, Select } from "antd";

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

export { StyledInput, StyledSelect };