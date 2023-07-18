import styled from 'styled-components';

import { Button, Input } from 'antd';

const StyledButton = styled(Button)`
  background-color: #d30069; 
  border: none;

  &:hover {
    background-color: #e90074 !important;
  }
`;

const StyledSecondaryButton = styled(Button)`
  background-color: #9e9e9e; 
  border: none;
  color: #fff;

  &:hover {
    background-color: #b3b3b3 !important;
    color: #fff !important;
  }
`;

const StyledInput = styled(Input)`
  &:focus {
    border-color: #e90074 !important;
  }
`;

export { StyledButton, StyledInput, StyledSecondaryButton };