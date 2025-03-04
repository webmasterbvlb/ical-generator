import { ServerResponse } from 'http';

interface ICalAttendeeData {
    name?: string | null;
    email?: string | null;
    mailto?: string | null;
    sentBy?: string | null;
    status?: ICalAttendeeStatus | null;
    role?: ICalAttendeeRole;
    rsvp?: boolean | null;
    type?: ICalAttendeeType | null;
    delegatedTo?: ICalAttendee | ICalAttendeeData | string | null;
    delegatedFrom?: ICalAttendee | ICalAttendeeData | string | null;
    delegatesTo?: ICalAttendee | ICalAttendeeData | string | null;
    delegatesFrom?: ICalAttendee | ICalAttendeeData | string | null;
    x?: {
        key: string;
        value: string;
    }[] | [string, string][] | Record<string, string>;
}
interface ICalAttendeeJSONData {
    name: string | null;
    email: string | null;
    mailto: string | null;
    sentBy: string | null;
    status: ICalAttendeeStatus | null;
    role: ICalAttendeeRole;
    rsvp: boolean | null;
    type: ICalAttendeeType | null;
    delegatedTo: string | null;
    delegatedFrom: string | null;
    x: {
        key: string;
        value: string;
    }[];
}
declare enum ICalAttendeeRole {
    CHAIR = "CHAIR",
    REQ = "REQ-PARTICIPANT",
    OPT = "OPT-PARTICIPANT",
    NON = "NON-PARTICIPANT"
}
declare enum ICalAttendeeStatus {
    ACCEPTED = "ACCEPTED",
    TENTATIVE = "TENTATIVE",
    DECLINED = "DECLINED",
    DELEGATED = "DELEGATED",
    NEEDSACTION = "NEEDS-ACTION"
}
declare enum ICalAttendeeType {
    INDIVIDUAL = "INDIVIDUAL",
    GROUP = "GROUP",
    RESOURCE = "RESOURCE",
    ROOM = "ROOM",
    UNKNOWN = "UNKNOWN"
}
/**
 * Usually you get an `ICalAttendee` object like this:
 *
 * ```javascript
 * import ical from 'ical-generator';
 * const calendar = ical();
 * const event = calendar.createEvent();
 * const attendee = event.createAttendee();
 * ```
 *
 * You can also use the [[`ICalAttendee`]] object directly:
 *
 * ```javascript
 * import ical, {ICalAttendee} from 'ical-generator';
 * const attendee = new ICalAttendee();
 * event.attendees([attendee]);
 * ```
 */
declare class ICalAttendee {
    private readonly data;
    private readonly event;
    /**
     * Constructor of [[`ICalAttendee`]]. The event reference is
     * required to query the calendar's timezone when required.
     *
     * @param data Attendee Data
     * @param calendar Reference to ICalEvent object
     */
    constructor(data: ICalAttendeeData, event: ICalEvent);
    /**
     * Get the attendee's name
     * @since 0.2.0
     */
    name(): string | null;
    /**
     * Set the attendee's name
     * @since 0.2.0
     */
    name(name: string | null): this;
    /**
     * Get the attendee's email address
     * @since 0.2.0
     */
    email(): string | null;
    /**
     * Set the attendee's email address
     * @since 0.2.0
     */
    email(email: string | null): this;
    /**
     * Get the attendee's email address
     * @since 1.3.0
     */
    mailto(): string | null;
    /**
     * Set the attendee's email address
     * @since 1.3.0
     */
    mailto(mailto: string | null): this;
    /**
     * Get the acting user's email adress
     * @since 3.3.0
     */
    sentBy(): string | null;
    /**
     * Set the acting user's email adress
     * @since 3.3.0
     */
    sentBy(email: string | null): this;
    /**
     * Get attendee's role
     * @since 0.2.0
     */
    role(): ICalAttendeeRole;
    /**
     * Set the attendee's role, defaults to `REQ` / `REQ-PARTICIPANT`.
     * Checkout [[`ICalAttendeeRole`]] for available roles.
     *
     * @since 0.2.0
     */
    role(role: ICalAttendeeRole): this;
    /**
     * Get attendee's RSVP expectation
     * @since 0.2.1
     */
    rsvp(): boolean | null;
    /**
     * Set the attendee's RSVP expectation
     * @since 0.2.1
     */
    rsvp(rsvp: boolean | null): this;
    /**
     * Get attendee's status
     * @since 0.2.0
     */
    status(): ICalAttendeeStatus | null;
    /**
     * Set the attendee's status. See [[`ICalAttendeeStatus`]]
     * for available status options.
     *
     * @since 0.2.0
     */
    status(status: ICalAttendeeStatus | null): this;
    /**
     * Get attendee's type (a.k.a. CUTYPE)
     * @since 0.2.3
     */
    type(): ICalAttendeeType;
    /**
     * Set attendee's type (a.k.a. CUTYPE).
     * See [[`ICalAttendeeType`]] for available status options.
     *
     * @since 0.2.3
     */
    type(type: ICalAttendeeType | null): this;
    /**
     * Get the attendee's delegated-to value.
     * @since 0.2.0
     */
    delegatedTo(): ICalAttendee | null;
    /**
     * Set the attendee's delegated-to field.
     *
     * Creates a new Attendee if the passed object is not already a
     * [[`ICalAttendee`]] object. Will set the `delegatedTo` and
     * `delegatedFrom` attributes.
     *
     * Will also set the `status` to `DELEGATED`, if attribute is set.
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     * const attendee = cal.createAttendee();
     *
     * attendee.delegatesTo({email: 'foo@bar.com', name: 'Foo'});
     ```
     *
     * @since 0.2.0
     */
    delegatedTo(delegatedTo: ICalAttendee | ICalAttendeeData | string | null): this;
    /**
     * Get the attendee's delegated-from field
     * @since 0.2.0
     */
    delegatedFrom(): ICalAttendee | null;
    /**
     * Set the attendee's delegated-from field
     *
     * Creates a new Attendee if the passed object is not already a
     * [[`ICalAttendee`]] object. Will set the `delegatedTo` and
     * `delegatedFrom` attributes.
     *
     * @param delegatedFrom
     */
    delegatedFrom(delegatedFrom: ICalAttendee | ICalAttendeeData | string | null): this;
    /**
     * Create a new attendee this attendee delegates to and returns
     * this new attendee. Creates a new attendee if the passed object
     * is not already an [[`ICalAttendee`]].
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     * const attendee = cal.createAttendee();
     *
     * attendee.delegatesTo({email: 'foo@bar.com', name: 'Foo'});
     * ```
     *
     * @since 0.2.0
     */
    delegatesTo(options: ICalAttendee | ICalAttendeeData | string): ICalAttendee;
    /**
     * Create a new attendee this attendee delegates from and returns
     * this new attendee. Creates a new attendee if the passed object
     * is not already an [[`ICalAttendee`]].
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     * const attendee = cal.createAttendee();
     *
     * attendee.delegatesFrom({email: 'foo@bar.com', name: 'Foo'});
     * ```
     *
     * @since 0.2.0
     */
    delegatesFrom(options: ICalAttendee | ICalAttendeeData | string): ICalAttendee;
    /**
     * Set X-* attributes. Woun't filter double attributes,
     * which are also added by another method (e.g. status),
     * so these attributes may be inserted twice.
     *
     * ```javascript
     * attendee.x([
     *     {
     *         key: "X-MY-CUSTOM-ATTR",
     *         value: "1337!"
     *     }
     * ]);
     *
     * attendee.x([
     *     ["X-MY-CUSTOM-ATTR", "1337!"]
     * ]);
     *
     * attendee.x({
     *     "X-MY-CUSTOM-ATTR": "1337!"
     * });
     * ```
     *
     * @since 1.9.0
     */
    x(keyOrArray: {
        key: string;
        value: string;
    }[] | [string, string][] | Record<string, string>): this;
    /**
     * Set a X-* attribute. Woun't filter double attributes,
     * which are also added by another method (e.g. status),
     * so these attributes may be inserted twice.
     *
     * ```javascript
     * attendee.x("X-MY-CUSTOM-ATTR", "1337!");
     * ```
     *
     * @since 1.9.0
     */
    x(keyOrArray: string, value: string): this;
    /**
     * Get all custom X-* attributes.
     * @since 1.9.0
     */
    x(): {
        key: string;
        value: string;
    }[];
    /**
     * Return a shallow copy of the attendee's options for JSON stringification.
     * Can be used for persistence.
     *
     * @since 0.2.4
     */
    toJSON(): ICalAttendeeJSONData;
    /**
     * Return generated attendee as a string.
     *
     * ```javascript
     * console.log(attendee.toString()); // → ATTENDEE;ROLE=…
     * ```
     */
    toString(): string;
}

