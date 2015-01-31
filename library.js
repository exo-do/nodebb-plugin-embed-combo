(function(module) {
	"use strict";

	var Plugin = {}, embeds = [];
	
	/**
	 * embeds.push({
	 *	 id: 'Servicio',
	 *	 code: 'Código HTML que se insertará',
	 *	 regexps: [array de expresiones regulares que hay que reemplazar],
	 *   icon: 'Icono de FontAwesome que aparecerá al lado del enlace en la previsualización'
	 * });
	 */
	
	embeds.push({
		id: 'YouTube',
		code: '<div class="js-lazyYT" data-youtube-id="$1" data-width="640" data-height="360"><iframe class="lazytube" src="//www.youtube.com/embed/$1"></iframe></div>',
		regexps: [
			/<a href="(?:https?:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)(.+)">.*?<\/a>/g,
			/<a href="(?:https?:\/\/)?(?:www\.)?(?:youtu\.be)\/(.+)">.*?<\/a>/g,
			/<a href="(?:https?:\/\/)?(?:www\.)?youtube.com\/embed\/([\w\-_]+)">.*?<\/a>/
		],
		icon: 'fa-youtube-play'
	});
	
	embeds.push({
		id: 'Twitter',
		code: '<span data-url="https://twitter.com/$1/statuses/$2"></span><script type="text/javascript" src="//api.twitter.com/1/statuses/oembed.json?id=$2&callback=twitterEmbed"></script>',
		regexps: [/<a href="(?:https?:\/\/)?(?:www\.)?twitter.com\/([^\/"\s]*)\/status\/([^\/"\s]*)(\/photo\/1|)">.*?<\/a>/g],
		icon: 'fa-twitter'
	});
	
	embeds.push({
		id: 'Vine',
		code: '<iframe class="vine-embed" src="https://vine.co/v/$1/embed/postcard?related=0" width="480" height="480" frameborder="0"></iframe><script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>',
		regexps: [/<a href="(?:https?:\/\/)?(?:www\.)?(?:vine\.co)\/v\/?(.+)">.*?<\/a>/g],
		icon: 'fa-vine'
	});
	
	embeds.push({
		id: 'Vimeo',
		code: '<iframe class="vimeo-embed" src="//player.vimeo.com/video/$1" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
		regexps: [/<a href="(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)">.*?<\/a>/g],
		icon: 'fa-vimeo-square'
	});
	
	embeds.push({
		id: 'Soundcloud Track',
		code: '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/$1/$2&amp;show_artwork=true"></iframe>',
		regexps: [/<a href="(?:https?:\/\/)?(?:www\.)?(?:soundcloud\.com)\/?([\w\-_]+)\/([\w\-_]+)">.*?<\/a>/g],
		icon: 'fa-soundcloud'
	});
	
	embeds.push({
		id: 'Soundcloud Set',
		code: '<iframe width="100%" height="410" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/$1/sets/$2&amp;show_artwork=true"></iframe>',
		regexps: [/<a href="(?:https?:\/\/)?(?:www\.)?(?:soundcloud\.com)\/?([\w\-_]+)\/sets\/([\w\-_]+)">.*?<\/a>/g],
		icon: 'fa-soundcloud'
	});
	
	embeds.push({
		id: 'Spotify Track',
		code: '<iframe src="https://embed.spotify.com/?uri=spotify:$1:$2" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>',
		regexps: [/spotify:(track|album):([a-zA-Z0-9]+)/g],
		icon: 'fa-spotify'
	});
	
	embeds.push({
		id: 'Spotify User',
		code: '<iframe src="https://embed.spotify.com/?uri=spotify:user:$1:playlist:$2" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>',
		regexps: [/spotify:user:([a-zA-Z0-9]+):playlist:([a-z-A-Z0-9]+)/g],
		icon: 'fa-spotify'
	});
	
	embeds.push({
		id: 'Twitch',
		code: '<object type="application/x-shockwave-flash" height="378" width="620" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=$1" bgcolor="#000000"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="allowNetworking" value="all" /><param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" /><param name="flashvars" value="hostname=www.twitch.tv&channel=$1&auto_play=false&start_volume=50" /></object>',
		regexps: [/<a href="(?:https?:\/\/)?(?:www\.)?(?:twitch\.tv)\/?(.+)">.*?<\/a>/g],
		icon: 'fa-twitch'
	});
	
	embeds.push({
		id: 'Vocaroo',
		code: '<object width="148" height="44"><param name="movie" value="http://vocaroo.com/player.swf?playMediaID=$1&autoplay=0"></param><param name="wmode" value="transparent"></param><embed src="http://vocaroo.com/player.swf?playMediaID=$1&autoplay=0" width="148" height="44" wmode="transparent" type="application/x-shockwave-flash"></embed></object>',
		regexps: [/<a href="(?:https?:\/\/)?(?:www\.)?(?:vocaroo\.com)\/(?:i\/)(.+)">.*?<\/a>/g],
		icon: 'fa-volume-off'
	});
	
	embeds.push({
		id: 'Webm',
		code: '<video preload="metadata" controls="" src="$1"></video>',
		regexps: [/<a href="(.+?\.webm)">.*?<\/a>/g],
		icon: 'fa-video-camera'
	});
	
	embeds.push({
		id: 'Gfycat',
		code: '<video preload="metadata" controls="" src="http://zippy.gfycat.com/$1.webm"></video>',
		regexps: [/<a href="(?:https?:\/\/)?(?:www\.)?(?:gfycat\.com)\/?([\w\-_]+?)">.*?<\/a>/g],
		icon: 'fa-video-camera'
	});
	
	/**
	 * Buscamos e insertamos todos los servicios que hemos definido
	 */
    Plugin.parse = function(data, callback) {
		
        if (!data || !data.postData || !data.postData.content) {
            return callback(null, data);
        }
		
		embeds.forEach(function (embed) {
			embed.regexps.forEach(function (regex) {
				data.postData.content = data.postData.content.replace(regex, embed.code);
			});
		});
        
        callback(null, data);

    };
	
	/**
	 * En la previsualización, no metemos el HTML de los vídeos, pero indicamos con un pequeño
	 * icono a la derecha, que se ha encontrado un servicio disponible para embeber 
	 */
	Plugin.preview = function(content, callback) {
		
		embeds.forEach(function (embed) {
			embed.regexps.forEach(function (regex) {
				content = content.replace(new RegExp('(' + regex.source + ')', 'g'), '$1 <i class="fa ' + (embed.icon || 'fa-youtube-play') + '"></i>');
			});
		});
        
        callback(null, content);

    };
	
	module.exports = Plugin;

}(module));