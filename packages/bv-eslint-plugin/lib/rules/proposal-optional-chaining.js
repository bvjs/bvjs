/**
 * @fileoverview proposal-optional-chaining
 * @author 雨后黄昏 <shihuajunze@163.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "proposal-optional-chaining",
      category: "Fill me in",
      recommended: false
    },
    fixable: 'code',  // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },
  create: function (context) {
    const sourceCode = context.getSourceCode();

    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    // console.log(sourceCode)
    // console.log('-----')
    const checkLastSegment = node => {
      console.log(node.body)
      console.log('-----')
      context.report({
        node: node,
        message: "Unexpected identifier",
        fix: function(fixer) {
          return fixer.insertTextAfter(node, ";");
        }
      })
    }
    return {
      // "ClassDeclaration": checkLastSegment,
      // "FunctionExpression:exit": checkLastSegment,
      // "ArrowFunctionExpression:exit": checkLastSegment,
      "Program": checkLastSegment,
    };
  }
};