/**
 * ical-generator supports [native Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date),
 * [moment.js](https://momentjs.com/) (and [moment-timezone](https://momentjs.com/timezone/), [Day.js](https://day.js.org/en/) and
 * [Luxon](https://moment.github.io/luxon/)'s [DateTime](https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html)
 * objects. You can also pass a string which is then passed to javascript's Date internally.
 */
type ICalDateTimeValue = Date | ICalMomentStub | ICalMomentTimezoneStub | ICalLuxonDateTimeStub | ICalDayJsStub | string;
interface ICalRepeatingOptions {
    freq: ICalEventRepeatingFreq;
    count?: number;
    interval?: number;
    until?: ICalDateTimeValue;
    byDay?: ICalWeekday[] | ICalWeekday;
    byMonth?: number[] | number;
    byMonthDay?: number[] | number;
    bySetPos?: number[] | number;
    exclude?: ICalDateTimeValue[] | ICalDateTimeValue;
    startOfWeek?: ICalWeekday;
}
interface ICalLocation {
    title: string;
    address?: string;
    radius?: number;
    geo?: ICalGeo;
}
interface ICalGeo {
    lat: number;
    lon: number;
}
interface ICalOrganizer {
    name: string;
    email?: string;
    mailto?: string;
    sentBy?: string;
}
interface ICalDescription {
    plain: string;
    html?: string;
}
interface ICalTimezone {
    name: string | null;
    generator?: (timezone: string) => string | null;
}
interface ICalMomentStub {
    format(format?: string): string;
    clone(): ICalMomentStub;
    utc(): ICalMomentStub;
    toDate(): Date;
    isValid(): boolean;
    toJSON(): string;
}
interface ICalMomentTimezoneStub extends ICalMomentStub {
    clone(): ICalMomentTimezoneStub;
    utc(): ICalMomentTimezoneStub;
    tz(): string | undefined;
    tz(timezone: string): ICalMomentTimezoneStub;
}
interface ICalMomentDurationStub {
    asSeconds(): number;
}
interface ICalLuxonDateTimeStub {
    setZone(zone?: string): ICalLuxonDateTimeStub;
    toFormat(fmt: string): string;
    toJSDate(): Date;
    get isValid(): boolean;
    toJSON(): string;
}
interface ICalDayJsStub {
    tz(zone?: string): ICalDayJsStub;
    utc(): ICalDayJsStub;
    format(format?: string): string;
    toDate(): Date;
    isValid(): boolean;
    toJSON(): string;
}
interface ICalRRuleStub {
    between(after: Date, before: Date, inc?: boolean, iterator?: (d: Date, len: number) => boolean): Date[];
    toString(): string;
}
declare enum ICalEventRepeatingFreq {
    SECONDLY = "SECONDLY",
    MINUTELY = "MINUTELY",
    HOURLY = "HOURLY",
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY"
}
declare enum ICalWeekday {
    SU = "SU",
    MO = "MO",
    TU = "TU",
    WE = "WE",
    TH = "TH",
    FR = "FR",
    SA = "SA"
}

declare enum ICalAlarmType {
    display = "display",
    audio = "audio"
}
type ICalAlarmTypeValue = keyof ICalAlarmType;
interface ICalAttachment {
    uri: string;
    mime: string | null;
}
interface ICalAlarmData {
    type?: ICalAlarmType | null;
    trigger?: number | ICalDateTimeValue | null;
    triggerBefore?: number | ICalDateTimeValue | null;
    triggerAfter?: number | ICalDateTimeValue | null;
    repeat?: number | null;
    interval?: number | null;
    attach?: string | ICalAttachment | null;
    description?: string | null;
    x?: {
        key: string;
        value: string;
    }[] | [string, string][] | Record<string, string>;
}
interface ICalAlarmJSONData {
    type: ICalAlarmType | null;
    trigger: string | number | null;
    repeat: number | null;
    interval: number | null;
    attach: ICalAttachment | null;
    description: string | null;
    x: {
        key: string;
        value: string;
    }[];
}
/**
 * Usually you get an `ICalAlarm` object like this:
 *
 * ```javascript
 * import ical from 'ical-generator';
 * const calendar = ical();
 * const event = calendar.createEvent();
 * const alarm = event.createAlarm();
 * ```
 *
 * You can also use the [[`ICalAlarm`]] object directly:
 *
 * ```javascript
 * import ical, {ICalAlarm} from 'ical-generator';
 * const alarm = new ICalAlarm();
 * event.alarms([alarm]);
 * ```
 */
