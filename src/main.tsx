import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {store} from './store/config.ts'
import {Provider} from 'react-redux'
import './index.css'
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'light'
    }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
)
