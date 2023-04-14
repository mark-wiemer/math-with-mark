import * as mathjs from 'mathjs';
import * as rules from './rules';
import { describe, test, expect } from 'vitest';

describe('low-level rule application', () => {
    const ruleSut = (rule: rules.RuleID): ((mathText: string) => string) => {
        return (mathText: string) => {
            let node = mathjs.parse(mathText);
            node = rules.RULES[rule].func(node);
            return node.toString();
        };
    };
    describe('evaluate arithmetic', () => {
        /** Applies arithmetic to the given MathText, then returns the MathText evaluation */
        const sut = ruleSut(rules.RuleID.Arithmetic);
        test('does not evaluate algebra', () => {
            expect(sut('x + x')).toEqual('x + x');
        });

        test('does evaluate arithmetic', () => {
            expect(sut('1 + 2')).toEqual('3');
        });

        test('does not evaluate division', () => {
            expect(sut('2 / 3')).toEqual('2 / 3');
        });
    });

    describe('evaluate product of one variable', () => {
        let sut = ruleSut(rules.RuleID.ProductOfOneVariable);
        test('works in nominal case', () => {
            expect(sut('x ^ 2 * x ^ 3')).toBe('x ^ (2 + 3)');
        });

        test('returns given text when rule cannot be applied', () => {
            expect(sut('1 + 4')).toBe('1 + 4');
        });

        test('does not mistakenly evaluate addition', () => {
            expect(sut('(x + 2) + (x + 3)')).toBe('(x + 2) + (x + 3)');
        });
    });

    describe('power to power', () => {
        let sut = ruleSut(rules.RuleID.PowerToPower);

        test('works in nominal case', () => {
            expect(sut('(x ^ 2) ^ 3')).toBe('x ^ (2 * 3)');
        });

        test('works in power tower case', () => {
            expect(sut('(x ^ 2) ^ 3')).toBe('x ^ (2 * 3)');
            expect(sut('((x ^ 2) ^ 3) ^ 4')).toBe('(x ^ 2) ^ (3 * 4)');
        });

        test('works with parentheses', () => {
            expect(sut('((x + 1) ^ (2 + 3)) ^ (4 + 5)')).toBe(
                '(x + 1) ^ ((2 + 3) * (4 + 5))',
            );
        });
    });
});

describe('recursive rule application', () => {
    const ruleSut = (rule: rules.RuleID): ((mathText: string) => string) => {
        return (mathText: string) => {
            let node = mathjs.parse(mathText);
            node = node.transform(rules.RULES[rule].func);
            return node.toString();
        };
    };

    describe('evaluate arithmetic', () => {
        const sut = ruleSut(rules.RuleID.Arithmetic);

        test('evaluates arithmetic inside algebraic expression', () => {
            expect(sut('(1 + 1) * x')).toEqual('2 * x');
        });
    });

    describe('evaluate product of one variable', () => {
        let sut = ruleSut(rules.RuleID.ProductOfOneVariable);

        test('only simplifies outermost application in recursive case', () => {
            expect(sut('x ^ 2 * x ^ 3 * x ^ 4')).toBe('x ^ (2 + 3) * x ^ 4');
        });
    });
});
