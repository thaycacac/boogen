import styled from 'styled-components'
import theme from '../../../theme/variable'

const Button = styled.button`
  border: none;
  color: ${theme.colors.primary};
  cursor: pointer;
  display: inline-block;
  line-height: 2.5;
  padding: 0 12px;
  position: relative;
  text-align: center;
`;

export default Button