declare class ICalAlarm {
    private readonly data;
    private readonly event;
    /**
     * Constructor of [[`ICalAttendee`]]. The event reference is required
     * to query the calendar's timezone and summary when required.
     *
     * @param data Alarm Data
     * @param calendar Reference to ICalEvent object
     */
    constructor(data: ICalAlarmData, event: ICalEvent);
    /**
     * Get the alarm type
     * @since 0.2.1
     */
    type(type: ICalAlarmType | null): this;
    /**
     * Set the alarm type. See [[`ICalAlarmType`]]
     * for available status options.
     * @since 0.2.1
     */
    type(): ICalAlarmType | null;
    /**
     * Get the trigger time for the alarm. Can either
     * be a date and time value ([[`ICalDateTimeValue`]]) or
     * a number, which will represent the seconds between
     * alarm and event start. The number is negative, if the
     * alarm is triggered after the event started.
     *
     * @since 0.2.1
     */
    trigger(): number | ICalDateTimeValue | null;
    /**
     * Use this method to set the alarm time.
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     * const alarm = cal.createAlarm();
     *
     * alarm.trigger(600); // -> 10 minutes before event starts
     * alarm.trigger(new Date()); // -> now
     * ```
     *
     * You can use any supported date object, see
     * [readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones)
     * for details about supported values and timezone handling.
     *
     * @since 0.2.1
     */
    trigger(trigger: number | ICalDateTimeValue | Date | null): this;
    /**
     * Get the trigger time for the alarm. Can either
     * be a date and time value ([[`ICalDateTimeValue`]]) or
     * a number, which will represent the seconds between
     * alarm and event start. The number is negative, if the
     * alarm is triggered before the event started.
     *
     * @since 0.2.1
     */
    triggerAfter(): number | ICalDateTimeValue | null;
    /**
     * Use this method to set the alarm time. Unlike `trigger`, this time
     * the alarm takes place after the event has started.
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     * const alarm = cal.createAlarm();
     *
     * alarm.trigger(600); // -> 10 minutes after event starts
     * ```
     *
     * You can use any supported date object, see
     * [readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones)
     * for details about supported values and timezone handling.
     *
     * @since 0.2.1
     */
    triggerAfter(trigger: number | ICalDateTimeValue | null): this;
    /**
     * Get the trigger time for the alarm. Can either
     * be a date and time value ([[`ICalDateTimeValue`]]) or
     * a number, which will represent the seconds between
     * alarm and event start. The number is negative, if the
     * alarm is triggered after the event started.
     *
     * @since 0.2.1
     * @alias trigger
     */
    triggerBefore(trigger: number | ICalDateTimeValue | null): this;
    /**
     * Use this method to set the alarm time.
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     * const alarm = cal.createAlarm();
     *
     * alarm.trigger(600); // -> 10 minutes before event starts
     * alarm.trigger(new Date()); // -> now
     * ```
     *
     * You can use any supported date object, see
     * [readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones)
     * for details about supported values and timezone handling.
     *
     * @since 0.2.1
     * @alias trigger
     */
    triggerBefore(): number | ICalDateTimeValue | null;
    /**
     * Get Alarm Repetitions
     * @since 0.2.1
     */
    repeat(): number | null;
    /**
     * Set Alarm Repetitions. Use this to repeat the alarm.
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     *
     * // repeat the alarm 4 times every 5 minutes…
     * cal.createAlarm({
     *     repeat: 4,
     *     interval: 300
     * });
     * ```
     *
     * @since 0.2.1
     */
    repeat(repeat: number | null): this;
    /**
     * Get Repeat Interval
     * @since 0.2.1
     */
    interval(interval: number | null): this;
    /**
     * Set Repeat Interval
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     *
     * // repeat the alarm 4 times every 5 minutes…
     * cal.createAlarm({
     *     repeat: 4,
     *     interval: 300
     * });
     * ```
     *
     * @since 0.2.1
     */
    interval(): number | null;
    /**
     * Get Attachment
     * @since 0.2.1
     */
    attach(): {
        uri: string;
        mime: string | null;
    } | null;
    /**
     * Set Alarm attachment. Used to set the alarm sound
     * if alarm type is audio. Defaults to "Basso".
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     *
     * event.createAlarm({
     *     attach: 'https://example.com/notification.aud'
     * });
     *
     * // OR
     *
     * event.createAlarm({
     *     attach: {
     *         uri: 'https://example.com/notification.aud',
     *         mime: 'audio/basic'
     *     }
     * });
     * ```
     *
     * @since 0.2.1
     */
    attach(attachment: {
        uri: string;
        mime?: string | null;
    } | string | null): this;
    /**
     * Get the alarm description. Used to set the alarm message
     * if alarm type is display. Defaults to the event's summary.
     *
     * @since 0.2.1
     */
    description(): string | null;
    /**
     * Set the alarm description. Used to set the alarm message
     * if alarm type is display. Defaults to the event's summary.
     *
     * @since 0.2.1
     */
    description(description: string | null): this;
    /**
     * Set X-* attributes. Woun't filter double attributes,
     * which are also added by another method (e.g. type),
     * so these attributes may be inserted twice.
     *
     * ```javascript
     * alarm.x([
     *     {
     *         key: "X-MY-CUSTOM-ATTR",
     *         value: "1337!"
     *     }
     * ]);
     *
     * alarm.x([
     *     ["X-MY-CUSTOM-ATTR", "1337!"]
     * ]);
     *
     * alarm.x({
     *     "X-MY-CUSTOM-ATTR": "1337!"
     * });
     * ```
     *
     * @since 1.9.0
     */
    x(keyOrArray: {
        key: string;
        value: string;
    }[] | [string, string][] | Record<string, string>): this;
    /**
     * Set a X-* attribute. Woun't filter double attributes,
     * which are also added by another method (e.g. type),
     * so these attributes may be inserted twice.
     *
     * ```javascript
     * alarm.x("X-MY-CUSTOM-ATTR", "1337!");
     * ```
     *
     * @since 1.9.0
     */
    x(keyOrArray: string, value: string): this;
    /**
     * Get all custom X-* attributes.
     * @since 1.9.0
     */
    x(): {
        key: string;
        value: string;
    }[];
    /**
     * Return a shallow copy of the alarm's options for JSON stringification.
     * Third party objects like moment.js values are stringified as well. Can
     * be used for persistence.
     *
     * @since 0.2.4
     */
    toJSON(): ICalAlarmJSONData;
    /**
     * Return generated event as a string.
     *
     * ```javascript
     * const alarm = event.createAlarm();
     * console.log(alarm.toString()); // → BEGIN:VALARM…
     * ```
     */
    toString(): string;
}

interface ICalCategoryData {
    name?: string | null;
}
interface ICalCategoryInternalData {
    name: string | null;
}
/**
 * Usually you get an `ICalCategory` object like this:
 *
 * ```javascript
 * import ical from 'ical-generator';
 * const calendar = ical();
 * const event = calendar.createEvent();
 * const category = event.createCategory();
 * ```
 *
 * You can also use the [[`ICalCategory`]] object directly:
 *
 * ```javascript
 * import ical, {ICalCategory} from 'ical-generator';
 * const category = new ICalCategory();
 * event.categories([category]);
 * ```
 */
declare class ICalCategory {
    private readonly data;
    /**
     * Constructor of [[`ICalCategory`]].
     * @param data Category Data
     */
    constructor(data: ICalCategoryData);
    /**
     * Get the category name
     * @since 0.3.0
     */
    name(): string | null;
    /**
     * Set the category name
     * @since 0.3.0
     */
    name(name: string | null): this;
    /**
     * Return a shallow copy of the category's options for JSON stringification.
     * Can be used for persistence.
     *
     * @since 0.2.4
     */
    toJSON(): ICalCategoryInternalData;
    /**
     * Return generated category name as a string.
     *
     * ```javascript
     * console.log(category.toString());
     * ```
     */
    toString(): string;
}

