import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h3" className={classes.header}>
        Bem-vindo à Página Inicial
      </Typography>
      <Typography variant="body1">
        Esta é a sua página inicial criada com ReactJS e Material-UI.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Começar
      </Button>
    </Container>
  );
}

export default HomePage;
