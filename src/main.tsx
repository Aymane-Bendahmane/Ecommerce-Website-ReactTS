import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom"
import store from './reduxStore.tsx';
import {Provider} from 'react-redux';
import {QueryClient , QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>

            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <App/>
                </QueryClientProvider>
            </Provider>

        </BrowserRouter>

    </React.StrictMode>,
)