declare enum ICalEventStatus {
    CONFIRMED = "CONFIRMED",
    TENTATIVE = "TENTATIVE",
    CANCELLED = "CANCELLED"
}
declare enum ICalEventBusyStatus {
    FREE = "FREE",
    TENTATIVE = "TENTATIVE",
    BUSY = "BUSY",
    OOF = "OOF"
}
declare enum ICalEventTransparency {
    TRANSPARENT = "TRANSPARENT",
    OPAQUE = "OPAQUE"
}
declare enum ICalEventClass {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    CONFIDENTIAL = "CONFIDENTIAL"
}
interface ICalEventData {
    id?: string | number | null;
    sequence?: number;
    start?: ICalDateTimeValue | null;
    end?: ICalDateTimeValue | null;
    recurrenceId?: ICalDateTimeValue | null;
    timezone?: string | null;
    stamp?: ICalDateTimeValue;
    allDay?: boolean;
    floating?: boolean;
    repeating?: ICalRepeatingOptions | ICalRRuleStub | string | null;
    summary?: string;
    location?: ICalLocation | string | null;
    description?: ICalDescription | string | null;
    organizer?: ICalOrganizer | string | null;
    attendees?: ICalAttendee[] | ICalAttendeeData[];
    alarms?: ICalAlarm[] | ICalAlarmData[];
    categories?: ICalCategory[] | ICalCategoryData[];
    status?: ICalEventStatus | null;
    busystatus?: ICalEventBusyStatus | null;
    priority?: number | null;
    url?: string | null;
    attachments?: string[];
    transparency?: ICalEventTransparency | null;
    created?: ICalDateTimeValue | null;
    lastModified?: ICalDateTimeValue | null;
    class?: ICalEventClass | null;
    x?: {
        key: string;
        value: string;
    }[] | [string, string][] | Record<string, string>;
}
interface ICalEventJSONData {
    id: string;
    sequence: number;
    start: string | null;
    end: string | null;
    recurrenceId: string | null;
    timezone: string | null;
    stamp: string;
    allDay: boolean;
    floating: boolean;
    repeating: ICalEventInternalRepeatingData | string | null;
    summary: string;
    location: ICalLocation | null;
    description: ICalDescription | null;
    organizer: ICalOrganizer | null;
    attendees: ICalAttendee[];
    alarms: ICalAlarm[];
    categories: ICalCategory[];
    status: ICalEventStatus | null;
    busystatus: ICalEventBusyStatus | null;
    priority?: number | null;
    url: string | null;
    attachments: string[];
    transparency: ICalEventTransparency | null;
    created: string | null;
    lastModified: string | null;
    x: {
        key: string;
        value: string;
    }[];
}
interface ICalEventInternalRepeatingData {
    freq: ICalEventRepeatingFreq;
    count?: number;
    interval?: number;
    until?: ICalDateTimeValue;
    byDay?: ICalWeekday[];
    byMonth?: number[];
    byMonthDay?: number[];
    bySetPos?: number[];
    exclude?: ICalDateTimeValue[];
    startOfWeek?: ICalWeekday;
}
/**
 * Usually you get an `ICalCalendar` object like this:
 * ```javascript
 * import ical from 'ical-generator';
 * const calendar = ical();
 * const event = calendar.createEvent();
 * ```
 */
