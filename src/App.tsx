import { MathJax } from 'better-react-mathjax';
import React from 'react';
import { EditableMathField } from 'react-mathquill';
import Sandbox from './Sandbox';
import { texToMath, tryParse } from './utils/mathwm';
import TeX from '@matejmazur/react-katex';

function App() {
    const [latex, setLatex] = React.useState('1+2x+3y+4x+5y+6');

    return (
        <>
            <h1>Math with Mark</h1>
            <h2>Math editor</h2>
            <p>Styled input:</p>
            <EditableMathField
                latex={latex}
                onChange={(mathField) => setLatex(mathField.latex())}
            />
            <br />
            <p>Raw input:</p>
            <textarea
                style={{ resize: 'both' }}
                value={latex}
                onChange={(e) => setLatex(e.target.value)}
            />
            <hr />
            <p>
                MathJax: <MathJax dynamic>{`$$${latex}$$`}</MathJax>
            </p>
            <p>
                KaTeX: <TeX block math={latex} />
            </p>
            <p>{`Parsed LaTeX using custom parser: ${tryParse(
                texToMath(latex),
            )?.toString()}`}</p>
            <h2>Sandbox</h2>
            <Sandbox />
            <a href="https://github.com/mark-wiemer/math-with-mark">
                GitHub repository
            </a>
        </>
    );
}

export default App;
