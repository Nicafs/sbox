import * as faceApi from 'face-api.js';

/* eslint-disable */

export const initDetections = async ({
  onFinish,
  webcamRef,
  canvasRef,
  setText,
  startLoading,
  stopLoading,
  moveAlong = false,
  isMobile,
}) => {
  if (startLoading) startLoading();

  const MODEL_URL = `${process.env.PUBLIC_URL}/models`;
  Promise.all([
    faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
  ]).then(() => {
    let drawAgain = true;
    let etapa = 'happy';
    let etapaAtual;

    const faceDetections = {
      neutral: {},
      happy: {},
      surprised: {},
    };

    const interval = setInterval(async () => {
      if (!etapa) {
        onFinish(faceDetections);
        clearInterval(interval);
        return;
      }

      if (etapaAtual && etapa !== etapaAtual) {
        etapaAtual = etapa;
        if (etapa === 'happy') {
          setText('feliz');
        }
        if (etapa === 'surprised') {
          setText('surpreso');
        }
        if (etapa === 'neutral') {
          setText('neutro');
        }
      }

      if (webcamRef?.current) {
        const tinyFaceDetectorOptions = new faceApi.TinyFaceDetectorOptions();
        const detections = await faceApi
          .detectAllFaces(webcamRef.current.video, tinyFaceDetectorOptions)
          .withFaceExpressions();

        if (canvasRef?.current && drawAgain) {
          const canvascurrent = canvasRef.current;
          drawAgain = moveAlong;
          
          drawCanvas(canvascurrent, moveAlong, detections, isMobile);

          if (!etapaAtual) {
            etapaAtual = etapa;

            if (etapa === 'happy') {
              setText('feliz');
            }
            if (etapa === 'surprised') {
              setText('surpreso');
            }
            if (etapa === 'neutral') {
              setText('neutro');
            }
          }

          if (stopLoading) stopLoading();
        }

        if (detections?.length > 0) {
          const {
            detection: { score },
            expressions,
          } = detections[0];

          if (etapa === 'happy') {
            etapa = captureExpression({
              expressions,
              score,
              webcamRef,
              expression: 'happy',
              nextEtapa: 'surprised',
              faceDetections,
              etapa,
            });
          }

          if (etapa === 'surprised') {
            etapa = captureExpression({
              expressions,
              score,
              webcamRef,
              expression: 'surprised',
              nextEtapa: 'neutral',
              faceDetections,
              etapa,
            });
          }

          if (etapa === 'neutral') {
            etapa = captureExpression({
              expressions,
              score,
              webcamRef,
              expression: 'neutral',
              nextEtapa: null,
              faceDetections,
              etapa,
            });
          }
        }
      }
    }, 300);
  });
};

export const drawCanvas = (canvascurrent, moveAlong, detections, isMobile) => {
  let resizedDetections;
  let resizedBox;
  if (moveAlong) {
    resizedDetections = faceApi.resizeResults(detections, {
      width: canvascurrent.width,
      height: canvascurrent.height,
    });
    resizedBox = resizedDetections[0].detection.box;

    canvascurrent
      .getContext('2d')
      ?.clearRect(0, 0, canvascurrent.width, canvascurrent.height);
  }

  if (
    (resizedDetections &&
      resizedDetections?.length > 0 &&
      resizedDetections[0].detection) ||
    !moveAlong
  ) {
    const box = {
      x: moveAlong ? (resizedBox ? resizedBox.x : 0) + 45 : 150,
      y: moveAlong ? (resizedBox ? resizedBox.y : 0) - 10 : 75,
      width: 40,
      height: 45,
    };

    const ctx = canvascurrent.getContext('2d');

    if (!isMobile) {
      const gradient = ctx?.createRadialGradient(
        box.x,
        box.y,
        48,
        box.x,
        box.y,
        50,
      );
      gradient?.addColorStop(0, 'transparent');
      gradient?.addColorStop(0, 'transparent');
      gradient?.addColorStop(1, 'rgba(84, 84, 84, .6)');

      ctx?.beginPath();
      ctx ? (ctx.fillStyle = gradient || 'transparent') : null;
      
      roundRect({
        ctx,
        x: 0,
        y: 0,
        width: canvascurrent.width,
        height: canvascurrent.height,
      });
    }

    ctx?.beginPath();
    ctx?.ellipse(
      box.x,
      box.y,
      isMobile ? 120 : 50,
      isMobile ? 40 : 50,
      0,
      0,
      Math.PI * 2,
      false,
    );
    ctx ? (ctx.lineWidth = 3) : null;
    ctx ? (ctx.strokeStyle = 'rgba(0, 45, 114, 1)') : null;
    ctx?.stroke();
  }
};

export const loadModels = async () => {
  const MODEL_URL = `${process.env.PUBLIC_URL}/models`;
  Promise.all([
    faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
  ]);
};

const captureExpression = ({
  expressions,
  score,
  webcamRef,
  expression,
  nextEtapa,
  faceDetections,
  etapa,
}) => {
  if (
    expression &&
    !faceDetections[expression].identifiedUser &&
    expressions[expression] > 0.9
  ) {
    const img = webcamRef.current?.getScreenshot();
    faceDetections[expression] = {
      identifiedUser: score,
      expression: expressions[expression],
      img: img,
    };
    etapa = nextEtapa;
    return etapa;
  }

  return etapa;
};

const roundRect = ({
  ctx,
  x,
  y,
  width,
  height,
  radius = 8,
  fill = true,
  stroke = false,
}) => {
  const allRadius = { tl: radius, tr: radius, br: radius, bl: radius };

  ctx.beginPath();
  ctx.moveTo(x + allRadius.tl, y);
  ctx.lineTo(x + width - allRadius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + allRadius.tr);
  ctx.lineTo(x + width, y + height - allRadius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - allRadius.br,
    y + height,
  );
  ctx.lineTo(x + allRadius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - allRadius.bl);
  ctx.lineTo(x, y + allRadius.tl);
  ctx.quadraticCurveTo(x, y, x + allRadius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
};
