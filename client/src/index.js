import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from 'react-helmet-async';
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
const helmetContext = {};

root.render(
  <React.StrictMode>
   <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <App />     
    </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
