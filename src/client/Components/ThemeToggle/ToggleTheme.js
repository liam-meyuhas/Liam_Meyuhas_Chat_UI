import {styled, Switch} from '@mui/material';
import {moonDrawing, sunDrawing} from '../../resources/ToggleThemeDrawings';

const MaterialUISwitch = styled(Switch)(({theme}) => ({
  width: 56,
  height: 30,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="${moonDrawing}"/></svg>')`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5'
        })
      }
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#121275FF',
    width: 28,
    height: 28,
    '&::before': {
      content: '\'\'',
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="${sunDrawing}"/></svg>')`
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892'
    })
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5'
    })
  }
}));

const ToggleTheme = ({isLightMode, setIsLightMode}) => {
  const toggleMode = () => {
    setIsLightMode((prevMode) => !prevMode);
  };
  return (
    <span className={"Button"}>
      ערכת נושא
      <MaterialUISwitch checked={isLightMode} onChange={toggleMode}/>
    </span>
  );
};

export default ToggleTheme;