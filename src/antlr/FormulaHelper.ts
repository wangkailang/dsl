import { FunctionImpl } from "./FormulaImpl";
import { EvalVisitor } from "./EvalVisitor";

export class FormulaHelper {
  constructor({ values }) {
    this.mValues = values || {};
    this.runConfigCache = {};
  }

  /**
   * 设置计算运行时部分参数
   * @param {object} config
   */
  setFormulaConfig(config) {
    this.runConfigCache = config || {};
  }

  /**
   * 运行后，清除运行时参数
   */
  clearFormulaConfig() {
    this.runConfigCache = {};
  }

  /**
   * 获取指定字段值
   * @param {string} field 访问的字段
   */
  getFieldValue(_field) {
    return this.mValues[_field];
  }

  /**
   * 获取公式中函数实现
   * @param {string} name
   * @param {array} args
   */
  getFuncImpl(name, args) {
    const func = FunctionImpl[name];

    if (func) {
      args = args || [];
      try {
        return func(...args);
      } catch (error) {
        console.log(
          "[formula] func run error, name: ",
          name,
          ", args: ",
          args,
          ", error: \n",
          error
        );
      }
    }
    return null;
  }

  /**
   * 访问根节点并按需格式化
   * @param {Array} result
   */
  getRootNode(result) {
    if (result && result[0] !== undefined) {
      result = result[0];
    } else {
      result = null;
    }

    // 防止设置与之不符的错误类型
    // result = this._checkResultType(result);

    // 重置运行状态
    this.clearFormulaConfig();

    return result;
  }
}