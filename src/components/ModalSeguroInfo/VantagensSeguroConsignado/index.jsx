import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import WorkIcon from '@material-ui/icons/Work';

const VantagensSeguroConsignado = () => (
  <List>
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <WorkIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Desemprego"
        secondary="Em caso de desemprego involuntário, contará com a quitação de até 4 parcelas no valor de até R$1.000,00 (mil reais) do seu empréstimo"
      />
    </ListItem>
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <LocalHospitalIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Acidente"
        secondary="Em caso de caso de Morte ou invalidez permanente total por acidente, o seguro quitará o Saldo Devedor do contrato, a contar da data da ocorrência do sinistro, no valor de até R$25.000,00 (vinte e cinco mil reais)"
      />
    </ListItem>
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <MoodBadIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Funeral"
        secondary="Assistência Funeral no valor de até R$3.300,00 (três mil e trezentos reais)"
      />
    </ListItem>
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <AttachMoneyIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Prêmio"
        secondary="O(a) senhor(a) concorre a um título de capitalização no valor bruto de R$5.000,00 (cinco mil reais) mensalmente sorteado pela loteria federal"
      />
    </ListItem>
  </List>
);

export default VantagensSeguroConsignado;
