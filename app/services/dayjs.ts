// var utc = require("dayjs/plugin/utc");
import utc from "dayjs/plugin/utc"; // ES 2015

// var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
import timezone from "dayjs/plugin/timezone"; // ES 2015
import dayjs from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Dayjs with UTC and Timezone support
 */
export const Dayjs = dayjs;
