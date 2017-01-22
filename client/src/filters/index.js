function domain(url) {
  const a = document.createElement('a');
  a.href = url;
  return a.hostname;
}

function pluralize(time, label) {
  return time === 1 ? `${time} ${label}` : `${time} ${label}s`
}

function timeAgo(time) {
  const between = Date.now()/1000 - new Date(`${time}Z`)/1000
  if (between < 3600) {
    return pluralize(~~(between/60), 'minute')
  } else if (between < 86400) {
    return pluralize(~~(between/3600), 'hour')
  } else {
    return pluralize(~~(between/86400), 'day')
  }
}

export default {
  pluralize,
  timeAgo,
  domain
}
