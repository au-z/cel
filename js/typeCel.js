var TypeCel = (function(typeSpec, typeOptions, keyframes, scale = null) {
		typeOptions = typeOptions || {};
    scale = scale || 1;

    let el = document.createElement('div');
    el.setAttribute('id', 'type_' + typeSpec.text);
    el.innerHTML = typeSpec.text;
		Object.keys(typeOptions.css).forEach((r) => {
			el.style[r] = cssUtil.scale(r, typeOptions.css[r], scale);
		});
    Object.keys(typeSpec.css).forEach((r) => {
			el.style[r] = cssUtil.scale(r, typeSpec.css[r], scale);
		});

		keyframes = keyframes.map((kf) => {
			for(let rule in kf) {
				kf[rule] = cssUtil.scale(rule, kf[rule], scale);
			}
			return kf;
		});

    return {
			el,
			keyframes,
		};
});
