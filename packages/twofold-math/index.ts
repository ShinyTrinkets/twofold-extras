import { evaluate } from 'mathjs';

export function calc(s, args, meta) {
  /**
   * Evaluate expression using Math.js
   * https://mathjs.org/
   */
  if (!(s || args.expr)) return;
  return evaluate(s || args.expr);
}
