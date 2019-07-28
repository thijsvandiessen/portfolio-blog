import './styles/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app-tmp';

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {

  // register only a service worker if env is production
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log(`Service Worker registered! Scope: ${registration.scope}`);
        })
        .catch(err => {
          console.log(`Service Worker registration failed: ${err}`);
        });
    });
  }
}
