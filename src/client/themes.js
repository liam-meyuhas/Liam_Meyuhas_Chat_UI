import {createTheme} from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6633cc',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f0edee',
    },
    text: {
      primary: '#333',
    }
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8054d6',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#333',
    },
    text: {
      primary: '#f0edee',
    }
  },
});