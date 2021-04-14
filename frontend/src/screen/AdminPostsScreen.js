import React from 'react';
import ReactDom from 'react-dom';


import PostListScreen from './PostListScreen'
import {
  CssBaseline,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import AdminScreenNav from './AdminScreenNav'


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
function AdminPostsScreen() {
  const classes = useStyles();

 

  const contentAdmin = (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <div className={classes.appMain}>
        <AdminScreenNav/>

          <PostListScreen/>
         
        </div>

        <CssBaseline />
      </React.Fragment>
    </ThemeProvider>
  );
  return ReactDom.createPortal(
    contentAdmin,
    document.getElementById('admin-page')
  );
}

export default AdminPostsScreen;
