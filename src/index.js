// React
import React from 'react';
import ReactDOM from 'react-dom/client';
// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Redux
import { Provider } from 'react-redux'
import store from "./store"
// Style
import './index.css';
// Components
import App from './App';
import Home from "./components/pages/Home"
import AddPage from './components/pages/AddPage';
import DeletePage from "./components/pages/DeletePage"
import SellPage from './components/pages/SellPage';
import HistoryPage from './components/pages/HistoryPage';
import Error from "./components/pages/Error"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Home />} />
            <Route path='add-products' element={<AddPage />} />
            <Route path='delete-products' element={<DeletePage />} />
            <Route path='sell-products' element={<SellPage />} />
            <Route path='history-products' element={<HistoryPage />} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
