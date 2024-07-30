import Button from 'components/MaterialUI/Button';
import styled from 'styled-components';

const BotaoOutlineComIcone = styled(Button)`
  background: white;
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 40px;
  margin: 10px;

  img {
    margin-right: 5px;
    vertical-align: middle;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 12px;
  }
`;

export default BotaoOutlineComIcone;
