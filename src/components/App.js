import React, { useState, useEffect } from 'react';

import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Grid, LinearProgress, Paper, Typography } from '@material-ui/core';

import { differenceInDays, format, formatDistanceStrict } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  waited: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  const orderDate = new Date('2019-12-30');
  const deliveryDate = new Date('2020-4-15');

  const [difference, setDifference] = useState(0);
  const [normalizedProgress, setNormalizedProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setDifference(differenceInDays(deliveryDate, orderDate));
    setElapsed(differenceInDays(new Date(), orderDate));
  }, [orderDate, deliveryDate]);

  useEffect(() => {
    setNormalizedProgress((elapsed - 0) * 100 / (difference - 0));
  }, [difference, elapsed]);

  return (
    <MuiThemeProvider>
      <CssBaseline />
      <Container className={classes.container}>
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography variant="caption">{format(orderDate, 'MMM do')}</Typography>
            <Typography variant="caption">{format(deliveryDate, 'MMM do')}</Typography>
          </Grid>
          <LinearProgress variant="determinate" value={normalizedProgress} />
          <Grid container direction="row" justify="center" alignItems="center" className={classes.waited}>
            <Typography variant="body1">
              {`You've waited ${formatDistanceStrict(orderDate, new Date(), { unit: 'day' })}. `}
              {`${formatDistanceStrict(new Date(), deliveryDate, { unit: 'day' })} left to go, chill.`}
            </Typography>
          </Grid>
        </Paper>
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
