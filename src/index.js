import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/bootstrap.css'
import './css/index.css'
import './css/animaciones.css'
import {FirebaseAppProvider} from 'reactfire';
import db from './Firebase'

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={db.Config} >
      <Suspense fallback={'Conectando al servidor...'} >
        <App />
      </Suspense>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
