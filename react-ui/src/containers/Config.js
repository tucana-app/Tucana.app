const prod = {
  ABS_PATH: "./wp-content/themes/stadium8",
  MAPS_API_KEY: "AIzaSyAQ4wGzedKfUyIE85AUA1vZQt539s4U-4A",
  CALENDAR_API_KEY: "AIzaSyAqmMLXWJ9CpdFok66CVp0viRRsQZuO4K8",
  CALENDAR_URL: "vqfi8t5t8q28tqtae32l3rnl40@group.calendar.google.com",
  status: "PROD"
};

const dev = {
  ABS_PATH: "",
  MAPS_API_KEY: "",
  // MAPS_API_KEY: "AIzaSyAQ4wGzedKfUyIE85AUA1vZQt539s4U-4A",
  // CALENDAR_API_KEY: "",
  CALENDAR_API_KEY: "AIzaSyAqmMLXWJ9CpdFok66CVp0viRRsQZuO4K8",
  CALENDAR_URL: "vqfi8t5t8q28tqtae32l3rnl40@group.calendar.google.com",
  status: "DEV"
};

export const Config = process.env.NODE_ENV === "development" ? dev : prod;
