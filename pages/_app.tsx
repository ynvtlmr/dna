import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../lib/theme';
import React from 'react';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default MyApp;
