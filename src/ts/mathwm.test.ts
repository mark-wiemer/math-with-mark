import * as mathjs from 'mathjs';
import * as mathwm from './mathwm';
import Rule from './rules';

describe('coefficient', () => {
  let coefficient = mathwm.coefficient;
  it('works in the simplest case', () => {
    let sut = mathjs.parse('1x^2');
    expect(coefficient(sut, 'x', 2)).toBe(1);
  });

  it('works in a trivial sum', () => {
    let sut = mathjs.parse('1x^2 + 1x^2');
    expect(coefficient(sut, 'x', 2)).toBe(2);
  });

  it('works with non-1 coefficients', () => {
    let sut = mathjs.parse('2x^2 + 3x^2');
    expect(coefficient(sut, 'x', 2)).toBe(5);
  });

  it('only gets powers of the given variable', () => {
    let sut = mathjs.parse('2x^2 + 4y^2 + 1x^2');
    expect(coefficient(sut, 'x', 2)).toBe(3);
  });

  it('only gets power of the given degree', () => {
    let sut = mathjs.parse('1x^2 + 3x^3 + 2x^2 + 4x^3');
    expect(coefficient(sut, 'x', 3)).toBe(7);
  });
});

describe('evaluate product of one variable', () => {
  let sut = (mathText: string): string => {
    return mathwm.applyRule(mathText, Rule.ProductOfOneVariable);
  };
  it('works in nominal case', () => {
    expect(sut('x^2*x^3')).toBe('x^(2+3)');
  });

  it('returns given text when given text cannot be parsed', () => {
    expect(sut('+')).toBe('+');
  });

  it('returns given text when rule cannot be applied', () => {
    expect(sut('1+4')).toBe('1+4');
  });

  it('does not mistakenly evaluate addition', () => {
    expect(sut('(x+2)+(x+3)')).toBe('(x+2)+(x+3)');
  });
});

describe('tryEvaluateArithmetic', () => {
  let tryEvaluate = mathwm.tryEvaluateArithmetic;
  it("Evaluates empty string to 'Invalid expression'", () => {
    let sut = '';
    expect(tryEvaluate(sut)).toBe('Invalid expression');
  });

  it('Evaluates numbers to their value', () => {
    let sut = '42';
    expect(tryEvaluate(sut)).toBe('42');
  });

  it('Evaluates first three hyperoperators on real numbers', () => {
    let sut = '1 + 2 - 3 * 4 / 5 + 6 ^ 7 - log(e)';
    expect(tryEvaluate(sut)).toBe('279935.6');
  });

  it('Evaluates expressions with complex numbers', () => {
    let sut = '2 + i - 3 + 2i';
    expect(tryEvaluate(sut)).toBe('-1 + 3i');
  });
});

describe('evaluateArithmetic', () => {
  // compare string representations, should be equal
  let sut = (testCase: string): string => {
    let node = mathjs.parse(testCase);
    return mathwm.evaluateArithmetic(node).toString();
  };
  it('does not evaluate algebra', () => {
    expect(sut('x+x')).toEqual('x + x');
  });

  it('does evaluate arithmetic', () => {
    expect(sut('1+2')).toEqual('3');
  });

  it('evaluates arithmetic inside algebraic expression', () => {
    expect(sut('(1+1)*x')).toEqual('2 * x');
  });
});