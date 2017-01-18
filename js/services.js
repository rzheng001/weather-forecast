app.service("storage", function() {
	this.local = {
		save: function(key, value) { localStorage[key] = value; },
		get: function(key, defaultValue) { return localStorage[key] ? localStorage[key] : defaultValue; },
		remove: function(key) { localStorage.removeItem(key); }
	}
	this.session = {
		save: function(key, value) { sessionStorage[key] = value; },
		get: function(key, defaultValue) { return sessionStorage[key] ? sessionStorage[key] : defaultValue; },
		remove: function(key) { sessionStorage.removeItem(key); }
	}
	return this;
});