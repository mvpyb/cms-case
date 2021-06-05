// module.exports = {
//   root: true,
//   parserOptions: {
//     parser: 'babel-eslint',
//     sourceType: 'module'
//   },
//   env: {
//     browser: true,
//     node: true,
//     es6: true,
//   },
//   extends: ['plugin:vue/recommended', 'eslint:recommended'],
//
//   // add your custom rules here
//   //it is base on https://github.com/vuejs/eslint-config-vue
//   rules: {
//     "vue/max-attributes-per-line": [2, {
//       "singleline": 10,
//       "multiline": {
//         "max": 1,
//         "allowFirstLine": false
//       }
//     }],
//     "vue/singleline-html-element-content-newline": "off",
//     "vue/multiline-html-element-content-newline":"off",
//     "vue/name-property-casing": ["error", "PascalCase"],
//     "vue/no-v-html": "off",
//     'accessor-pairs': 2,
//     'arrow-spacing': [2, {
//       'before': true,
//       'after': true
//     }],
//     'block-spacing': [2, 'always'],
//     'brace-style': [2, '1tbs', {
//       'allowSingleLine': true
//     }],
//     'camelcase': [0, {
//       'properties': 'always'
//     }],
//     'comma-dangle': [2, 'never'],
//     'comma-spacing': [2, {
//       'before': false,
//       'after': true
//     }],
//     'comma-style': [2, 'last'],
//     'constructor-super': 2,
//     'curly': [2, 'multi-line'],
//     'dot-location': [2, 'property'],
//     'eol-last': 2,
//     'eqeqeq': ["error", "always", {"null": "ignore"}],
//     'generator-star-spacing': [2, {
//       'before': true,
//       'after': true
//     }],
//     'handle-callback-err': [2, '^(err|error)$'],
//     'indent': [2, 2, {
//       'SwitchCase': 1
//     }],
//     'jsx-quotes': [2, 'prefer-single'],
//     'key-spacing': [2, {
//       'beforeColon': false,
//       'afterColon': true
//     }],
//     'keyword-spacing': [2, {
//       'before': true,
//       'after': true
//     }],
//     'new-cap': [2, {
//       'newIsCap': true,
//       'capIsNew': false
//     }],
//     'new-parens': 2,
//     'no-array-constructor': 2,
//     'no-caller': 2,
//     'no-console': 'off',
//     'no-class-assign': 2,
//     'no-cond-assign': 2,
//     'no-const-assign': 2,
//     'no-control-regex': 0,
//     'no-delete-var': 2,
//     'no-dupe-args': 2,
//     'no-dupe-class-members': 2,
//     'no-dupe-keys': 2,
//     'no-duplicate-case': 2,
//     'no-empty-character-class': 2,
//     'no-empty-pattern': 2,
//     'no-eval': 2,
//     'no-ex-assign': 2,
//     'no-extend-native': 2,
//     'no-extra-bind': 2,
//     'no-extra-boolean-cast': 2,
//     'no-extra-parens': [2, 'functions'],
//     'no-fallthrough': 2,
//     'no-floating-decimal': 2,
//     'no-func-assign': 2,
//     'no-implied-eval': 2,
//     'no-inner-declarations': [2, 'functions'],
//     'no-invalid-regexp': 2,
//     'no-irregular-whitespace': 2,
//     'no-iterator': 2,
//     'no-label-var': 2,
//     'no-labels': [2, {
//       'allowLoop': false,
//       'allowSwitch': false
//     }],
//     'no-lone-blocks': 2,
//     'no-mixed-spaces-and-tabs': 2,
//     'no-multi-spaces': 2,
//     'no-multi-str': 2,
//     'no-multiple-empty-lines': [2, {
//       'max': 1
//     }],
//     'no-native-reassign': 2,
//     'no-negated-in-lhs': 2,
//     'no-new-object': 2,
//     'no-new-require': 2,
//     'no-new-symbol': 2,
//     'no-new-wrappers': 2,
//     'no-obj-calls': 2,
//     'no-octal': 2,
//     'no-octal-escape': 2,
//     'no-path-concat': 2,
//     'no-proto': 2,
//     'no-redeclare': 2,
//     'no-regex-spaces': 2,
//     'no-return-assign': [2, 'except-parens'],
//     'no-self-assign': 2,
//     'no-self-compare': 2,
//     'no-sequences': 2,
//     'no-shadow-restricted-names': 2,
//     'no-spaced-func': 2,
//     'no-sparse-arrays': 2,
//     'no-this-before-super': 2,
//     'no-throw-literal': 2,
//     'no-trailing-spaces': 2,
//     'no-undef': 2,
//     'no-undef-init': 2,
//     'no-unexpected-multiline': 2,
//     'no-unmodified-loop-condition': 2,
//     'no-unneeded-ternary': [2, {
//       'defaultAssignment': false
//     }],
//     'no-unreachable': 2,
//     'no-unsafe-finally': 2,
//     'no-unused-vars': [2, {
//       'vars': 'all',
//       'args': 'none'
//     }],
//     'no-useless-call': 2,
//     'no-useless-computed-key': 2,
//     'no-useless-constructor': 2,
//     'no-useless-escape': 0,
//     'no-whitespace-before-property': 2,
//     'no-with': 2,
//     'one-var': [2, {
//       'initialized': 'never'
//     }],
//     'operator-linebreak': [2, 'after', {
//       'overrides': {
//         '?': 'before',
//         ':': 'before'
//       }
//     }],
//     'padded-blocks': [2, 'never'],
//     'quotes': [2, 'single', {
//       'avoidEscape': true,
//       'allowTemplateLiterals': true
//     }],
//     'semi': [2, 'never'],
//     'semi-spacing': [2, {
//       'before': false,
//       'after': true
//     }],
//     'space-before-blocks': [2, 'always'],
//     'space-before-function-paren': [2, 'never'],
//     'space-in-parens': [2, 'never'],
//     'space-infix-ops': 2,
//     'space-unary-ops': [2, {
//       'words': true,
//       'nonwords': false
//     }],
//     'spaced-comment': [2, 'always', {
//       'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
//     }],
//     'template-curly-spacing': [2, 'never'],
//     'use-isnan': 2,
//     'valid-typeof': 2,
//     'wrap-iife': [2, 'any'],
//     'yield-star-spacing': [2, 'both'],
//     'yoda': [2, 'never'],
//     'prefer-const': 2,
//     'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
//     'object-curly-spacing': [2, 'always', {
//       objectsInObjects: false
//     }],
//     'array-bracket-spacing': [2, 'never']
//   }
// }

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    //设置"script"（默认）或"module"如果你的代码是在ECMAScript中的模块。
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended'
  ],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  // https://www.jianshu.com/p/0c7f1764d753
  // https://cloud.tencent.com/developer/section/1135779
  rules: {
    "vue/max-attributes-per-line": [2, {
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    // v-if v-for不可作用域同一元素
    "vue/no-use-v-if-with-v-for": 1,
    // 关闭 props必须验证type
    "vue/require-prop-types": "off",
    // 关闭 props必须由default值
    "vue/require-default-prop": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline":"off",
    "vue/name-property-casing": ["error", "PascalCase"],
    "vue/no-v-html": "off",
    //在对象中使用getter/setter
    'accessor-pairs': 2,
    //规则在箭头函数的箭头（=>）之前/之后标准化间距样式
    //true意味着应该有一个或多个空格并且false意味着没有空格
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    //规则在打开的块令牌内和同一行上的下一个令牌内强制执行一致的间距。此规则还会在同一行中的关闭块标记和以前的标记内强制实施一致的间距
    //"always" （默认）需要一个或多个空格
    'block-spacing': [2, 'always'],
    //大括号风格 1tbs stroustrup allman
    'brace-style': [2, '1tbs', {
      // 默认false）允许一个块打开和关闭括号在同一行上
      'allowSingleLine': true
    }],
    //强制驼峰法命名
    'camelcase' : 'off',
    // 'camelcase': [0, {
    //   //always（默认）为属性名称强制执行  never 不检查属性名称
    //   'properties': 'never'
    // }],
    //对象字面量项尾不能有逗号 （never 默认）不允许尾随逗号  "always" 需要尾随逗号
    'comma-dangle': [2, 'never'],
    //逗号前后的空格
    'comma-spacing': [2, {
      'before': false, // 默认 false 在逗号前不允许有空格
      'after': true    // 默认 true 在逗号后需要一个或多个空格
    }],
    //逗号风格，换行时在行首还是行尾
    // last 默认）与数组元素，对象属性或变量声明在同一行之后和同一行需要逗号
    'comma-style': [2, 'last'],
    //非派生类不能调用super，派生类必须调用super
    'constructor-super': 2,
    //必须使用 if(){} 中的{} multi-line 以允许支柱少单行if，else if，else，for，while，或do，同时还规定使用其他实例花括号
    'curly': [2, 'multi-line'],
    //对象访问符的位置，换行的时候在行首还是行尾
    // 成员表达式中的点应该与对象部分位于同一行。默认是"object"  property"，成员表达式中的点应与属性部分位于同一
    'dot-location': [2, 'property'],
    //switch语句最后必须有default
    "default-case": 2,
    //文件以单一的换行符结束
    'eol-last': 2,
    // 比较用 ===或 !==
    //always （默认） - 始终使用===或！==。
    //自定义此规则如何处理null文字 ignore- 不要将此规则应用于null
    // 'eqeqeq': ["error", "always", {"null": "ignore"}],
    'eqeqeq': [0, "always", {"null": "ignore"}],
    //生成器函数*的前后空格
    'generator-star-spacing': [2, {
      'before': true,
      'after': true
    }],
    //nodejs 处理错误
    'handle-callback-err': [2, '^(err|error)$'],
    'indent': [2, 2, {
      //"SwitchCase"（默认：0）强制缩进级别case的条款switch声明
      'SwitchCase': 1
    }],
    'jsx-quotes': [2, 'prefer-single'],
    //对象字面量中冒号的前后空
    'key-spacing': [2, {
      'beforeColon': true,//（默认值false）不允许在对象文字中的键和冒号之间使用空格
      'afterColon': true //（默认true）需要在冒号和对象文字中的值之间至少有一个空格
    }],
    'keyword-spacing': [2, {
      'before': true, // "before": true （默认）在关键字之前至少需要一个空格
      'after': true  // "after": true （默认）在关键字后至少需要一个空格
    }],
    //函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
    'new-cap': [2, {
      'newIsCap': true, //true（默认）要求new使用大写启动函数调用所有操作符。
      'capIsNew': false //true（默认）要求所有大写启动的函数与new操作符一起调用。
    }],
    //new时必须加小括号
    'new-parens': 2,
    //禁止使用数组构造器
    'no-array-constructor': 2,
    //禁止使用arguments.caller或arguments.callee
    'no-caller': 2,
    // 关闭禁止使用console
    'no-console': 'off',
    //禁止给类赋值
    'no-class-assign': 2,
    //禁止在条件表达式中使用赋值语句
    'no-cond-assign': 2,
    //禁止修改const声明的变量
    'no-const-assign': 2,
    // 关闭禁止在正则表达式中使用控制字符
    'no-control-regex': 0,
    // 不能对var声明的变量使用delete操作符
    'no-delete-var': 2,
    //函数参数不能重复
    'no-dupe-args': 2,
    // 果在类成员中有相同名称的声明，则最后的声明会无声地覆盖其他声明。它可能会导致意外的行为。 此规则旨在标记在级别成员中使用重复名称
    'no-dupe-class-members': 2,
    //在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-keys': 2,
    //switch中的case标签不能重复
    'no-duplicate-case': 2,
    // 关闭块语句中的内容不能为空
    "no-empty": 0,
    // 正则表达式中的[]内容不能为空
    'no-empty-character-class': 2,
    'no-empty-pattern': 0,
    //禁止使用eval
    'no-eval': 2,
    // 禁止给catch语句中的异常参数赋值
    'no-ex-assign': 2,
    //禁止扩展native对象
    'no-extend-native': 2,
    //禁止不必要的函数绑定
    'no-extra-bind': 2,
    //禁止不必要的bool转换
    'no-extra-boolean-cast': 2,
    //禁止非必要的括号
    'no-extra-parens': [2, 'functions'],
    //禁止switch穿透
    'no-fallthrough': 2,
    //禁止省略浮点数中的0 .5 3.
    'no-floating-decimal': 2,
    // 禁止重复的函数声明
    'no-func-assign': 2,
    //禁止使用隐式eval
    'no-implied-eval': 2,
    //禁止在块语句中使用声明（变量或函数）
    'no-inner-declarations': [2, 'functions'],
    //禁止无效的正则表达式
    'no-invalid-regexp': 2,
    //不能有不规则的空格
    'no-irregular-whitespace': 2,
    //禁止使用__iterator__ 属性
    'no-iterator': 2,
    //label名不能与var声明的变量名相同
    'no-label-var': 2,
    //禁止标签声明 TODO
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    //禁止不必要的嵌套块
    'no-lone-blocks': 2,
    // 0 关闭禁止混用tab和空格
    'no-mixed-spaces-and-tabs': 2,
    //不能用多余的空格
    'no-multi-spaces': 2,
    //字符串不能用\换行
    'no-multi-str': 2,
    //空行最多不能超过1行
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    //不能重写native对象
    'no-native-reassign': 2,
    //in 操作符的左边不能有!
    'no-negated-in-lhs': 2,
    //禁止使用new Object()
    'no-new-object': 2,
    //禁止使用new require
    'no-new-require': 2,
    'no-new-symbol': 2,
    //禁止使用new创建包装实例，new String new Boolean new Number
    'no-new-wrappers': 2,
    //不能调用内置的全局对象，比如Math() JSON()
    'no-obj-calls': 2,
    //禁止使用八进制数字
    'no-octal': 2,
    //禁止使用八进制转义序列
    'no-octal-escape': 2,
    //node中不能使用__dirname或__filename做路径拼接
    'no-path-concat': 2,
    //禁止使用__proto__属性
    'no-proto': 2,
    //禁止重复声明变量
    'no-redeclare': 2,
    //禁止在正则表达式字面量中使用多个空格 /foo bar/
    'no-regex-spaces': 2,
    //return 语句中不能有赋值表达式 except-parens （默认）除非用圆括号括起来，否则不允许赋值 always：禁止所有分配
    'no-return-assign': [2, 'except-parens'],
    //自我分配没有效果，因此可能会由于重构不完全而导致错误 这条规则旨在消除自我分配 error => foo = foo
    'no-self-assign': 2,
    //不能比较自身
    'no-self-compare': 2,
    //禁止使用逗号运算符
    'no-sequences': 2,
    //外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    // "no-shadow": 2,
    //严格模式中规定的限制标识符不能作为声明时的变量名使用
    'no-shadow-restricted-names': 2,
    //函数调用时 函数名与()之间不能有空格
    'no-spaced-func': 2,
    //禁止稀疏数组， [1,,2]
    'no-sparse-arrays': 2,
    //在调用super()之前不能使用this或super
    'no-this-before-super': 2,
    //禁止抛出字面量错误 throw "error";
    'no-throw-literal': 0,
    //一行结束后面不要有空格
    'no-trailing-spaces': 2,
    //不能有未定义的变量
    'no-undef': 2,
    // 关闭变量初始化时不能直接给它赋值为undefined todo
    'no-undef-init': 0,
    //避免多行表达式
    'no-unexpected-multiline': 2,
    // 该规则查找循环条件内的引用，然后检查这些引用的变量是否在循环中被修改。
    'no-unmodified-loop-condition': 0,
    //禁止不必要的嵌套 var isYes = answer === 1 ? true : fa defaultAssignment true 默认 允许条件表达式作为默认分配模式
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    //不能有无法执行的代码
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    //不能有声明后未被使用的变量或参数
    'no-unused-vars': [2, {
      // local 只检查使用本地声明的变量，但将允许全局变量未被使用
      // all   检查所有变量的使用情况，包括全局范围内的变量。这是默认设
      'vars': 'all',
      // 参数不检查
      'args': 'none'
    }],
    //禁用var，用let和const代替
    "no-var": 0,
    //禁用void操作符
    "no-void": 2,
    //禁止不必要的call和apply
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    //禁用with
    'no-with': 2,
    //连续声明
    'one-var': [2, {
      //"never" 每个作用域要求多个变量声明用于初始化变量
      'initialized': 'never'
    }],
    //换行时运算符在行尾还是行首
    'operator-linebreak': [2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    //块语句内行首行尾是否要空行  never 在block语句和类的开头和结尾处不允许出现空行
    'padded-blocks': [2, 'never'],
    //引号类型 `` "" ''  single 尽可能要求使用单引号
    'quotes': [2, 'single', {
      //"avoidEscape": true 允许字符串使用单引号或双引号，只要字符串包含必须以其他方式转义的引号
      'avoidEscape': true,
      //允许字符串使用反引号
      'allowTemplateLiterals': true
    }],
    //语句强制分号结尾 "never"不允许分号语句的末尾（除非消除歧义开头语句[，(，/，+，或-）
    'semi': [2, 'never'],
    //允许你在分号之前或之后放置不必要的空格 分号前没有空格 分号后有空格 == var foo; var bar;
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    //不以新行开始的块{前面要不要有空格 如果是的"always"话，块必须至少有一个先前的空间
    'space-before-blocks': [2, 'always'],
    //函数定义时括号前面要不要有空格 never在(参数后面不允许任何空格
    'space-before-function-paren': [2, 'never'],
    //小括号里面要不要有空格 "never" （默认）在圆括号内强制使用零空格  always 使用空格
    'space-in-parens': [2, 'always'],
    //中缀操作符周围要不要有空格
    'space-infix-ops': 2,
    //一元运算符的前/后要不要加空格
    // words-适用于一元字运营商，如：new，delete，typeof，void，yield
    // nonwords-适用于一元运算符，如：-，+，--，++，!，!!
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    //注释风格要不要有空格什么的
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'],
    //禁止比较时使用NaN，只能用isNaN()
    'use-isnan': 2,
    //必须使用合法的typeof的值
    'valid-typeof': 2,
    //立即执行函数表达式的小括号风格 "any" 强制总是包装，但允许任何一种风格
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    //禁止尤达条件（if ("red" === color) ）
    // "never"，那么比较绝不能是 Yoda 条件
    'yoda': [2, 'never'],
    //首选const 如果一个变量从不重新分配，使用const声明更好
    'prefer-const': 2,
    // 线上禁止使用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //大括号内是否允许不必要的空格
    //"never" （默认）不允许大括号内的空格   "always"需要大括号内的空格（{}除外）
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    //是否允许非空数组里面有多余的空格
    'array-bracket-spacing': [2, 'never']
  }
}
