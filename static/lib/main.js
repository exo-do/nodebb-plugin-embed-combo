"use strict";

    $(window).on('action:widgets.loaded', function() {
        $('.js-lazyYT').lazyYT();
    });


    $(window).on('action:posts.loaded', function(){
        $('.js-lazyYT').delay(500).lazyYT();
    });

   function twitterEmbed(data){

	$('[data-url="' + data["url"] + '"]').each(function(){
		$(this).attr("data-url", "");
		$(this).html(data["html"]);
		$(this).css('visibility', 'hidden');
	})
	twttr.widgets.load();
	
}