import devices from 'commons/constants/devices';
import styled from 'styled-components';

const TableStyled = styled.table`
  color: black;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1em;
  display: table;

  thead {
    tr {
      @media ${devices.mobile} {
        display: flex;
      }

      th {
        text-align: left;
        color: rgba(0, 0, 0, 0.3);
        font-weight: normal;
        text-align: center;

        @media ${devices.mobile} {
          flex-basis: 100%;
          text-align: center;
        }
      }
    }
  }

  tbody {
    tr {
      margin-top: 15px;
      @media ${devices.mobile} {
        display: flex;
      }
    }

    td {
      padding: 20px;
      background: white;
      text-align: center;

      @media ${devices.mobile} {
        text-align: center;
        flex-basis: 100%;
      }
    }
  }

  @media ${devices.mobile} {
    display: flex;
    flex-direction: column;
    overflow-x: scroll;
  }
`;

export { TableStyled };
