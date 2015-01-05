(function(module) {
	"use strict";

	var ComboEmbed = {},
        
        //Codigo que se inserta
        //Youtube
		embedYoutube = '<div class="js-lazyYT" data-youtube-id="$1" data-width="640" data-height="360"><iframe class="lazytube" src="//www.youtube.com/embed/$1"></iframe></div>',
        //Twitter
        embedTwitter = '<span data-url="https://twitter.com/$2/statuses/$3"></span><script type="text/javascript" src="//api.twitter.com/1/statuses/oembed.json?id=$3&callback=twitterEmbed"></script>',
        //Vine
        embedVine = '<iframe class="vine-embed" src="https://vine.co/v/$1/embed/postcard?related=0" width="480" height="480" frameborder="0"></iframe><script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>',
        //Vimeo
        embedVimeo = '<iframe class="vimeo-embed" src="//player.vimeo.com/video/$1" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        //SoundCloud
        embedSouncloudTrack = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/$1/$2&amp;show_artwork=true"></iframe>',
        embedSouncloudSet = '<iframe width="100%" height="410" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/$1/sets/$2&amp;show_artwork=true"></iframe>',
        //Spotify
        embedSpotifyTrack = '<iframe src="https://embed.spotify.com/?uri=spotify:$1:$2" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>',
        embedSpotifyUser = '<iframe src="https://embed.spotify.com/?uri=spotify:user:$1:playlist:$2" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>';


        //Lo que se busca
        //Youtube
	    var	regularUrlYoutube = /<a href="(?:https?:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)(.+)">.+<\/a>/g;
        var	shortUrlYoutube = /<a href="(?:https?:\/\/)?(?:www\.)?(?:youtu\.be)\/(.+)">.+<\/a>/g;
        var	embedUrlYoutube = /<a href="(?:https?:\/\/)?(?:www\.)youtube.com\/embed\/([\w\-_]+)">.+<\/a>/;

        //Twitter
        var regularUrlTwitter = /<a href="(http|https):\/\/twitter.com\/([^\/"\s]*)\/status\/([^\/"\s]*)(\/photo\/1|)">.+?<\/a>/g

        //Vine
        var regularUrlVine = /<a href="(?:https?:\/\/)?(?:vine\.co)\/v\/?(.+)">.+<\/a>/g;

        //Vimeo
        var regularUrlVimeo = /<a href="(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)">.+<\/a>/g;

        //SoundCloud
        var regularUrlSounCloudTrack = /<a href="(?:https?:\/\/)?(?:www\.)?(?:soundcloud\.com)\/?([\w\-_]+)\/([\w\-_]+)">.+<\/a>/g;
        var regularUrlSounCloudSet = /<a href="(?:https?:\/\/)?(?:www\.)?(?:soundcloud\.com)\/?([\w\-_]+)\/sets\/([\w\-_]+)">.+<\/a>/g;

        //Spotify
        var regularUrlSpotifyTrack = /spotify:(track|album):([a-zA-Z0-9]+)/g;
        var regularUrlSpotifyUser = /spotify:user:([a-zA-Z0-9]+):playlist:([a-z-A-Z0-9]+)/g;

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

        //SoundCloud
        if (data.postData.content.match(regularUrlSounCloudTrack)) {
            data.postData.content = data.postData.content.replace(regularUrlSounCloudTrack, embedSouncloudTrack);
        }
        if (data.postData.content.match(regularUrlSounCloudSet)) {
            data.postData.content = data.postData.content.replace(regularUrlSounCloudSet, embedSouncloudSet);
        }

        //Spotify
        if (data.postData.content.match(regularUrlSpotifyTrack)) {
            data.postData.content = data.postData.content.replace(regularUrlSpotifyTrack, embedSpotifyTrack);
        }
        if (data.postData.content.match(regularUrlSpotifyUser)) {
            data.postData.content = data.postData.content.replace(regularUrlSpotifyUser, embedSpotifyUser);
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