const cssUtil = (function() {
  unitRegex = /  /ig;
  numRegex = /-?[\d\.]+/ig;
  argsRegex = /(-?[\d\.]+)([a-z]+|\%)?/ig;
  fnParseRegex = /translate(3d|x|y|z)?|rotate(3d|x|y|z)?|scale(3d|x|y|z)?|perspective/ig;
  scalables = ['left', 'top', 'right', 'bottom', 'margin-left', 'margin-top',
    'margin-right', 'margin-bottom', 'margin', 'width', 'height', 'fontSize', 
    'transform', 'scale', 'rotate'];

  function scaleRule(rule, value, scale) {
    console.log(rule, value);
    if(scalables.filter((r) => r === rule).length <= 0 || scale === 1) {
      // console.log('return: ', value);
      return value;
    }
    let scaledValue = '';
    let numbers = stripUnits(value);
    let units = stripNums(value);

    let scaled = numbers.map((m) => (parseInt(m) * scale).toFixed(2));
    for(var i = 0; i < scaled.length; i++) scaledValue += scaled[i] + units[i] + ' ';
    return scaledValue;
  }

  function scale(rule, ruleVal, scale = 1.0) {
    if(scalables.filter((r) => r === rule).length <= 0 || scale === 1) return ruleVal;
    let fn = fnParseRegex.exec(ruleVal);
    let clojure = ruleVal.replace(fnParseRegex, '');

    let arg;
    let args = [];
    do {
      arg = argsRegex.exec(clojure);
      arg && args.push(arg);
    } while (arg);

    args = args.map((a) => {
      return (fn && fn[0].includes('rotate')) ?
        a[1] + a[2] || '' : (a[1] * scale).toFixed(0) + (a[2] || '');
    });

    let scaledRule = (fn && args.length > 0) ?
      fn[0] + '(' + args.join(', ') + ')' : args.join(', ');
    return scaledRule;
  }

  function stripNums(str) {
    let unit;
    let units = [];
    do {
      unit = unitRegex.exec(str);
      unit && units.push(unit[0]);
    } while (unit);
    return units;
  }

  function stripUnits(str, scale = null) {
    let num;
    let nums = [];
    do {
      num = numRegex.exec(str);
      num && nums.push(parseInt(num[0]));
    } while (num);
    if(scale) {
      nums = nums.map((n) => parseInt((n * scale).toFixed(2)));
    }
    return nums;
  }

  return {
    scale: scale,
    scaleRule: scaleRule,
    stripNums: stripNums,
    stripUnits: stripUnits,
  };
})();
