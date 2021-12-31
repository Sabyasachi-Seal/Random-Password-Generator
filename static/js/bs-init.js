document.addEventListener('DOMContentLoaded', function() {

(function(){

	if (!('requestAnimationFrame' in window)) return;
	if (/Mobile|Android/.test(navigator.userAgent)) return;

	var backgrounds = [];
	var parallaxBackgrounds = document.querySelectorAll('[data-bss-parallax-bg]');

	for (var el of parallaxBackgrounds) {
		var bg = document.createElement('div');

		bg.style.backgroundImage = el.style.backgroundImage;
		bg.style.backgroundSize = 'cover';
		bg.style.backgroundPosition = 'center';
		bg.style.position = 'absolute';
		bg.style.height = '200%';
		bg.style.width = '100%';
		bg.style.top = 0;
		bg.style.left = 0;
		bg.style.zIndex = -100;

		el.appendChild(bg);
		backgrounds.push(bg);

		el.style.position = 'relative';
		el.style.background = 'transparent';
		el.style.overflow = 'hidden';
	}

	if (!backgrounds.length) return;

	var visible = [];
	var scheduled;

	window.addEventListener('scroll', scroll);
	window.addEventListener('resize', scroll);

	scroll();

	function scroll() {

		visible.length = 0;

		for(var i = 0; i < backgrounds.length; i++){
			var rect = backgrounds[i].parentNode.getBoundingClientRect();

			if (rect.bottom > 0 && rect.top < window.innerHeight) {
				visible.push({
					rect: rect,
					node: backgrounds[i]
				});
			}

		}

		cancelAnimationFrame(scheduled);

		if (visible.length) {
			scheduled = requestAnimationFrame(update);
		}

	}

	function update(){

		for(var i = 0; i < visible.length; i++){
			var rect = visible[i].rect;
			var node = visible[i].node;

			var quot = Math.max(rect.bottom, 0) / (window.innerHeight + rect.height);

			node.style.transform = 'translate3d(0, '+(-50*quot)+'%, 0)';
		}

	}

})();
}, false);