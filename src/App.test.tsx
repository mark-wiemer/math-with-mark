import { MathJaxContext } from 'better-react-mathjax';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { test } from 'vitest';

import App from './App';

test('renders without crashing', () => {
    const div = document.createElement('div');
    const root = ReactDOM.createRoot(div);
    root.render(
        <React.StrictMode>
            <MathJaxContext>
                <App />
            </MathJaxContext>
        </React.StrictMode>,
    );
});
