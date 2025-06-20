import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Tooltip from '@mui/material/Tooltip';

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
    <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
      {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  </Tooltip>
  );
}
