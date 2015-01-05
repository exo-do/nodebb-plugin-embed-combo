(function(module) {
	"use strict";

	var ComboEmbed = {},
		embedYoutube = '<div class="js-lazyYT" data-youtube-id="$1" data-width="640" data-height="360"><iframe class="lazytube" src="//www.youtube.com/embed/$1"></iframe></div>',
       
        embedTwitter = '<span data-url="https://twitter.com/$2/statuses/$3"></span><script type="text/javascript" src="//api.twitter.com/1/statuses/oembed.json?id=$3&callback=twitterEmbed"></script>',

        embedVine = '<iframe class="vine-embed" src="https://vine.co/v/$1/embed/postcard?related=0" width="480" height="480" frameborder="0"></iframe><script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>',

        embedVimeo = '<iframe class="vimeo-embed" src="//player.vimeo.com/video/$1" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

	    var	regularUrlYoutube = /<a href="(?:https?:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)(.+)">.+<\/a>/g;
        var	shortUrlYoutube = /<a href="(?:https?:\/\/)?(?:www\.)?(?:youtu\.be)\/(.+)">.+<\/a>/g;
        var	embedUrlYoutube = /<a href="(?:https?:\/\/)?(?:www\.)youtube.com\/embed\/([\w\-_]+)">.+<\/a>/;


        var regularUrlTwitter = /<a href="(http|https):\/\/twitter.com\/([^\/"\s]*)\/status\/([^\/"\s]*)(\/photo\/1|)">.+?<\/a>/g

        var regularUrlVine = /<a href="(?:https?:\/\/)?(?:vine\.co)\/v\/?(.+)">.+<\/a>/g;

        var regularUrlVimeo = /<a href="(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)">.+<\/a>/g;


    ComboEmbed.parse = function(data, callback) {
        if (!data || !data.postData || !data.postData.content) {
            return callback(null, data);
        }

        //Youtube
        if (data.postData.content.match(embedUrlYoutube)) {
            data.postData.content = data.postData.content.replace(embedUrlYoutube, embedYoutube);
        }
        if (data.postData.content.match(regularUrlYoutube)) {
            data.postData.content = data.postData.content.replace(regularUrlYoutube, embedYoutube);
        }
        if (data.postData.content.match(shortUrlYoutube)) {
            data.postData.content = data.postData.content.replace(shortUrlYoutube, embedYoutube);
        }

        //Twitter
        if (data.postData.content.match(regularUrlTwitter)) {
            data.postData.content = data.postData.content.replace(regularUrlTwitter, embedTwitter);
        }

        //Vine
        if (data.postData.content.match(regularUrlVine)) {
            data.postData.content = data.postData.content.replace(regularUrlVine, embedVine);
        }

        //Vimeo
        if (data.postData.content.match(regularUrlVimeo)) {
            data.postData.content = data.postData.content.replace(regularUrlVimeo, embedVimeo);
        }

        callback(null, data);

    };


    ComboEmbed.init = {
        global: {
            addNavigation: function(custom_header, callback) {
                        custom_header.navigation.push({
                        class: 'hidden',
                        route: "",
                        text: '<script language="javascript" src="//platform.twitter.com/widgets.js"></script>'
                    });

                callback(null, custom_header);
            }
        }
    },

	module.exports = ComboEmbed;
}(module));