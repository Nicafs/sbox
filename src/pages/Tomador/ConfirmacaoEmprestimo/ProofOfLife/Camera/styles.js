import styled from 'styled-components';

export const WebcamContainer = styled.div`
  width: 580px;
  display: flex;
  height: 326.25px;
  text-align: center;

  video {
    border-radius: 15px;
    width: 580px;
    height: 326.25px;
  }

  canvas {
    position: absolute;
    width: 580px;
    height: 326.25px;
  }

  @media only screen and (max-width: 600px) {
    width: 190px;
    height: 330px;

    video {
      border-radius: 15px;
      width: 190px;
      height: 330px;
    }

    canvas {
      position: absolute;
      width: 190px;
      height: 330px;
    }
  }
`;