declare class ICalEvent {
    private readonly data;
    private readonly calendar;
    /**
     * Constructor of [[`ICalEvent`]. The calendar reference is
     * required to query the calendar's timezone when required.
     *
     * @param data Calendar Event Data
     * @param calendar Reference to ICalCalendar object
     */
    constructor(data: ICalEventData, calendar: ICalCalendar);
    /**
     * Get the event's ID
     * @since 0.2.0
     */
    id(): string;
    /**
     * Use this method to set the event's ID.
     * If not set, a UUID will be generated randomly.
     *
     * @param id Event ID you want to set
     */
    id(id: string | number): this;
    /**
     * Get the event's ID
     * @since 0.2.0
     * @alias id
     */
    uid(): string;
    /**
     * Use this method to set the event's ID.
     * If not set, a UUID will be generated randomly.
     *
     * @param id Event ID you want to set
     * @alias id
     */
    uid(id: string | number): this;
    /**
     * Get the event's SEQUENCE number. Use this method to get the event's
     * revision sequence number of the calendar component within a sequence of revisions.
     *
     * @since 0.2.6
     */
    sequence(): number;
    /**
     * Set the event's SEQUENCE number. For a new event, this should be zero.
     * Each time the organizer  makes a significant revision, the sequence
     * number should be incremented.
     *
     * @param sequence Sequence number or null to unset it
     */
    sequence(sequence: number): this;
    /**
     * Get the event start time which is currently
     * set. Can be any supported date object.
     *
     * @since 0.2.0
     */
    start(): ICalDateTimeValue | null;
    /**
     * Set the appointment date of beginning, which is required for all events.
     * You can use any supported date object, see
     * [Readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones)
     * for details about supported values and timezone handling.
     *
     * @since 0.2.0
     */
    start(start: ICalDateTimeValue): this;
    /**
     * Get the event end time which is currently
     * set. Can be any supported date object.
     *
     * @since 0.2.0
     */
    end(): ICalDateTimeValue | null;
    /**
     * Set the appointment date of end. You can use any supported date object, see
     * [readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones)
     * for details about supported values and timezone handling.
     *
     * @since 0.2.0
     */
    end(end: ICalDateTimeValue | null): this;
    /**
     * Get the event's recurrence id
     * @since 0.2.0
     */
    recurrenceId(): ICalDateTimeValue | null;
    /**
     * Set the event's recurrence id. You can use any supported date object, see
     * [readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones)
     * for details about supported values and timezone handling.
     *
     * @since 0.2.0
     */
    recurrenceId(recurrenceId: ICalDateTimeValue | null): this;
    /**
     * Get the event's timezone.
     * @since 0.2.6
     */
    timezone(): string | null;
    /**
     * Sets the time zone to be used for this event. If a time zone has been
     * defined in both the event and the calendar, the time zone of the event
     * is used.
     *
     * Please note that if the time zone is set, ical-generator assumes
     * that all times are already in the correct time zone. Alternatively,
     * a `moment-timezone` or a Luxon object can be passed with `setZone`,
     * ical-generator will then set the time zone itself.
     *
     * This and the 'floating' flag (see below) are mutually exclusive, and setting a timezone will unset the
     * 'floating' flag.  If neither 'timezone' nor 'floating' are set, the date will be output with in UTC format
     * (see [date-time form #2 in section 3.3.5 of RFC 554](https://tools.ietf.org/html/rfc5545#section-3.3.5)).
     *
     * See [Readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones) for details about
     * supported values and timezone handling.
     *
     * ```javascript
     * event.timezone('America/New_York');
     * ```
     *
     * @see https://github.com/sebbo2002/ical-generator#-date-time--timezones
     * @since 0.2.6
     */
    timezone(timezone: string | null): this;
    /**
     * Get the event's timestamp
     * @since 0.2.0
     */
    stamp(): ICalDateTimeValue;
    /**
     * Set the appointment date of creation. Defaults to the current time and date (`new Date()`). You can use
     * any supported date object, see [readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones)
     * for details about supported values and timezone handling.
     *
     * @since 0.2.0
     */
    stamp(stamp: ICalDateTimeValue): this;
    /**
     * Get the event's timestamp
     * @since 0.2.0
     * @alias stamp
     */
    timestamp(): ICalDateTimeValue;
    /**
     * Set the appointment date of creation. Defaults to the current time and date (`new Date()`). You can use
     * any supported date object, see [readme](https://github.com/sebbo2002/ical-generator#-date-time--timezones)
     * for details about supported values and timezone handling.
     *
     * @since 0.2.0
     * @alias stamp
     */
    timestamp(stamp: ICalDateTimeValue): this;
    /**
     * Get the event's allDay flag
     * @since 0.2.0
     */
    allDay(): boolean;
    /**
     * Set the event's allDay flag.
     *
     * ```javascript
     * event.allDay(true); // → appointment is for the whole day
     * ```
     *
     * @since 0.2.0
     */
    allDay(allDay: boolean): this;
    /**
     * Get the event's floating flag.
     * @since 0.2.0
     */
    floating(): boolean;
    floating(floating: boolean): this;
    /**
     * Get the event's repeating options
     * @since 0.2.0
     */
    repeating(): ICalEventInternalRepeatingData | ICalRRuleStub | string | null;
    /**
     * Set the event's repeating options by passing an [[`ICalRepeatingOptions`]] object.
     *
     * ```javascript
     * event.repeating({
     *    freq: 'MONTHLY', // required
     *    count: 5,
     *    interval: 2,
     *    until: new Date('Jan 01 2014 00:00:00 UTC'),
     *    byDay: ['su', 'mo'], // repeat only sunday and monday
     *    byMonth: [1, 2], // repeat only in january and february,
     *    byMonthDay: [1, 15], // repeat only on the 1st and 15th
     *    bySetPos: 3, // repeat every 3rd sunday (will take the first element of the byDay array)
     *    exclude: [new Date('Dec 25 2013 00:00:00 UTC')], // exclude these dates
     *    excludeTimezone: 'Europe/Berlin', // timezone of exclude
     *    wkst: 'SU' // Start the week on Sunday, default is Monday
     * });
     * ```
     *
     * @since 0.2.0
     */
    repeating(repeating: ICalRepeatingOptions | null): this;
    /**
     * Set the event's repeating options by passing an [RRule object](https://github.com/jakubroztocil/rrule).
     * @since 2.0.0-develop.5
     */
    repeating(repeating: ICalRRuleStub | null): this;
    /**
     * Set the events repeating options by passing a string which is inserted in the ical file.
     * @since 2.0.0-develop.5
     */
    repeating(repeating: string | null): this;
    /**
     * @internal
     */
    repeating(repeating: ICalRepeatingOptions | ICalRRuleStub | string | null): this;
    /**
     * Get the event's summary
     * @since 0.2.0
     */
    summary(): string;
    /**
     * Set the event's summary.
     * Defaults to an empty string if nothing is set.
     *
     * @since 0.2.0
     */
    summary(summary: string): this;
    /**
     * Get the event's location
     * @since 0.2.0
     */
    location(): ICalLocation | null;
    /**
     * Set the event's location by passing a string (minimum) or
     * an [[`ICalLocation`]] object which will also fill the iCal
     * `GEO` attribute and Apple's `X-APPLE-STRUCTURED-LOCATION`.
     *
     * ```javascript
     * event.location({
     *    title: 'Apple Store Kurfürstendamm',
     *    address: 'Kurfürstendamm 26, 10719 Berlin, Deutschland',
     *    radius: 141.1751386318387,
     *    geo: {
     *        lat: 52.503630,
     *        lon: 13.328650
     *    }
     * });
     * ```
     *
     * @since 0.2.0
     */
    location(location: ICalLocation | string | null): this;
    /**
     * Get the event's description as an [[`ICalDescription`]] object.
     * @since 0.2.0
     */
    description(): ICalDescription | null;
    /**
     * Set the events description by passing a plaintext string or
     * an object containing both a plaintext and a html description.
     * Only a few calendar apps support html descriptions and like in
     * emails, supported HTML tags and styling is limited.
     *
     * ```javascript
     * event.description({
     *     plain: 'Hello World!';
     *     html: '<p>Hello World!</p>';
     * });
     * ```
     *
     * @since 0.2.0
     */
    description(description: ICalDescription | string | null): this;
    /**
     * Get the event's organizer
     * @since 0.2.0
     */
    organizer(): ICalOrganizer | null;
    /**
     * Set the event's organizer
     *
     * ```javascript
     * event.organizer({
     *    name: 'Organizer\'s Name',
     *    email: 'organizer@example.com'
     * });
     *
     * // OR
     *
     * event.organizer('Organizer\'s Name <organizer@example.com>');
     * ```
     *
     * You can also add an explicit `mailto` email address or or the sentBy address.
     *
     * ```javascript
     *     event.organizer({
     *    name: 'Organizer\'s Name',
     *    email: 'organizer@example.com',
     *    mailto: 'explicit@mailto.com',
     *    sentBy: 'substitute@example.com'
     * })
     * ```
     *
     * @since 0.2.0
     */
    organizer(organizer: ICalOrganizer | string | null): this;
    /**
     * Creates a new [[`ICalAttendee`]] and returns it. Use options to prefill
     * the attendee's attributes. Calling this method without options will create
     * an empty attendee.
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     * const attendee = event.createAttendee({email: 'hui@example.com', name: 'Hui'});
     *
     * // add another attendee
     * event.createAttendee('Buh <buh@example.net>');
     * ```
     *
     * As with the organizer, you can also add an explicit `mailto` address.
     *
     * ```javascript
     * event.createAttendee({email: 'hui@example.com', name: 'Hui', mailto: 'another@mailto.com'});
     *
     * // overwrite an attendee's mailto address
     * attendee.mailto('another@mailto.net');
     * ```
     *
     * @since 0.2.0
     */
    createAttendee(data?: ICalAttendee | ICalAttendeeData | string): ICalAttendee;
    /**
     * Get all attendees
     * @since 0.2.0
     */
    attendees(): ICalAttendee[];
    /**
     * Add multiple attendees to your event
     *
     * ```javascript
     * const event = ical().createEvent();
     *
     * cal.attendees([
     *     {email: 'a@example.com', name: 'Person A'},
     *     {email: 'b@example.com', name: 'Person B'}
     * ]);
     *
     * cal.attendees(); // --> [ICalAttendee, ICalAttendee]
     * ```
     *
     * @since 0.2.0
     */
    attendees(attendees: (ICalAttendee | ICalAttendeeData | string)[]): this;
    /**
     * Creates a new [[`ICalAlarm`]] and returns it. Use options to prefill
     * the alarm's attributes. Calling this method without options will create
     * an empty alarm.
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     * const alarm = event.createAlarm({type: ICalAlarmType.display, trigger: 300});
     *
     * // add another alarm
     * event.createAlarm({
     *     type: ICalAlarmType.audio,
     *     trigger: 300, // 5min before event
     * });
     * ```
     *
     * @since 0.2.1
     */
    createAlarm(data?: ICalAlarm | ICalAlarmData): ICalAlarm;
    /**
     * Get all alarms
     * @since 0.2.0
     */
    alarms(): ICalAlarm[];
    /**
     * Add one or multiple alarms
     *
     * ```javascript
     * const event = ical().createEvent();
     *
     * cal.alarms([
     *     {type: ICalAlarmType.display, trigger: 600},
     *     {type: ICalAlarmType.audio, trigger: 300}
     * ]);
     *
     * cal.alarms(); // --> [ICalAlarm, ICalAlarm]
     ```
     *
     * @since 0.2.0
     */
    alarms(alarms: ICalAlarm[] | ICalAlarmData[]): this;
    /**
     * Creates a new [[`ICalCategory`]] and returns it. Use options to prefill the categories' attributes.
     * Calling this method without options will create an empty category.
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     * const category = event.createCategory({name: 'APPOINTMENT'});
     *
     * // add another alarm
     * event.createCategory({
     *     name: 'MEETING'
     * });
     * ```
     *
     * @since 0.3.0
     */
    createCategory(data?: ICalCategory | ICalCategoryData): ICalCategory;
    /**
     * Get all categories
     * @since 0.3.0
     */
    categories(): ICalCategory[];
    /**
     * Add categories to the event or return all selected categories.
     *
     * ```javascript
     * const event = ical().createEvent();
     *
     * cal.categories([
     *     {name: 'APPOINTMENT'},
     *     {name: 'MEETING'}
     * ]);
     *
     * cal.categories(); // --> [ICalCategory, ICalCategory]
     * ```
     *
     * @since 0.3.0
     */
    categories(categories: (ICalCategory | ICalCategoryData)[]): this;
    /**
     * Get the event's status
     * @since 0.2.0
     */
    status(): ICalEventStatus | null;
    /**
     * Set the event's status
     *
     * ```javascript
     * import ical, {ICalEventStatus} from 'ical-generator';
     * event.status(ICalEventStatus.CONFIRMED);
     * ```
     *
     * @since 0.2.0
     */
    status(status: ICalEventStatus | null): this;
    /**
     * Get the event's busy status
     * @since 1.0.2
     */
    busystatus(): ICalEventBusyStatus | null;
    /**
     * Set the event's busy status. Will add the
     * [`X-MICROSOFT-CDO-BUSYSTATUS`](https://docs.microsoft.com/en-us/openspecs/exchange_server_protocols/ms-oxcical/cd68eae7-ed65-4dd3-8ea7-ad585c76c736)
     * attribute to your event.
     *
     * ```javascript
     * import ical, {ICalEventBusyStatus} from 'ical-generator';
     * event.busystatus(ICalEventStatus.BUSY);
     * ```
     *
     * @since 1.0.2
     */
    busystatus(busystatus: ICalEventBusyStatus | null): this;
    /**
     * Get the event's priority. A value of 1 represents
     * the highest priority, 9 the lowest. 0 specifies an undefined
     * priority.
     *
     * @since v2.0.0-develop.7
     */
    priority(): number | null;
    /**
     * Set the event's priority. A value of 1 represents
     * the highest priority, 9 the lowest. 0 specifies an undefined
     * priority.
     *
     * @since v2.0.0-develop.7
     */
    priority(priority: number | null): this;
    /**
     * Get the event's URL
     * @since 0.2.0
     */
    url(): string | null;
    /**
     * Set the event's URL
     * @since 0.2.0
     */
    url(url: string | null): this;
    /**
     * Adds an attachment to the event by adding the file URL to the calendar.
     *
     * `ical-generator` only supports external attachments. File attachments that
     * are directly included in the file are not supported, because otherwise the
     * calendar file could easily become unfavourably large.
     *
     * ```javascript
     * const cal = ical();
     * const event = cal.createEvent();
     * event.createAttachment('https://files.sebbo.net/calendar/attachments/foo');
     * ```
     *
     * @since 3.2.0-develop.1
     */
    createAttachment(url: string): this;
    /**
     * Get all attachment urls
     * @since 3.2.0-develop.1
     */
    attachments(): string[];
    /**
     * Add one or multiple alarms
     *
     * ```javascript
     * const event = ical().createEvent();
     *
     * cal.attachments([
     *     'https://files.sebbo.net/calendar/attachments/foo',
     *     'https://files.sebbo.net/calendar/attachments/bar'
     * ]);
     *
     * cal.attachments(); // --> [string, string]
     ```
     *
     * 3.2.0-develop.1
     */
    attachments(attachments: string[]): this;
    /**
     * Get the event's transparency
     * @since 1.7.3
     */
    transparency(): ICalEventTransparency | null;
    /**
     * Set the event's transparency
     *
     * Set the field to `OPAQUE` if the person or resource is no longer
     * available due to this event. If the calendar entry has no influence
     * on availability, you can set the field to `TRANSPARENT`. This value
     * is mostly used to find out if a person has time on a certain date or
     * not (see `TRANSP` in iCal specification).
     *
     * ```javascript
     * import ical, {ICalEventTransparency} from 'ical-generator';
     * event.transparency(ICalEventTransparency.OPAQUE);
     * ```
     *
     * @since 1.7.3
     */
    transparency(transparency: ICalEventTransparency | null): this;
    /**
     * Get the event's creation date
     * @since 0.3.0
     */
    created(): ICalDateTimeValue | null;
    /**
     * Set the event's creation date
     * @since 0.3.0
     */
    created(created: ICalDateTimeValue | null): this;
    /**
     * Get the event's last modification date
     * @since 0.3.0
     */
    lastModified(): ICalDateTimeValue | null;
    /**
     * Set the event's last modification date
     * @since 0.3.0
     */
    lastModified(lastModified: ICalDateTimeValue | null): this;
    /**
     * Get the event's class
     * @since 2.0.0
     */
    class(): ICalEventClass | null;
    /**
     * Set the event's class
     *
     * ```javascript
     * import ical, { ICalEventClass } from 'ical-generator';
     * event.class(ICalEventClass.PRIVATE);
     * ```
     *
     * @since 2.0.0
     */
    class(class_: ICalEventClass | null): this;
    /**
     * Set X-* attributes. Woun't filter double attributes,
     * which are also added by another method (e.g. summary),
     * so these attributes may be inserted twice.
     *
     * ```javascript
     * event.x([
     *     {
     *         key: "X-MY-CUSTOM-ATTR",
     *         value: "1337!"
     *     }
     * ]);
     *
     * event.x([
     *     ["X-MY-CUSTOM-ATTR", "1337!"]
     * ]);
     *
     * event.x({
     *     "X-MY-CUSTOM-ATTR": "1337!"
     * });
     * ```
     *
     * @since 1.9.0
     */
    x(keyOrArray: {
        key: string;
        value: string;
    }[] | [string, string][] | Record<string, string>): this;
    /**
     * Set a X-* attribute. Woun't filter double attributes,
     * which are also added by another method (e.g. summary),
     * so these attributes may be inserted twice.
     *
     * ```javascript
     * event.x("X-MY-CUSTOM-ATTR", "1337!");
     * ```
     *
     * @since 1.9.0
     */
    x(keyOrArray: string, value: string): this;
    /**
     * Get all custom X-* attributes.
     * @since 1.9.0
     */
    x(): {
        key: string;
        value: string;
    }[];
    /**
     * Return a shallow copy of the events's options for JSON stringification.
     * Third party objects like moment.js values or RRule objects are stringified
     * as well. Can be used for persistence.
     *
     * ```javascript
     * const event = ical().createEvent();
     * const json = JSON.stringify(event);
     *
     * // later: restore event data
     * const calendar = ical().createEvent(JSON.parse(json));
     * ```
     *
     * @since 0.2.4
     */
    toJSON(): ICalEventJSONData;
    /**
     * Return generated event as a string.
     *
     * ```javascript
     * const event = ical().createEvent();
     * console.log(event.toString()); // → BEGIN:VEVENT…
     * ```
     */
    toString(): string;
}

