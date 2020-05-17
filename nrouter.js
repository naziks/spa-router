const nRouter = class nRouter{
	constructor(params = {}){
		params = Object.assign({
			default_route:"/",
			start_hash: "#!",
			debug: false,
			routes: {},
			notFound: ()=>{}
		}, params);

		this.start_hash = params['start_hash'];
		this.default_route = params['default_route'];
		this.routes = params['routes'];
		this.notFoundRoute = params['notFound']
		this.debug = params['debug'];

		this.route = "";
		this.running = false;

		// bind links
		let self = this;
		window.document.querySelectorAll('[nr-link]').forEach(e => {
			e.addEventListener('click', function(){
				self.navigate(e.getAttribute('nr-link'))
			})
		});
	}
	
	on(route,func, cb){
		if(this.debug) console.log(`Added route "${route}"`)
			this.routes[route] = func;
		return this;
	}

	match(pattern, string){
		string = string.replace(/^\/|\/$/g, '').split('/')
		pattern = pattern.replace(/^\/|\/$/g, '').split('/')
		return pattern.reduce((r,e,i) => {
			if(e[0] == ":"){
				r['var'][e.substr(1)] = string[i];
			}else if(e != string[i]){
				r['valid'] = false;
			}
			return r;
		}, {valid:pattern.length == string.length, var:{}})
	}

	notFound(func){
		this.notFoundRoute = func;
		return this;
	}

	navigate(route){
		this.route = route;
		window.location = this.start_hash+route;
		if(window.location.hash == this.start_hash+route){
			this.resolve();
		}
		return this;
	}

	resolve(){
		let hash = window.location.hash.replace(this.start_hash,'');
		let valid = false;
		if(this.debug) console.log(`Looking for "${hash}" route`);
		console.log(this);

		for(const path of Object.keys(this.routes)){
			let test_match = this.match(path, hash);
			valid = test_match.valid;

			if(test_match.valid){
				if(this.debug) console.log(`Match found! Route variables: `, test_match.var);
				this.page = hash;
				this.routes[path](test_match.var);
				break;
			}
		}
		if(!valid){
			this.notFoundRoute();
			this.route = 404;
			if(this.debug) console.error(`Route "${hash}" not found!`);

		}

		return this;	
	}

	start(){
		let self = this;
		if(!this.running){
			this.running = !this.running;
			if(this.debug) console.log(`nRouter Started!`);
			if(!window.location.hash.includes(this.start_hash)){
				this.navigate(this.default_route);
				if(this.debug) console.log(`Route in url not found. Navigation to default route`);
			}else{
				if(this.debug) console.log(`Found route in url!`);
				this.resolve();
			}
			window.addEventListener('hashchange',function(){
				self.resolve()
			});

		}else{
			if(this.debug) console.error(`nRouter is already running`);
		}
		return this;
	}
}
