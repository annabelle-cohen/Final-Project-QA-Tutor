import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux'
import rootReducer from './Reducers/rootReducer'
import {loadState, saveState } from "./store/localStorage";
import { Provider } from 'react-redux'

//restore the state that were last used
const persistedState = loadState();

//create kind of store with root reducer and the restore is we have one
const store = createStore(rootReducer,persistedState);

//saving the rootreducer to the local storage
saveState(rootReducer.getState);

store.subscribe(()=>{
  saveState(store.getState())
 });

console.log(store.getState());


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