interface ICalCalendarData {
    prodId?: ICalCalendarProdIdData | string;
    method?: ICalCalendarMethod | null;
    name?: string | null;
    description?: string | null;
    timezone?: ICalTimezone | string | null;
    source?: string | null;
    url?: string | null;
    scale?: string | null;
    ttl?: number | ICalMomentDurationStub | null;
    events?: (ICalEvent | ICalEventData)[];
    x?: {
        key: string;
        value: string;
    }[] | [string, string][] | Record<string, string>;
}
interface ICalCalendarJSONData {
    prodId: string;
    method: ICalCalendarMethod | null;
    name: string | null;
    description: string | null;
    timezone: string | null;
    source: string | null;
    url: string | null;
    scale: string | null;
    ttl: number | null;
    events: ICalEventJSONData[];
    x: {
        key: string;
        value: string;
    }[];
}
interface ICalCalendarProdIdData {
    company: string;
    product: string;
    language?: string;
}
declare enum ICalCalendarMethod {
    PUBLISH = "PUBLISH",
    REQUEST = "REQUEST",
    REPLY = "REPLY",
    ADD = "ADD",
    CANCEL = "CANCEL",
    REFRESH = "REFRESH",
    COUNTER = "COUNTER",
    DECLINECOUNTER = "DECLINECOUNTER"
}
/**
 * Usually you get an `ICalCalendar` object like this:
 * ```javascript
 * import ical from 'ical-generator';
 * const calendar = ical();
 * ```
 *
 * But you can also use the constructor directly like this:
 * ```javascript
 * import {ICalCalendar} from 'ical-generator';
 * const calendar = new ICalCalendar();
 * ```
 */
