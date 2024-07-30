import React, { useEffect } from 'react';

import { moneyMask } from 'commons/utils/MaskHandle';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { CelulaStyled, TableCellStyled } from './style';

const columns = [
  { id: 'numero', label: 'Número' },
  {
    id: 'dataVencimento',
    label: 'Data vencimento',
    minWidth: 100,
    align: 'center',
  },
  { id: 'valor', label: 'Valor', minWidth: 100, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 100, align: 'right' },
];

export default function ListagemDeParcelas({
  parcelas,
  qtdPorPagina = 10,
  maxHeight = 440,
}) {
  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      ...(maxHeight && { maxHeight }),
    },
  });
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(qtdPorPagina);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    if (parcelas && parcelas.length > 0) {
      const parcelasArr = parcelas.map(
        ({ numero, dataVencimentoMoment, valor, pago }) => ({
          numero,
          valor: `R$ ${moneyMask(valor)}`,
          dataVencimento: dataVencimentoMoment.format('MM/YYYY'),
          status: pago ? 'PAGO' : 'PENDENTE',
        }),
      );
      setRows(parcelasArr);
    }
  }, [parcelas]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getQtdPorPaginaOptions = () => {
    const options = [5, 10, 25, 100];
    if (!options.includes(qtdPorPagina)) {
      options.push(qtdPorPagina);
    }
    options.sort((anterior, atual) => {
      if (anterior < atual) {
        return -1;
      }
      if (anterior > atual) {
        return 1;
      }
      return 0;
    });
    return options;
  };

  return (
    <Paper className={classes.root}>
      <TableContainer name="tabelaContainer" className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  name="tabelaItem"
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    name={`parcela-${row.numero}`}
                  >
                    {columns.map(({ id, align, format }) => {
                      const value = row[id];
                      return (
                        <TableCellStyled key={id} align={align}>
                          <CelulaStyled id={id} name={id} value={value}>
                            {format && typeof value === 'number'
                              ? format(value)
                              : value}
                          </CelulaStyled>
                        </TableCellStyled>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        name="tabelaParcelasPaginacao"
        labelRowsPerPage="Parcelas por página"
        rowsPerPageOptions={getQtdPorPaginaOptions()}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to === -1 ? count : to} de ${
            count !== -1 ? count : `mais que ${to}`
          }`
        }
      />
    </Paper>
  );
}
