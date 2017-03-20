var Keyframe = (function(typeCss, keyframes, scale = null) {
  let origin = {
    x: cssUtil.stripUnits(typeCss.left, scale)[0],
    y: cssUtil.stripUnits(typeCss.top, scale)[0],
  };
  let bezierPaths;

  keyframes.forEach((k) => {
    bezierPaths = Object.keys(k).map((rule) => {
      switch (rule) {
        case 'transform':
          // cssUtil.scale(k[rule]);
          return parseTransform(k[rule]);
      }
    });
    // console.log('paths: ', bezierPaths);
  });

  function parseTransform(transform) {
    transform = transform.toLowerCase();
    let args;
    if(transform.indexOf('translate3d') !== -1) {
      args = cssUtil.stripUnits(transform.replace('translate3d', ''), scale);
      return [0, 0, args[0], args[1], args[0], args[1]];
    }
  }

  function randomColor() {
    return 'hsl(' + (Math.random() * (359) + 1).toFixed(0) + ',' + 100 + '%,' + 70 + '%)';
  }

  return {
    color: randomColor(),
    origin: origin,
    bezierPaths: bezierPaths,
  };
});
