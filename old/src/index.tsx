import { MathJaxContext } from 'better-react-mathjax';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <MathJaxContext>
      <App />
    </MathJaxContext>
  </React.StrictMode>,
);
