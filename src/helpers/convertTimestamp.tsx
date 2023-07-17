export const convertTimestamp = (timestamp: Date) => {
  // Convert the timestamp to a JavaScript Date object
  var dt = new Date(timestamp)

  // Format the Date object to the desired format
  var month = dt.getMonth() + 1
  var date = dt.getDate()
  var year = dt.getFullYear()
  var formattedDateTime = month + "/" + date + "/" + year + " " + formatTime(dt)

  return formattedDateTime
}

const formatTime = (dt: Date) => {
  var hours = dt.getHours()
  var minutes = dt.getMinutes().toString()
  var ampm = hours >= 12 ? "PM" : "AM"

  hours = hours % 12
  hours = hours ? hours : 12 // Handle midnight (0 hours)

  // Add leading zeros to minutes if necessary
  minutes = ("0" + minutes).slice(-2)

  return hours + ":" + minutes + ampm
}
