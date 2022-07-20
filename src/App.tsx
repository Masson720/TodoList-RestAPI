import React from 'react';
import './App.css';
import {Login} from "./Login/Login";
import store from './Store/redux-store';
// @ts-ignore
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import {TodoLists} from "./Todo/ListBody";


function App() {
    return (
      <BrowserRouter>
        <Provider store={store}>
              <div className="App">
                  <Login/>
                  <TodoLists/>
            </div>
        </Provider>
      </BrowserRouter>
  );
}

export default App;
