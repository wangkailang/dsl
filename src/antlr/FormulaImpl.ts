import { formatNumber } from "./util";


const funcSum = (...args: string[]) => {
  return args.reduce((prev, curr) => {
    return prev + formatNumber(curr);
  }, 0);
}

export const FunctionImpl = {
  SUM: funcSum,
}