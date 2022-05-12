import { findEmails, findPhones, findLinks } from "../../helpers/functions";

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
