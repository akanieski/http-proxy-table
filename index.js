module.exports = {
	
	listen: function(options, next) {

		var http = require('http'),
    		httpProxy = require('http-proxy');
		var proxy = httpProxy.createProxyServer({});


		if (!options) {
			next('Invalid options provided');
			return;
		}

		if (!options.routes)  {
			next('Invalid routes provided');
			return;
		}

		
		var server = http.createServer(function(request, response) {

			console.log('Request Received.')
			// for each request we must find the appropriate route and pass the request on to that route's config setup

			options.routes.forEach(function(route,i){
				console.log(request.headers.host);
				if (route.host === request.headers.host) {
					console.log('Found route #' + i + ' to ' + route.target);
					// found a match. lets pass it on to the appropriate configuration
					proxy.web(request, response, { target: route.target });
					return;
				}

			});
		});

		server.listen(options.port);
	}

}
