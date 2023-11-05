import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// React-Router-Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Bootstrap, jQuery and Popper
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import 'jquery/dist/jquery';
import 'popper.js/dist/umd/popper';

// Redux store and Provider
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
