import * as mathjs from 'mathjs';
import * as rules from './rules';

describe('low-level rule application', () => {
  const ruleSut = (rule: rules.RuleID): ((mathText: string) => string) => {
    return (mathText: string) => {
      let node = mathjs.parse(mathText);
      node = rules.RULES[rule].func(node);
      return node.toString();
    };
  };
  describe('evaluate arithmetic', () => {
    const sut = ruleSut(rules.RuleID.Arithmetic);
    it('does not evaluate algebra', () => {
      expect(sut('x + x')).toEqual('x + x');
    });

    it('does evaluate arithmetic', () => {
      expect(sut('1 + 2')).toEqual('3');
    });

    it('does not evaluate division', () => {
      expect(sut('2 / 3')).toEqual('2 / 3');
    });

    // TODO
    xit('combines fractions of the same denominator', () => {
      expect(sut('1 / 3 + 1 / 3')).toEqual('2 / 3');
      expect(sut('1 / 3 * 2 / 3')).toEqual('2 / 9');
    });

    xit('simplifies fractions', () => {
      expect(sut('4 / 6')).toEqual('2 / 3');
      expect(sut('8 / 2')).toEqual('4');
    });

    xit('combines fractions of different denominators', () => {
      expect(sut('1 / 2 + 1 / 4')).toEqual('3 / 4');
      expect(sut('1 / 2 * 1 / 4')).toEqual('1 / 8');
    });

    xit('combines and simplifies fractions', () => {
      expect(sut('1 / 4 + 1 / 4')).toEqual('1 / 2');
      expect(sut('3 / 4 * 1 / 3')).toEqual('1 / 4');
    });
  });

  describe('evaluate product of one variable', () => {
    let sut = ruleSut(rules.RuleID.ProductOfOneVariable);
    it('works in nominal case', () => {
      expect(sut('x ^ 2 * x ^ 3')).toBe('x ^ (2 + 3)');
    });

    it('returns given text when rule cannot be applied', () => {
      expect(sut('1 + 4')).toBe('1 + 4');
    });

    it('does not mistakenly evaluate addition', () => {
      expect(sut('(x + 2) + (x + 3)')).toBe('(x + 2) + (x + 3)');
    });
  });

  describe('power to power', () => {
    let sut = ruleSut(rules.RuleID.PowerToPower);

    it('works in nominal case', () => {
      expect(sut('(x ^ 2) ^ 3')).toBe('x ^ (2 * 3)');
    });

    it('works in power tower case', () => {
      expect(sut('(x ^ 2) ^ 3')).toBe('x ^ (2 * 3)');
      expect(sut('((x ^ 2) ^ 3) ^ 4')).toBe('(x ^ 2) ^ (3 * 4)');
    });

    it('works with parentheses', () => {
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

    it('evaluates arithmetic inside algebraic expression', () => {
      expect(sut('(1 + 1) * x')).toEqual('2 * x');
    });
  });

  describe('evaluate product of one variable', () => {
    let sut = ruleSut(rules.RuleID.ProductOfOneVariable);

    it('only simplifies outermost application in recursive case', () => {
      expect(sut('x ^ 2 * x ^ 3 * x ^ 4')).toBe('x ^ (2 + 3) * x ^ 4');
    });
  });
});
