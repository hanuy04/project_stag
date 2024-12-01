// utils/timeUtils.js

export const getFormattedTime = (date) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // format 24 jam
    };
    return date.toLocaleTimeString('en-GB', options);
  };
  
  export const getFormattedDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  
  export const getFormattedDay = (date) => {
    return date.toLocaleDateString('en-GB', { weekday: 'long' });
  };
  