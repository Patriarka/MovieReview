import styled from 'styled-components';

import { Button } from 'antd';

const StyledButton = styled(Button)`
  background-color: #a8a8a8; 
  color: #fff !important;
  border: none;

  &:hover {
    background-color: #bababa !important;
  }
`

export { StyledButton };