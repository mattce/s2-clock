now = new Date()
offsetSeconds = (now.getSeconds() * 360 / 60 - 90) % 360
offsetMinutes = (now.getMinutes() * 360 / 60 + 6 * offsetSeconds / 360 - 90) % 360
offsetHours = (now.getHours() * 360 / 12 + 30 * offsetMinutes / 360 - 90) % 360

setHandles = (seconds, minutes, hours) ->
  $('.clock__handle--seconds').css 'transform', 'rotateZ(' + seconds + 'deg)'
  $('.clock__handle--minutes').css 'transform', 'rotateZ(' + minutes + 'deg)'
  $('.clock__handle--hours').css 'transform', 'rotateZ(' + hours + 'deg)'

$(document).ready ->
  setHandles(offsetSeconds, offsetMinutes, offsetHours)
