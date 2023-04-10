import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Calendar from 'dayjs/plugin/calendar';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(advancedFormat);
dayjs.extend(Calendar);
dayjs.extend(relativeTime);

export const dateFromNow = (date: dayjs.ConfigType) => {
  return dayjs().calendar(dayjs(date), {
    sameDay: '[Today]', // The same day ( Today at 2:30 AM )
    nextDay: 'MMM DD, YYYY', // The next day ( Tomorrow at 2:30 AM )
    nextWeek: 'MMM DD, YYYY', // The next week ( Sunday at 2:30 AM )
    lastDay: 'MMM DD, YYYY', // The day before ( Yesterday at 2:30 AM )
    lastWeek: 'MMM DD, YYYY', // Last week ( Last Monday at 2:30 AM )
    sameElse: 'MMM DD, YYYY', // Everything else ( 17/10/2011 )
  });
};

export const timeFromNow = (date: dayjs.ConfigType, suffix = false) => {
  return dayjs(date).fromNow(suffix);
};

export const formatDate = (
  date: dayjs.ConfigType,
  format: string = 'D MMM YYYY',
) => {
  return dayjs(date).format(format);
};

export function getAge(dateString: Date) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