declare class ICalCalendar {
    private readonly data;
    /**
     * You can pass options to setup your calendar or use setters to do this.
     *
     * ```javascript
     *  * import ical from 'ical-generator';
     *
     * // or use require:
     * // const { default: ical } = require('ical-generator');
     *
     *
     * const cal = ical({name: 'my first iCal'});
     *
     * // is the same as
     *
     * const cal = ical().name('my first iCal');
     *
     * // is the same as
     *
     * const cal = ical();
     * cal.name('sebbo.net');
     * ```
     *
     * @param data Calendar data
     */
    constructor(data?: ICalCalendarData);
    /**
     * Get your feed's prodid. Will always return a string.
     * @since 0.2.0
     */
    prodId(): string;
    /**
     * Set your feed's prodid. `prodid` can be either a
     * string like `//sebbo.net//ical-generator//EN` or a
     * valid [[`ICalCalendarProdIdData`]] object. `language`
     * is optional and defaults to `EN`.
     *
     * ```javascript
     * cal.prodId({
     *     company: 'My Company',
     *     product: 'My Product',
     *     language: 'EN' // optional, defaults to EN
     * });
     * ```
     *
     * @since 0.2.0
     */
    prodId(prodId: ICalCalendarProdIdData | string): this;
    /**
     * Get the feed method attribute.
     * See [[`ICalCalendarMethod`]] for possible results.
     *
     * @since 0.2.8
     */
    method(): ICalCalendarMethod | null;
    /**
     * Set the feed method attribute.
     * See [[`ICalCalendarMethod`]] for available options.
     *
     * #### Typescript Example
     * ```typescript
     * import {ICalCalendarMethod} from 'ical-generator';
     * calendar.method(ICalCalendarMethod.PUBLISH);
     * ```
     *
     * @since 0.2.8
     */
    method(method: ICalCalendarMethod | null): this;
    /**
     * Get your feed's name
     * @since 0.2.0
     */
    name(): string | null;
    /**
     * Set your feed's name. Is used to fill `NAME`
     * and `X-WR-CALNAME` in your iCal file.
     *
     * @since 0.2.0
     */
    name(name: string | null): this;
    /**
     * Get your feed's description
     * @since 0.2.7
     */
    description(): string | null;
    /**
     * Set your feed's description
     * @since 0.2.7
     */
    description(description: string | null): this;
    /**
     * Get the current calendar timezone
     * @since 0.2.0
     */
    timezone(): string | null;
    /**
     * Use this method to set your feed's timezone. Is used
     * to fill `TIMEZONE-ID` and `X-WR-TIMEZONE` in your iCal export.
     * Please not that all date values are treaded differently, if
     * a timezone was set. See [[`formatDate`]] for details. If no
     * time zone is specified, all information is output as UTC.
     *
     * ```javascript
     * cal.timezone('America/New_York');
     * ```
     *
     * @see https://github.com/sebbo2002/ical-generator#-date-time--timezones
     * @since 0.2.0
     */
    timezone(timezone: string | null): this;
    /**
     * Sets the time zone to be used in this calendar file for all times of all
     * events. Please note that if the time zone is set, ical-generator assumes
     * that all times are already in the correct time zone. Alternatively, a
     * `moment-timezone` or a Luxon object can be passed with `setZone`,
     * ical-generator will then set the time zone itself.
     *
     * For the best support of time zones, a VTimezone entry in the calendar is
     * recommended, which informs the client about the corresponding time zones
     * (daylight saving time, deviation from UTC, etc.). `ical-generator` itself
     * does not have a time zone database, so an external generator is needed here.
     *
     * A VTimezone generator is a function that takes a time zone as a string and
     * returns a VTimezone component according to the ical standard. For example,
     * ical-timezones can be used for this:
     *
     * ```typescript
     * import ical from 'ical-generator';
     * import {getVtimezoneComponent} from '@touch4it/ical-timezones';
     *
     * const cal = new ICalCalendar();
     * cal.timezone({
     *     name: 'FOO',
     *     generator: getVtimezoneComponent
     * });
     * cal.createEvent({
     *     start: new Date(),
     *     timezone: 'Europe/London'
     * });
     * ```
     *
     * @see https://github.com/sebbo2002/ical-generator#-date-time--timezones
     * @since 2.0.0
     */
    timezone(timezone: ICalTimezone | string | null): this;
    /**
     * Get current value of the `SOURCE` attribute.
     * @since 2.2.0-develop.1
     */
    source(): string | null;
    /**
     * Use this method to set your feed's `SOURCE` attribute.
     * This tells the client where to refresh your feed.
     *
     * ```javascript
     * cal.source('http://example.com/my/original_source.ical');
     * ```
     *
     * @since 2.2.0-develop.1
     */
    source(source: string | null): this;
    /**
     * Get your feed's URL
     * @since 0.2.5
     */
    url(): string | null;
    /**
     * Set your feed's URL
     *
     * ```javascript
     * calendar.url('http://example.com/my/feed.ical');
     * ```
     *
     * @since 0.2.5
     */
    url(url: string | null): this;
    /**
     * Get current value of the `CALSCALE` attribute. It will
     * return `null` if no value was set. The iCal standard
     * specifies this as `GREGORIAN` if no value is present.
     *
     * @since 1.8.0
     */
    scale(): string | null;
    /**
     * Use this method to set your feed's `CALSCALE` attribute. There is no
     * default value for this property and it will not appear in your iCal
     * file unless set. The iCal standard specifies this as `GREGORIAN` if
     * no value is present.
     *
     * ```javascript
     * cal.scale('gregorian');
     * ```
     *
     * @since 1.8.0
     */
    scale(scale: string | null): this;
    /**
     * Get the current ttl duration in seconds
     * @since 0.2.5
     */
    ttl(): number | null;
    /**
     * Use this method to set your feed's time to live
     * (in seconds). Is used to fill `REFRESH-INTERVAL` and
     * `X-PUBLISHED-TTL` in your iCal.
     *
     * ```javascript
     * const cal = ical().ttl(60 * 60 * 24); // 1 day
     * ```
     *
     * You can also pass a moment.js duration object. Zero, null
     * or negative numbers will reset the `ttl` attribute.
     *
     * @since 0.2.5
     */
    ttl(ttl: number | ICalMomentDurationStub | null): this;
    /**
     * Creates a new [[`ICalEvent`]] and returns it. Use options to prefill the event's attributes.
     * Calling this method without options will create an empty event.
     *
     * ```javascript
     * import ical from 'ical-generator';
     *
     * // or use require:
     * // const { default: ical } = require('ical-generator');
     *
     * const cal = ical();
     * const event = cal.createEvent({summary: 'My Event'});
     *
     * // overwrite event summary
     * event.summary('Your Event');
     * ```
     *
     * @since 0.2.0
     */
    createEvent(data: ICalEvent | ICalEventData): ICalEvent;
    /**
     * Returns all events of this calendar.
     *
     * ```javascript
     * const cal = ical();
     *
     * cal.events([
     *     {
     *        start: new Date(),
     *        end: new Date(new Date().getTime() + 3600000),
     *        summary: 'Example Event',
     *        description: 'It works ;)',
     *        url: 'http://sebbo.net/'
     *     }
     * ]);
     *
     * cal.events(); // --> [ICalEvent]
     * ```
     *
     * @since 0.2.0
     */
    events(): ICalEvent[];
    /**
     * Add multiple events to your calendar.
     *
     * ```javascript
     * const cal = ical();
     *
     * cal.events([
     *     {
     *        start: new Date(),
     *        end: new Date(new Date().getTime() + 3600000),
     *        summary: 'Example Event',
     *        description: 'It works ;)',
     *        url: 'http://sebbo.net/'
     *     }
     * ]);
     *
     * cal.events(); // --> [ICalEvent]
     * ```
     *
     * @since 0.2.0
     */
    events(events: (ICalEvent | ICalEventData)[]): this;
    /**
     * Remove all events from the calendar without
     * touching any other data like name or prodId.
     *
     * @since 2.0.0-develop.1
     */
    clear(): this;
    /**
     * Send calendar to the user when using HTTP using the passed `ServerResponse` object.
     * Use second parameter `filename` to change the filename, which defaults to `'calendar.ics'`.
     *
     * @param response HTTP Response object which is used to send the calendar
     * @param [filename = 'calendar.ics'] Filename of the calendar file
     */
    serve(response: ServerResponse, filename?: string): this;
    /**
     * Generates a blob to use for downloads or to generate a download URL.
     * Only supported in browsers supporting the Blob API.
     *
     * @since 1.9.0
     */
    toBlob(): Blob;
    /**
     * Returns a URL to download the ical file. Uses the Blob object internally,
     * so it's only supported in browsers supporting the Blob API.
     *
     * @since 1.9.0
     */
    toURL(): string;
    /**
     * Set X-* attributes. Woun't filter double attributes,
     * which are also added by another method (e.g. busystatus),
     * so these attributes may be inserted twice.
     *
     * ```javascript
     * calendar.x([
     *     {
     *         key: "X-MY-CUSTOM-ATTR",
     *         value: "1337!"
     *     }
     * ]);
     *
     * calendar.x([
     *     ["X-MY-CUSTOM-ATTR", "1337!"]
     * ]);
     *
     * calendar.x({
     *     "X-MY-CUSTOM-ATTR": "1337!"
     * });
     * ```
     *
     * @since 1.9.0
     */
    x(keyOrArray: {
        key: string;
        value: string;
    }[] | [string, string][] | Record<string, string>): this;
    /**
     * Set a X-* attribute. Woun't filter double attributes,
     * which are also added by another method (e.g. busystatus),
     * so these attributes may be inserted twice.
     *
     * ```javascript
     * calendar.x("X-MY-CUSTOM-ATTR", "1337!");
     * ```
     *
     * @since 1.9.0
     */
    x(keyOrArray: string, value: string): this;
    /**
     * Get all custom X-* attributes.
     * @since 1.9.0
     */
    x(): {
        key: string;
        value: string;
    }[];
    /**
     * Return a shallow copy of the calendar's options for JSON stringification.
     * Third party objects like moment.js values or RRule objects are stringified
     * as well. Can be used for persistence.
     *
     * ```javascript
     * const cal = ical();
     * const json = JSON.stringify(cal);
     *
     * // later: restore calendar data
     * cal = ical(JSON.parse(json));
     * ```
     *
     * @since 0.2.4
     */
    toJSON(): ICalCalendarJSONData;
    /**
     * Get the number of events added to your calendar
     */
    length(): number;
    /**
     * Return generated calendar as a string.
     *
     * ```javascript
     * const cal = ical();
     * console.log(cal.toString()); // → BEGIN:VCALENDAR…
     * ```
     */
    toString(): string;
}

