import antlr4 from 'antlr4';
import { FormulaLexer } from './dist/FormulaLexer';
import { FormulaParser } from './dist/FormulaParser';
import { EvalVisitor } from './Visitor';
import { FormulaHelper } from './FormulaHelper';

export class FormulaController {
  constructor({ formula, values }) {
    this.formula = formula; // 公式

    // 生成 ast
    this._preParseFormula();
    // 实现 vistor 对外接口调用
    this.formulaHelper = new FormulaHelper({ values });
  }

  // 预解析公式
  _preParseFormula() {
    const chars = new antlr4.InputStream(this.formula);
    const lexer = new formulaLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new formulaParser(tokens);
    parser.buildParseTrees = true;

    // 全局
    this.formulaTree = parser.prog();
  }

  // 更新公式
  updateFormula(formula) {
    this.formula = formula;

    // 重新生成 ast
    this._preParseFormula();
  }

  // 计算公式
  compute(config) {
    if (this.formulaTree) {
      // 更新运行时配置
      this.formulaHelper.setFormulaConfig(config);
      // 计算
      const vistor = new EvalVisitor({ helper: this.formulaHelper });
      try {
        return vistor.visit(this.formulaTree);
      } catch (error) {
        console.log("[FormulaController] compute error, ", error);
      }
    }
    return null;
  }
}