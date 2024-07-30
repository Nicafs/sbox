import styled from 'styled-components';

export const TitleSelfie = styled.h1`
  color: ${({ theme }) => theme.palette.primary.selected};
  font-size: 24px;
`;

export const SubTitleSelfie = styled.h1`
  color: ${({ theme }) => theme.palette.grey[600]};
  font-size: 18px;
  margin: 10px 0px;
  font-weight: normal;
`;

export const Image = styled.img`
  max-height: 400px;
  max-width: 100%;
  border-radius: 10px;
`;
