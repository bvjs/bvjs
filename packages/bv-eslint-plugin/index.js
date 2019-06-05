/**
 * @fileoverview eslint-plugin-bv
 * @author 雨后黄昏 <shihuajunze@163.com>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
const rules = requireIndex(__dirname + "/lib/rules");
module.exports.rules = requireIndex(__dirname + "/lib/rules");
