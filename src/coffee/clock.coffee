now = new Date()
offsetSeconds = (now.getSeconds() * 360 / 60 - 90) % 360
offsetMinutes = (now.getMinutes() * 360 / 60 + 6 * offsetSeconds / 360 - 90) % 360
offsetHours = (now.getHours() * 360 / 12 + 30 * offsetMinutes / 360 - 90) % 360

setHandles = ->
  $('.clock__handle--seconds').css 'transform', 'rotateZ(' + offsetSeconds + 'deg)'
  $('.clock__handle--minutes').css 'transform', 'rotateZ(' + offsetMinutes + 'deg)'
  $('.clock__handle--hours').css 'transform', 'rotateZ(' + offsetHours + 'deg)'

$(document).ready ->
  setHandles()
