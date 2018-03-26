import moment from 'moment';

export default function formatMessageDate(messageDate) {
  const localMessageDate = moment.utc(messageDate).local();
  const currentDate = moment.utc().local();

  if (currentDate.diff(localMessageDate, 'seconds') <= 5) {
    return 'just now';
  } else if (currentDate.diff(localMessageDate, 'seconds') <= 20) {
    return 'a few seconds ago';
  } else if (currentDate.diff(localMessageDate, 'days') <= 1) {
    return localMessageDate.calendar();
  } else if (currentDate.diff(localMessageDate, 'days') < 7) {
    return localMessageDate.format('dddd [at] h:mm A');
  }
  return localMessageDate.format('MMM Do [at] h:mm A');
}
