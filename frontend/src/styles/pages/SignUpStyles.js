import styled from 'styled-components';

import { Button, Input } from 'antd';

const StyledButton = styled(Button)`
  background-color: #d30069; 
  border: none;

  &:hover {
    background-color: #e90074 !important;
  }
`;

const StyledInput = styled(Input)`
  &:focus {
    border-color: #e90074 !important;
  }
`;

export { StyledButton, StyledInput };