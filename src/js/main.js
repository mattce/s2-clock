$(function(){

    // create new Clock() instance on DOM ready
    var clock = new Clock({
        root: 'clock',
        selectorSeconds : 'clock__handle--seconds',
        selectorMinutes : 'clock__handle--minutes',
        selectorHours : 'clock__handle--hours',
        smoothing: false
    });

});