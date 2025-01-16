import { formulaParser } from "./dist/formulaParser";
import { formulaVisitor } from "./dist/formulaVisitor";
import { Decimal } from "decimal.js";

export class EvalVisitor {
  constructor(options) {
    // super();
    options = options || {};

    this.helper = options.helper;
  }

  // 访问数字
  visitNumber(ctx) {
    const n = ctx.NUM().getText();
    return n && Number(n);
  }

  // 访问字段
  visitField(ctx) {
    let field = ctx.FIELD().getText();
    if (field && field.length > 2) {
      // 去除首尾标识符
      field = field.substring(1, field.length - 1);
    }

    // 通过接口获取字段 value
    return this.helper.getFieldValue(field);
  }

  // 访问括号优先级
  visitParents(ctx) {
    return this.visit(ctx.expr());
  }

  // 访问运算符-乘除
  visitMulDiv(ctx) {
    const left = this.visit(ctx.expr(0));
    const right = this.visit(ctx.expr(1));
    const type = ctx.op.type;

    return computedOperator(left, right, type);
  }

  // 访问运算符-加减
  visitAddSub(ctx) {
    const left = this.visit(ctx.expr(0));
    const right = this.visit(ctx.expr(1));
    const type = ctx.op.type;

    return computedOperator(left, right, type);
  }

  // 访问函数
  visitFuncCall(ctx) {
    let args = ctx.args();

    if (args) {
      // 有函数参数就先计算参数
      args = this.visit(args);
      // 过滤 , 分隔符
      args = Array.isArray(args) ? args.filter(v => v !== undefined) : [];
    } else {
      args = [];
    }

    const functionName = ctx.FUNCNAME().getText();
    return this.helper.getFuncImpl(functionName, args);
  }

  // 访问根节点
  visitProg(ctx) {
    const root = super.visitProg(ctx);
    return this.helper.getRootNode(root);
  }
}

/**
 * 计算运算符
 * @param {number | null} left 运算符左侧
 * @param {number | null} right 运算符右侧
 * @param {string} type 运算符类型
 */
function computedOperator(left, right, type) {
  if (!isNumber(left) || !isNumber(right)) {
    return null;
  }

  switch (type) {
    case formulaParser.ADD:
      return Decimal.add(left, right).toString();
    case formulaParser.SUB:
      return Decimal.sub(left, right).toString();
    case formulaParser.MUL:
      return Decimal.mul(left, right).toString();
    case formulaParser.DIV:
      return Decimal.div(left, right).toString();
    default:
      break;
  }

  return null;
}