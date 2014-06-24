/**
 * Sequence class
 *
 * Runs through a queue of triggered events in sequence.
 * Sequence does not continue until the current method triggers next item in sequence.
 */
function Sequence(debug) {
	if(typeof debug === "undefined") {
		this.debug = true;
	} else {
		this.debug = debug;
	}

	this.args = false;
	this.events = false;
	this.count = 0;
	this.key = 0;
}

/**
 * Set event queue
 *
 * @param events
 *   Array of objects. [{func: function(s) { alert(s.next); s.next(); }, title: "first"},{funct: function(s) { alert(s.next); s.next(); }, title: "second")}]
 * @param args
 *   Array of variables to pass to sequence function. This array of arguments will be used if individual event in the sequence does not supply args.
 */
Sequence.prototype.setEvents = function(events, args) {
	this.events = events;
	this.count = 0;

	if(typeof args === "object") {
		this.args = args;
	} else {
		this.args = false;
	}
};

/**
 * Start queue or trigger next event in queue
 */
Sequence.prototype.next = function() {
	var key = this.count;

	this.key = key;
	this.count++;

	//Call event
	if(typeof this.events[key] !== "undefined") {
		var ev = this.events[key];

		//Arguments
		var args = [];
		if(typeof ev.args === "undefined") {
			if(this.args !== false) {
				args = this.args;
			}
		} else {
			args = ev.args;
		}

		//Debug
		if(this.debug && typeof console === "object") {
			if(typeof ev.title === "string") {
				console.log("Sequence :: "+ev.title);
			} else {
				console.log("Sequence :: "+key);
			}
		}

		//Call function
		ev.func.apply(this, args);
	}

	return true;
};