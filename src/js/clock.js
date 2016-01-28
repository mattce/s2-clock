(function (window, context) {

    // check if amd modules are available and define context as an amd module
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        define(function () {
            return context;
        });
    } else { // ... otherwise bind it to the window
        window.Clock = context;
    }

})(this, function (options) {

    // default values every clock can use
    var DEFAULTS = {
        root: 'clock',
        selectorSeconds: 'handle-seconds',
        selectorMinutes: 'handle-minutes',
        selectorHours: 'handle-hours',
        smoothing: false
    };

    /**
     * Constructor block of clock functionality
     * @param {object} options Options passed to constructor to overwrite defaults
     * @constructor
     */
    var Clock = function (options) {

        // general reference to `this`
        var _this = this;

        // options overwrite defaults to settings
        this.settings = $.extend({}, DEFAULTS, options);
        // cached reference to root element
        this.$root = $('.' + this.settings.root);
        // cached reference to seconds handle
        this.$handleSeconds = this.$root.find('.' + this.settings.selectorSeconds);
        // cached reference to minutes handle
        this.$handleMinutes = this.$root.find('.' + this.settings.selectorMinutes);
        // cached reference to hours handle
        this.$handleHours = this.$root.find('.' + this.settings.selectorHours);
        // global reference to interval
        this.intervalID = 0;
        // stores value if current window is in focus
        this.isWindowFocused = true;

        // (re)initialize clock when user exits and enters page again
        $(window).focus(function () {
            if (!_this.isWindowFocused) {
                _this.startTimer();
                _this.isWindowFocused = true;
            }
        }).blur(function () {
            _this.isWindowFocused = false;
        });

        // bootstrap clock
        this.startTimer();

        this.$handleSeconds
            .css('transition', 'transform ' + (this.settings.smoothing ? '1s linear' : ' 0.2s ease-out'));
        this.$handleMinutes
            .css('transition', 'transform ' + (this.settings.smoothing ? '1s linear' : ' 0.2s ease-out'));
        this.$handleHours
            .css('transition', 'transform ' + (this.settings.smoothing ? '1s linear' : ' 0.2s ease-out'));

    };

    /**
     * Sets handles rotation according to passed parameters in degree
     * @param {object} offsets Information about the seconds-, minutes- and hours offset from 0 in degree
     */
    Clock.prototype.setHandles = function (offsets) {

        this.$handleSeconds.css('transform', 'rotateZ(' + offsets.offsetSeconds + 'deg)');
        this.$handleMinutes.css('transform', 'rotateZ(' + offsets.offsetMinutes + 'deg)');
        this.$handleHours.css('transform', 'rotateZ(' + offsets.offsetHours + 'deg)');

    };

    /**
     * manages starting / restarting the timer
     */
    Clock.prototype.startTimer = function () {

        var _this = this;

        window.clearInterval(this.intervalID);

        _this.setHandles(getCurrentTimeOffset());
        window.setInterval(function () {
            _this.setHandles(getCurrentTimeOffset());
        },1000);

    };

    /**
     * Calculates offsets of current time in degrees
     * @returns {{offsetSeconds: number, offsetMinutes: number, offsetHours: number}}
     */
    var getCurrentTimeOffset = function () {

        var date = new Date(),
            offsetSeconds = (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()) * 360 / 60,
            offsetMinutes = offsetSeconds / 60,
            offsetHours = offsetMinutes / 24;

        return {
            // '-90' because the clocks 0° starts at -90°
            offsetSeconds: offsetSeconds - 90,
            offsetMinutes: offsetMinutes - 90,
            offsetHours: offsetHours - 90
        }

    };

    return new Clock(options);

});
