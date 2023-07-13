import styled from "styled-components";
import { AiFillLike, AiFillDislike } from 'react-icons/ai'; 

const LikeStyled = styled(AiFillLike)`
  color: ${props => (props.like ? '#d30069' : 'black')};
`;

const DeslikeStyled = styled(AiFillDislike)`
  color: ${props => (props.dislike ? '#d30069' : 'black')};
`;

export { LikeStyled, DeslikeStyled };
