import styled from 'styled-components';

const FooterMobileContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  background: ${({ theme }) => theme.palette.common.white};

  rgba(0, 0, 0, 0.2) 0px 6px 6px -3px, rgba(0, 0, 0, 0.14) 0px 10px 14px 1px, rgba(0, 0, 0, 0.12) 0px 4px 18px 3px;
`;

export default FooterMobileContainer;
