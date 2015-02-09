(function(window, factory){

    if (window.define) {
        define(factory);
    } else {
        window['GFW'] = factory();
    }

}(window, function() {

    //Just a few utility functions used in this scope

    var localService = {

        extend : function(obj) {

            //http://underscorejs.org/docs/underscore.html
            if (!_.isObject(obj)) return obj;

            var source, prop;

            for (var i = 1, length = arguments.length; i < length; i++) {
                source = arguments[i];
                for (prop in source) {
                    if (hasOwnProperty.call(source, prop)) {
                        obj[prop] = source[prop];
                    }
                }
            }

            return obj;

        },

        isObject : function(obj) {

            //http://underscorejs.org/docs/underscore.html
            var type = typeof obj;

            return type === 'function' || type === 'object' && !!obj;

        }

    };

    //Game is our custom object that mixes our stuff in with the base game library

    var Game = function(init) {

        this._utilEvents = init.events;

        init.base.apply(this, init.args);

    };

    Game.prototype = {

        _utilGetEmitter : function() {

            return this._utilEvents;

        }

    };

    //GameFactory meshes together the prototypes, instantiates and returns

    var GameFactory = function() {

        var args = Array.prototype.slice.call(arguments);

        var config = args.shift();

        localService.extend(Game.prototype, config.baseLibrary.prototype);

        return new Game({
            base : config.baseLibrary,
            args : args,
            events : config.eventService
        });

    };

    return GameFactory;

}));
