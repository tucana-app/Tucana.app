export const { findPhoneNumbersInText } = require("libphonenumber-js");

// Returns an array of phone numbers if founds
export const findPhones = (string) => findPhoneNumbersInText(string);

// Returns an array of emails if founds

export const findEmails = (string) => {
  return string.match(
    // eslint-disable-next-line
    /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi
  );
};

// Returns an array of links founds

export const findLinks = (string) => {
  return string.match(
    // eslint-disable-next-line
    /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/
  );
};

export const parseText = (text) => {
  let result = "";

  const linksFound = findLinks(text);
  const phonesFound = findPhones(text);
  const emailsFound = findEmails(text);

  if (linksFound && linksFound.length > 0) {
    result = { value: 1, message: "Do not include links" };
  } else if (phonesFound.length > 0) {
    result = { value: 2, message: "Do not include phone numbers" };
  } else if (emailsFound && emailsFound.length > 0) {
    result = { value: 3, message: "Do not include emails" };
  } else {
    result = { value: 0, message: "" };
  }

  return result;
};

export const isEmptyObject = (obj) => {
  // because Object.keys(new Date()).length === 0;
  // we have to do some additional check
  return (
    obj && // 👈 null and undefined check
    Object.keys(obj).length === 0 &&
    obj.constructor === Object
  );
};

export const formatPrice = (number) => {
  return `₡${Number(number).toLocaleString()}`;
};

export const formatDistance = (distance) => {
  let km = distance / 1000;
  km = km.toFixed(2);
  return `${Number(km).toLocaleString()} km`;
};

export const isDateInPast = (firstDate, secondDate) => {
  let first = new Date(firstDate);
  let second = new Date(secondDate);

  return first <= second;
};

export const countDriverRides = (driverRidesData) => {
  let count = 0;

  driverRidesData.map((ride, index) => {
    return (ride.RideStatusId === 1 || ride.RideStatusId === 2) &&
      !isDateInPast(ride.dateTimeOrigin, new Date())
      ? count++
      : null;
  });

  return count;
};

export const countDriverBookings = (driverBookingsData) => {
  let count = 0;

  driverBookingsData.map((booking, index) => {
    return booking.Ride.seatsLeft !== 0 &&
      booking.BookingStatusId === 1 &&
      !isDateInPast(booking.Ride.dateTimeOrigin, new Date())
      ? count++
      : null;
  });

  return count;
};

export const countUserBookings = (bookings) => {
  let count = 0;

  bookings.map((booking, index) => {
    return booking.BookingStatusId === 3 &&
      !isDateInPast(booking.Ride.dateTimeOrigin, new Date())
      ? count++
      : null;
  });

  return count;
};

export const getArrayTimeRide = () => {
  let i,
    j,
    interval = 15,
    array = [],
    arrayValue = [],
    options = [];

  // Create the 12 AM
  for (j = 0; j < 60 / interval; j++) {
    array.push(12 + ":" + (j === 0 ? "00" : interval * j) + " AM");
  }

  // Create the rest of the AM
  for (i = 1; i < 12; i++) {
    for (j = 0; j < 60 / interval; j++) {
      array.push(i + ":" + (j === 0 ? "00" : interval * j) + " AM");
    }
  }

  // Create the 12 PM
  for (j = 0; j < 60 / interval; j++) {
    array.push(12 + ":" + (j === 0 ? "00" : interval * j) + " PM");
  }

  // Create the rest of the PM
  for (i = 1; i < 12; i++) {
    for (j = 0; j < 60 / interval; j++) {
      array.push(i + ":" + (j === 0 ? "00" : interval * j) + " PM");
    }
  }

  // Time value 24h format
  for (i = 0; i < 24; i++) {
    for (j = 0; j < 60 / interval; j++) {
      arrayValue.push(i + ":" + (j === 0 ? "00" : interval * j));
    }
  }

  array.map((time, index) => {
    return options.push({ value: arrayValue[index], label: time });
  });

  return options;
};

export const formatTimeSecond = (seconds) => {
  // Get hours from seconds
  let hours = seconds / (60 * 60);
  let absoluteHours = Math.floor(hours);
  let h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

  // Get remainder from hours and convert to minutes
  let minutes = (hours - absoluteHours) * 60;
  let absoluteMinutes = Math.floor(minutes);
  let m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

  return `${h}h${m}`;
};

export const isOnlyLetters = (str) => {
  return str.match("^[A-ZÀ-ÿa-z0-9 ]+$");
};

export const getPercent = (user) => {
  const range =
    user.ExperienceUser.ExperienceUserLevel.max -
    user.ExperienceUser.ExperienceUserLevel.min;
  const diff =
    user.ExperienceUser.points - user.ExperienceUser.ExperienceUserLevel.min;

  return ((diff * 100) / range).toFixed(0);
};

export const changeTimezone = (date, ianatz) => {
  // suppose the date is 12:00 UTC
  var invdate = new Date(
    date.toLocaleString("en-US", {
      timeZone: ianatz,
    })
  );

  // then invdate will be 07:00 in Toronto
  // and the diff is 5 hours
  var diff = date.getTime() - invdate.getTime();

  // so 12:00 in Toronto is 17:00 UTC
  return new Date(date.getTime() - diff); // needs to substract
};

// Thanks ChatGPT
export const getYearsDiff = (date1, date2) => {
  // convert both dates to milliseconds
  const date1Millis = date1.getTime();
  const date2Millis = date2.getTime();

  // calculate the difference in milliseconds
  const diffMillis = Math.abs(date2Millis - date1Millis);

  // convert milliseconds to years
  const millisPerYear = 1000 * 60 * 60 * 24 * 365.25; // 365.25 days in a year to account for leap years
  const diffYears = Math.floor(diffMillis / millisPerYear);

  return diffYears;
};
