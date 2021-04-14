import React from 'react';
import {
  CssBaseline,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import AdminScreenNav from './AdminScreenNav';
import UserListScreen from './UserListScreen';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2B3053',
      light: '#3c44b126',
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526',
    },
    background: {
      default: '#f4f5fd',
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)',
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
  shape: {
    borderRadius: '5px',
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '20px',
    width: '100%',
    marginTop: '100px',
  },
});
function AdminUsersScreen() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <div className={classes.appMain}>
          <AdminScreenNav />

          <UserListScreen />
        </div>

        <CssBaseline />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default AdminUsersScreen;
