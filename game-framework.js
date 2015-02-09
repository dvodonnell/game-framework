/*

TVO Game Framework
0.0.0

Description:

Coats a base game library of our choosing with our own object that mixes in events and anything else we need.

Usage:

new GameInstance({ baseLibrary : [ base game class ], eventService : [ event provider singleton ] }, [ game library parameters ]);

Eg:

var game = new GameInstance({ baseLibrary : Phaser.Game, eventService : Backbone.Events }, 1024, 768 'myDiv', 'CANVAS');

 */



(function(window, factory){

    if (window.define) {
        define(factory);
    } else {
        window['GameInstance'] = factory();
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
