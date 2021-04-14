import React from 'react';
import { Button as MuiButton, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  label: {
    textTransform: 'none',
  },
}));
const Button = (props) => {
  const classes = useStyles();
  const { text, size, color, variant, onClick, ...other } = props;
  return (
    <MuiButton
      className={classes.root}
      variant={variant || 'contained'}
      color={color || 'primary'}
      size={size || 'large'}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}>
      {text}
    </MuiButton>
  );
};

export default Button;
