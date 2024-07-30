import React from 'react';

import { orange, yellow, lightGreen } from '@material-ui/core/colors';

import { Ul, Li, Button } from './styles';

function ReguaNotas({ onClick }) {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const getColor = number => {
    switch (number) {
      case '0':
        return orange[900];
      case '1':
        return orange[700];
      case '2':
        return orange[500];
      case '3':
        return orange[300];
      case '4':
        return orange[200];
      case '5':
        return yellow[400];
      case '6':
        return yellow[300];
      case '7':
        return yellow[200];
      case '8':
        return lightGreen[200];
      case '9':
        return lightGreen[400];
      case '10':
        return lightGreen[600];
      default:
    }
  };

  return (
    <Ul>
      {numbers.map(number => {
        return (
          <Li key={number}>
            <Button
              type="button"
              color={getColor(number)}
              onClick={() => onClick(Number(number))}
            >
              {number}
            </Button>
          </Li>
        );
      })}
    </Ul>
  );
}

export default ReguaNotas;
