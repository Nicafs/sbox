import styled from 'styled-components';

export const MaskWrapper = styled.div`
  position: relative;
  width: 580px;
  height: 326.25px;

  @media only screen and (max-width: 600px) {
    width: 190px;
    height: 330px;
  }
`;

export const Mascara = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 180px;
  margin-left: -125px;
  margin-top: -90px;

  @media only screen and (max-width: 600px) {
    width: 190px;
    height: 140px;
    top: 50%;
    left: 50%;
    margin-left: -95px;
    margin-top: -70px;
    transform: rotate(90deg);
  }
`;
