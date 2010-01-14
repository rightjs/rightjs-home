# Right Calendar

Right Calendar is the standard calendar/datepicker feature for RightJS

<%= partial '/ui/head', :locals => {:name => 'calendar'} %>

<%= anchors_index %>


## Features List, :features

Right Calendar has the following features:

* Dates and times picking
* Multiple months and greed support
* Date limits support
* Inline displaying support
* Auto-appearance at input elements
* Auto-initialization by the `rel="calendar"` attribute
* Tiny (just 10k) size, no image dependencies, fully css-based design
* Everything is included in a single file
* i18n support


## Usage Basics, :usage

The usage of Right Calendar is really simple. Just grab the file above, include it on your page and you
are good to go. Right Calendar does not require any images and all the styles are inlined inside the javascript file

    <script src="/javascripts/right-calendar.js" type="text/javascript"></script>

After that you will have the `Calendar` unit available

    new Calendar({format: 'US'}).insertTo('that-element');
    
    new Calendar({showTime: true}).assignTo('that-input');



## Inputs Auto-Discovery, :discovery

If you like, you can use the auto-initialization feature. Simply specify the `rel="calendar"`
attribute on your `INPUT` element and when the page is loaded the calendar script will automatically find the
element and initialize all the things.

    <input type="text" rel="calendar" />

You also can use the `rel="calendar[input_field_id]"` attribute if you want to use a trigger
element, like an image, that will show the calendar up.

    <input type="text" id="my-input" />
    <img src="calendar.png" rel="calendar[my-input]" />

And you can specify custom options for those inputs with the HTML5 style attribute like this

    <input type="text" rel="calendar" 
      data-calendar-options="{format: 'US'}" />


## Options List, :options

There are several options you can pass into the `Calendar` constructor or use with the auto-discovery feature

Name           | Default    | Description
---------------|------------|-------------------------------------------------------------------
format         | 'ISO'      | one of the predefined formats name or a format string
showTime       | null       | a marker if the time picker should be displayed
twentyFourHour | null       | a marker if the 24 or 12 hours time picker should be used
timePeriod     | 1          | the time picker min time quantity in minutes
showButtons    | false      | a marker if the bottom buttons should be displayed
minDate        | null       | the minimum date you can select
maxDate        | null       | the maximum date you can select
listYears      | false      | show the year switching buttons
firstDay       | 1          | 1 for Monday, 0 for Sunday
numberOfMonths | 1          | a number of month to display, or a \[x,y\] months greed definition
fxName         | 'fade'     | the visual effect name, use `null` if you don't want any fx
fxDuration     | 'short'    | the visual effects duration
relName        | 'calendar' | the rel-attribute name for the auto-discovery feature
checkTags      | '\*'       | the tags name to be checked on load (to narrow down the search)


You also can alter the `Calendar.Options` object to make the changes global.

The `showTime` and `twentyFourHour` options have `null` value by default, which means that those options
will be automatically determined depending on the specified time format option. You also might specify a boolean value to
enforce those options.


## Dates Formatting, :formatting

Right Calendar uses the
[GNU strftime](http://www.gnu.org/software/libc/manual/html%5Fnode/Formatting-Calendar-Time.html#index-strftime-2660)
formatting system and there are the following placeholders available:

Key | Description
----|------------------------------------------------------------------------
%a  | The abbreviated weekday name ('Sun')
%A  | The  full  weekday  name ('Sunday')
%b  | The abbreviated month name ('Jan')
%B  | The  full  month  name ('January')
%d  | Day of the month (01..31)
%e  | Day of the month without leading zero (1..31)
%m  | Month of the year (01..12)
%y  | Year without a century (00..99)
%Y  | Year with century
%H  | Hour of the day, 24-hour clock (00..23)
%k  | Hour of the day, 24-hour clock without leading zero (0..23)
%I  | Hour of the day, 12-hour clock (01..12)
%l  | Hour of the day, 12-hour clock without leading zero (0..12)
%p  | Meridian indicator ('AM'  or  'PM')
%P  | Meridian indicator ('pm'  or  'pm')
%M  | Minute of the hour (00..59)
%S  | Second of the minute (00..59)
%%  | Literal '%' character

There are also few predefined date formats are available:


Name  | Format     | Example
------|------------|--------------------
ISO   | '%Y-%m-%d' | 2009-08-18
POSIX | '%Y/%m/%d' | 2009/08/18
EUR   | '%d-%m-%Y' | 18-08-2009
US    | '%m/%d/%Y' | 08/18/2009


## Events List, :events

Right calendar supports the following list of events

Name   | Description
-------|-------------------------------------------------
show   | the calendar element was shown
hide   | the calendar element was hidden
select | user selects a date or time
done   | user hits the 'done' button

You can use any standard {Observer} methods to process those events. Shortcuts like `onSelect`,
`onDone` are also available.


## API Reference, :api

Right Calendar has a simple interface:

Method                      | Description
----------------------------|----------------------------------------------------------------------
setDate(date)               | sets the date, the date might be a Date instance or a String
getDate()                   | returns the current date
format(\[String format\])   | returns a string representation of the current date
insertTo(element)           | makes the calendar inlined into the element
assignTo(element\[,trigger\]) | assigns the calendar to auto appear at the element; if the trigger is specified a calendar will appear only by clicking on the trigger element
hide()                      | hides the calendar block
show()                      | shows the calendar block
showAt(Element)             | assigns the calendar to work with the element and shows it at the bottom of the element



## Internationalization, :i18n

You might find a translation module for your language at the github repository

<http://github.com/rightjs/rightjs-ui/tree/master/i18n/>

Or you can translate the interface by simply altering the `Calendar.i18n` object like that

    Calendar.i18n = {
      Done:  'Готово',
      Now:   'Сейчас',
      Next:  'Следующий месяц',
      Prev:  'Предыдущий месяц',
      NextYear: 'Следующий год',
      PrevYear: 'Предыдущий год',
  
      dayNames:        $w('Вокскресенье Понедельник Вторник Среда Четверг Пятница Суббота'),
      dayNamesShort:   $w('Вск Пнд Втр Срд Чтв Птн Сбт'),
      dayNamesMin:     $w('Вс Пн Вт Ср Чт Пт Сб'),
      monthNames:      $w('Январь Февраль Март Аперль Май Инюнь Июль Август Сентябрь Октябрь Ноябрь Декабрь'),
      monthNamesShort: $w('Янв Фев Мар Апр Май Инь Иль Авг Сен Окт Ноя Дек')
    };


## Style Alterations, :styles

If you need to alter the calendar view to make it fit your design, please use the following
elements structure description as a guidance.

    <div class="right-calendar">
      <div class="right-ui-button right-calendar-next-button">&lsaquo;</div>
      <div class="right-ui-button right-calendar-prev-button">&rsaquo;</div>

      <table class="right-calendar-greed">
        <tr><td>

          <div class="right-calendar-month">
            <div class="right-calendar-month-caption"></div>
        
            <table>
              <thead>
                <tr>
                  <th>Mo<th>Tu<th>...
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="right-calendar-day-blank">
                  <td class="right-calendar-day-selected">
                  <td class="right-calendar-day-disabled">
                  <td><td><td><td>...
                </tr>
                .....
              </tbody>
            </table>
          </div>

        </td></tr>
      </table>

      <div class="right-calendar-time">
        <select></select> : <select></select>
      </div>

      <div class="right-ui-buttons right-calendar-buttons">
        <input type="button" value="Done" class="right-ui-button right-calendar-done-button" />
        <input type="button" value="Now" class="right-ui-button right-calendar-now-button" />
      </div>
    </div>
