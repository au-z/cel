var cel = (function(id, options) {
  let el = document.getElementById(id);
  if(!el) throw new Error('Yo, your element isn\'t in the DOM!');
  let canvas = document.createElement('canvas');
  canvas.setAttribute('width', options.stage.width);
  canvas.setAttribute('height', options.stage.height);
  el.appendChild(canvas);

  const typeAssets = {};
  const keyframes = {};

  Object.keys(options.type).forEach((k) => { 
    typeAssets[k] = new TypeCel(
      options.type[k],
      options.typeOptions,
      options.keyframes[k],
      options.scale
    );
    console.log(typeAssets[k]);
    keyframes[k] = new Keyframe(
      options.type[k].css,
      options.keyframes[k],
      options.scale
    );
  });

  if(options.debug) Object.keys(keyframes).forEach((k) => {
    typeAssets[k].el.style.outline = '1px solid ' + keyframes[k].color;
  });
  Object.keys(typeAssets).forEach((a) => el.appendChild(typeAssets[a].el));
 
  animate();
  renderCanvas(keyframes);

  function renderCanvas(keyframes) {
    let ctx = canvas.getContext('2d');
    Object.keys(keyframes).map((k) => {
      strokeOrigin(keyframes[k].origin, keyframes[k].color);
      strokePath(keyframes[k].origin, keyframes[k].bezierPaths, keyframes[k].color);
    });

    function strokeOrigin(o, color) {
      ctx.beginPath();
      ctx.arc(o.x, o.y, 6, 0, 2 * Math.PI, true);
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.moveTo(o.x, o.y);
    }

    function strokePath(o, bezierPaths, color) {
      bezierPaths.forEach((p) => {
        ctx.bezierCurveTo(o.x + p[0], o.y + p[1], o.x + p[2], o.y + p[3], o.x + p[4], o.y + p[5]);
        ctx.arc(o.x + p[4], o.y + p[5], 3, 0, 2 * Math.PI, true);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.moveTo(o.x + p[4], o.y + p[5]);
      });
    }
  }

  function animate() {
    Object.keys(typeAssets).forEach((a) => {
      typeAssets[a].el.animate(typeAssets[a].keyframes || {}, options.timing[a]);
    });
  }

  return {
    animate,
  };

})('cel', {
  scale: 1.3,
  debug: true,
  stage: {
    width: '300px',
    height: '300px',
  },
  typeOptions: {
    css: {
      display: 'inline-block',
      position: 'absolute',
      fontSize: '3em',
      color: '#ddd',
    },
  },
  type: {
    A: {
      text: 'A',
      css: {
        left: '50px',
        top: '50px',
      }},
    U: {
      text: 'U',
      css: {
        left: '73px',
        top: '86px',
      }},
    Z: {
      text: 'Z',
      css: {
        left: '102.5px',
        top: '55px',
        transform: 'rotate(90deg)',
      }},
    M: {
      text: 'M',
      css: {
        left: '165px',
        top: '150px',
        transform: 'rotate(270deg)',
      },
      after: {
        content: '',
        width: '100%',
        height: '100%', 
      },
    },
  },
  keyframes: {
    A: [
      {transform: 'translate3d(0, 0, 0)'},
      {transform: 'translate3d(0, 0, 0)'},
    ],
    U: [
      {transform: 'translate3d(0, 0, 0)'},
      {transform: 'translate3d(9px, -36px, 0)'},
    ],
    Z: [
      {transform: 'rotate(90deg)'},
      {transform: 'translate3d(13px, -5px, 0)'},
    ],
    M: [
      {transform: 'rotate(270deg)'},
      {transform: 'translate3d(20px, -100px, 0)'},
    ],
  },
  timing: {
    A: {duration: 1200, fill: 'forwards', iterations: Infinity, easing: 'ease'},
    U: {duration: 1200, fill: 'forwards', iterations: Infinity, easing: 'ease'},
    Z: {duration: 1200, fill: 'forwards', iterations: Infinity, easing: 'ease'},
    M: {duration: 1200, fill: 'forwards', iterations: Infinity, easing: 'cubic-bezier(0.42, 0, 0.58, 1)'},
  },
});
