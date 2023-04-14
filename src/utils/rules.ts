import * as mathjs from 'mathjs';

import { MathNode, evaluate } from './mathwm';

export enum RuleID {
    None,
    Arithmetic,
    ProductOfOneVariable,
    PowerToPower,
}

export interface Rule {
    func: (n: MathNode) => MathNode;
    name: string;
    latex?: string;
}

export const RULES: Record<RuleID, Rule> = {
    [RuleID.None]: {
        func: (n) => n,
        name: 'Initial expression',
    },
    [RuleID.Arithmetic]: {
        func: evaluateArithmetic,
        name: 'Arithmetic',
    },
    [RuleID.ProductOfOneVariable]: {
        func: productOfOneVariable,
        name: 'Product of one Variable',
        latex: 'a^b\\cdot a^c=a^{b+c}',
    },
    [RuleID.PowerToPower]: {
        func: powerToPower,
        name: 'Power to power',
        latex: '(a^b)^c=a^{bc}',
    },
};

/**
 * Evaluates non-division arithmetic inside an algebraic expression. Does not do any
 * algebraic evaluation.
 * @param node the expression to evaluate
 * @return the arithmetically evaluated expression
 */
export function evaluateArithmetic(node: MathNode): MathNode {
    // if can be arithmetically evaluated
    // and none of its children are division nodes
    let arithmeticEvaluation = evaluate(node, true);
    let noDivision = node.toString().indexOf('/') === -1;
    if (noDivision) {
        return arithmeticEvaluation;
    } else {
        return node;
    }
}

/**
 * Transforms a product of two exponentiations into a base to the power of a sum
 * (a ^ b) ^ c -> a ^ (b + c)
 * If `node` is not a product of two exponentiations, does nothing
 * @param node the expression to evaluate
 * @return if `node` is product of two exponentiations, returns transformed
 * expression, else returns `node`.
 */
function productOfOneVariable(node: MathNode): MathNode {
    const myNode = node as mathjs.OperatorNode;
    const leftChild = myNode.args?.[0] as mathjs.OperatorNode;
    const rightChild = myNode.args?.[1] as mathjs.OperatorNode;

    // If this is not a product of two exponentiations, do nothing
    if (myNode.op !== '*' || leftChild?.op !== '^' || rightChild?.op !== '^')
        return myNode;

    let leftVariable = (leftChild.args[0] as mathjs.SymbolNode).name;
    let rightVariable = (rightChild.args[0] as mathjs.SymbolNode).name;
    // If both variables are defined and equal
    if (leftVariable !== undefined && leftVariable === rightVariable) {
        let leftExponent: number = (leftChild.args[1] as mathjs.ConstantNode)
            .value;
        let rightExponent: number = (rightChild.args[1] as mathjs.ConstantNode)
            .value;
        let nodeStr = `${leftVariable} ^ (${leftExponent} + ${rightExponent})`;
        return mathjs.parse(nodeStr);
    }

    return myNode;
}

/**
 * Transforms a power tower with two powers to a base to the power of a product
 * (a ^ b) ^ c -> a ^ (b * c)
 * If `node` is not a power tower, does nothing
 * @param node [bracketed] node in `(A^B)[^]C`, ideally
 * @return if `node` is a power tower with two powers, returns transformed
 * expression, else returns `node`.
 */
function powerToPower(node: MathNode): MathNode {
    const myNode = node as mathjs.OperatorNode;
    const leftChild = myNode.args?.[0] as mathjs.ParenthesisNode;
    const leftContent = leftChild?.content as mathjs.OperatorNode;

    if (myNode.op !== '^' || leftContent?.op !== '^') return node;

    let base: string = `${leftContent.args[0].toString()}`;
    let lowerPower: string = `${leftContent.args[1].toString()}`;
    let upperPower: string = `${myNode.args[1]}`;
    let newMathText = `${base} ^ (${lowerPower} * ${upperPower})`;
    return mathjs.parse(newMathText);
}
