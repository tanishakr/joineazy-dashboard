function formatDate(dateString) {
  // Adding T00:00:00 makes JS read the date in local time, so it doesn't shift by a day
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default formatDate