import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import AccessibleIcon from '@material-ui/icons/Accessible';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import WorkIcon from '@material-ui/icons/Work';

const VantagensSeguroEp = ({ ocupacaoProfissional }) => {
  let itemPerdaRenda;
  switch (ocupacaoProfissional) {
    case 'APO':
    case 'PEN':
    case 'LAR':
      itemPerdaRenda = null;
      break;
    case 'ASS':
    case 'PUB':
      itemPerdaRenda = (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Perda de Renda por Desemprego (PRD)"
            secondary={
              <>
                <Typography>
                  O seguro quitará até 6 parcelas de, no máximo, R$ 150,00 cada
                </Typography>
                <Typography>CARÊNCIA: 30 dias</Typography>
                <Typography>FRANQUIA: 15 dias</Typography>
              </>
            }
          />
        </ListItem>
      );
      break;
    default:
      itemPerdaRenda = (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>
              <LocalHospitalIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Perda de Renda Temporária por Acidente ou Doença (PRIT)"
            secondary={
              <>
                <Typography>
                  O seguro quitará até 6 parcelas de, no máximo, R$ 150,00 cada
                </Typography>
                <Typography>CARÊNCIA: 60 dias</Typography>
                <Typography>FRANQUIA: 15 dias</Typography>
              </>
            }
          />
        </ListItem>
      );
      break;
  }

  return (
    <List>
      {itemPerdaRenda}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>
            <AccessibleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Invalidez Permanente Total por Acidente (IPTA)"
          secondary={
            <>
              <Typography>
                O seguro quitará o saldo devedor do contrato, limitado a R$
                20.000,00
              </Typography>
              <Typography>CARÊNCIA: não tem</Typography>
              <Typography>FRANQUIA: não tem</Typography>
            </>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>
            <MoodBadIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Morte Acidental"
          secondary={
            <>
              <Typography>
                O seguro quitará o saldo devedor do contrato, limitado a R$
                20.000,00
              </Typography>
              <Typography>CARÊNCIA: não tem</Typography>
              <Typography>FRANQUIA: não tem</Typography>
            </>
          }
        />
      </ListItem>
    </List>
  );
};

export default VantagensSeguroEp;
