import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './store'
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <Provider store={store}>
    <App />
    <ToastContainer position="top-center" newestOnTop autoClose={1000} />
    </Provider>
 
  </React.StrictMode>
);

