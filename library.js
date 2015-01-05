(function(module) {
	"use strict";

	var ComboEmbed = {},
		embedYoutube = '<div class="js-lazyYT" data-youtube-id="$1" data-width="640" data-height="360"><iframe class="lazytube" src="//www.youtube.com/embed/$1"></iframe></div>',
        embedTwitter = '<span data-url="https://twitter.com/$2/statuses/$3"></span><script type="text/javascript" src="//api.twitter.com/1/statuses/oembed.json?id=$3&callback=twitterEmbed"></script>';


	    var	regularUrlYoutube = /<a href="(?:https?:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)(.+)">.+<\/a>/g;
        var	shortUrlYoutube = /<a href="(?:https?:\/\/)?(?:www\.)?(?:youtu\.be)\/(.+)">.+<\/a>/g;
        var	embedUrlYoutube = /<a href="(?:https?:\/\/)?(?:www\.)youtube.com\/embed\/([\w\-_]+)">.+<\/a>/;

        var regularUrlTwitter = /<a href="(http|https):\/\/twitter.com\/([^\/"\s]*)\/status\/([^\/"\s]*)(\/photo\/1|)">.+?<\/a>/g
        var postContentTwitter = data && data.postData && data.postData.content;


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
        if (postContent && postContent.match(regularUrlTwitter)) {
            data.postData.content = postContent.replace(regularUrlTwitter, embedTwitter);
        }
        callback(null, data);

    };

	module.exports = ComboEmbed;
}(module));