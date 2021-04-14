import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import Controls from '../../controls/Controls'
import React from 'react';
import { NotListedLocation } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: 'absolute',
    top: theme.spacing(5),
    padding: theme.spacing(2),
  },
  dialogContent: {
    textAlign: 'center',
  },
  dialogTitle: {
    textAlign: 'center',
    
  },
  dialogActions: {
    justifyContent: 'center',
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    marginLeft:'60px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      cursor: 'default',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem',
      
    },
  },
}));

const ConfirmDialog = (props) => {
  const classes = useStyles();
  const { confirmDialog, setConfirmDialog } = props;
  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocation />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.dialogContent}>
        <Typography variant='h6' component='div'>
          {confirmDialog.title}
        </Typography>
        <Typography variant='subtitle2' component='div'>
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Controls.Button
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
          text='No'
          color='default'
        />
        <Controls.Button
          onClick={confirmDialog.onConfirm}
          text='Yes'
          color='secondary'
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
