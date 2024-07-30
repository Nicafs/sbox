import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Divider as DividerUI } from '@material-ui/core';

const Divider = styled(DividerUI)`
  ${props =>
    props.dashed
      ? css`
          opacity: 0.32;
          border: solid 1.5px #979797;
          border-style: dashed;
        `
      : null}

  ${props =>
    props.fullwidth
      ? css`
          width: 100%;
        `
      : null}
`;

Divider.propTypes = {
  dashed: PropTypes.string,
  fullwidth: PropTypes.bool,
};

Divider.defaultProps = {
  dashed: null,
  fullwidth: null,
};

export default Divider;