/**
 * Converts a valid date/time object supported by this library to a string.
 */
declare function formatDate(timezone: string | null, d: ICalDateTimeValue, dateonly?: boolean, floating?: boolean): string;
/**
 * Converts a valid date/time object supported by this library to a string.
 * For information about this format, see RFC 5545, section 3.3.5
 * https://tools.ietf.org/html/rfc5545#section-3.3.5
 */
declare function formatDateTZ(timezone: string | null, property: string, date: ICalDateTimeValue | Date | string, eventData?: {
    floating?: boolean | null;
    timezone?: string | null;
}): string;
/**
 * Escapes special characters in the given string
 */
declare function escape(str: string | unknown, inQuotes: boolean): string;
/**
 * Trim line length of given string
 */
declare function foldLines(input: string): string;

/**
 * ical-generator entrypoint
 */

/**
 * Create a new, empty calendar and returns it.
 *
 * ```javascript
 * import ical from 'ical-generator';
 *
 * // or use require:
 * // const { default: ical } = require('ical-generator');
 *
 * const cal = ical();
 * ```
 *
 * You can pass options to setup your calendar or use setters to do this.
 *
 * ```javascript
 * import ical from 'ical-generator';
 *
 * // or use require:
 * // const { default: ical } = require('ical-generator');
 * const cal = ical({domain: 'sebbo.net'});
 *
 * // is the same as
 *
 * const cal = ical().domain('sebbo.net');
 *
 * // is the same as
 *
 * const cal = ical();
 * cal.domain('sebbo.net');
 * ```
 *
 * @param data Calendar data
 */
declare function ical(data?: ICalCalendarData): ICalCalendar;

export { ICalAlarm, ICalAlarmData, ICalAlarmJSONData, ICalAlarmType, ICalAlarmTypeValue, ICalAttachment, ICalAttendee, ICalAttendeeData, ICalAttendeeJSONData, ICalAttendeeRole, ICalAttendeeStatus, ICalAttendeeType, ICalCalendar, ICalCalendarData, ICalCalendarJSONData, ICalCalendarMethod, ICalCalendarProdIdData, ICalCategory, ICalCategoryData, ICalDateTimeValue, ICalDayJsStub, ICalDescription, ICalEvent, ICalEventBusyStatus, ICalEventClass, ICalEventData, ICalEventJSONData, ICalEventRepeatingFreq, ICalEventStatus, ICalEventTransparency, ICalGeo, ICalLocation, ICalLuxonDateTimeStub, ICalMomentDurationStub, ICalMomentStub, ICalMomentTimezoneStub, ICalOrganizer, ICalRRuleStub, ICalRepeatingOptions, ICalTimezone, ICalWeekday, ical as default, escape, foldLines, formatDate, formatDateTZ };
