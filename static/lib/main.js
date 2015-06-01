(function () {
	"use strict";

	/* Carga de vídeos de Youtube */
	$(window).on('action:widgets.loaded', function () {
		$('.js-lazyYT').lazyYT();
	});

	$(window).on('action:posts.loaded', function () {
		$('.js-lazyYT').delay(500).lazyYT();
	});

	/* Carga de Tweets
	window.twitterEmbed = function(data) {

		$('[data-url="' + data["url"] + '"]').each(function () {
			$(this).attr("data-url", "");
			$(this).html(data["html"]);
			$(this).css('visibility', 'hidden');
		});
		
		twttr.widgets.load();
	};
	*/

	/* Auto ajustar a tamano de pantalla */
	function resizeEmbed()
	{ 
		if(window.innerWidth < 650)
		{
			$('.embedElement').width('100%');
		}
	}
	resizeEmbed();
	window.addEventListener('resize', resizeEmbed);
	
})();
