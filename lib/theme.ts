// lib/theme.ts
import { createTheme } from '@mui/material/styles';

const themeMode = 'light'; // 'light' or 'dark'

const theme = createTheme({
    palette: {
        mode: themeMode,
    },
});

export default theme;
