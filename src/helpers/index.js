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
