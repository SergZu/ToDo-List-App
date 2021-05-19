import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';

//Service worker register
window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/service-worker.js')
        }
        catch (err) {
            console.log('Service worker register failed')
        }
    }
})

ReactDOM.render(
        <App />,
    document.getElementById('root')
);

