# Right Calendar Demo
<% content_for :modules, javascript_include_tag('/builds/ui/right-calendar-min.js') %>

There are some standard use cases for the [Calendar](/ui/calendar) widget.
You can use the keyboard buttons like arrows, escape and enter buttons to navigate through the calendars

## On Form Date-Time Picking, :form
<p>
  <label>Simple Date:</label>
  <input type="text" id="date-simple" class="demo-field" />
</p>
<p>
  <label>With Trigger:</label>
  <input type="text" id="date-triggered" class="demo-field" />
  <input type="image" id="date-trigger" src="/images/calendar.png" />
</p>
<p>
  <label>With Time:</label>
  <input type="text" id="date-with-time" class="demo-field" />
</p>
<p>
  <label>With Bottom Buttons:</label>
  <input type="text" id="date-with-buttons" class="demo-field" />
</p>
<p>
  <label>With Fancy Formatting:</label>
  <input type="text" id="date-with-formatting" class="demo-field" />
</p>
<p>
  <label>With Date Limits:</label>
  <input type="text" id="date-with-limits" class="demo-field" />
</p>
<p>
  <label>With Year Buttons</label>
  <input type="text" id="date-with-years" class="demo-field" />
</p>
<p>
  <label>With Time Period Of 15 Minutes:</label>
  <input type="text" id="date-with-15-minutes-period" class="demo-field" />
</p>
<p>
  <label>With Time Period Of 3 Hours:</label>
  <input type="text" id="date-with-3-hours-period" class="demo-field" />
</p>
<script type="text/javascript">
// <![CDATA[
  new Calendar().assignTo('date-simple');
  new Calendar().assignTo('date-triggered', 'date-trigger');
  new Calendar({format: "%Y-%m-%d %H:%M"}).assignTo('date-with-time');
  new Calendar({showButtons: true}).assignTo('date-with-buttons');
  new Calendar({
    format: "%B %d, %Y %l:%M%P"
  }).assignTo('date-with-formatting');
  var min_date = new Date();
  var max_date = new Date();
  min_date.setMonth(min_date.getMonth() - 1);
  max_date.setMonth(max_date.getMonth() + 1);

  new Calendar({
    minDate: min_date, maxDate: max_date
  }).assignTo('date-with-limits');
  
  new Calendar({listYears: true}).assignTo('date-with-years');
  
  new Calendar({
    timePeriod: 15, format: "%Y-%m-%d %H:%M"
  }).assignTo('date-with-15-minutes-period');
  
  new Calendar({
    timePeriod: 180, format: "%Y-%m-%d %H:%M"
  }).assignTo('date-with-3-hours-period');
// ]]>
</script>

The code of the fields initiation looks like this:

    // simple calendars
    new Calendar().assignTo('date-simple');
    new Calendar().assignTo('date-triggered', 'date-trigger');


    // calendar with the time-picker
    new Calendar({format: "%Y-%m-%d %H:%M"}).assignTo('date-with-time');


    // calendar with the bottom buttons
    new Calendar({
      showButtons: true
    }).assignTo('date-with-buttons');


    // calendar with fancy formatting
    new Calendar({format: "%Y-%m-%d %l:%M"}).assignTo('date-with-formatting');


    // calendar with dates limit
    var min_date = new Date();
    var max_date = new Date();
    min_date.setMonth(min_date.getMonth() - 1);
    max_date.setMonth(max_date.getMonth() + 1);

    new Calendar({
      minDate: min_date, maxDate: max_date
    }).assignTo('date-with-limits');


    // with year buttons
    new Calendar({listYears: true}).assignTo('date-with-years');


    // calendar with 15-minute time periods
    new Calendar({
      timePeriod: 15, format: "%Y-%m-%d %H:%M"
    }).assignTo('date-with-15-minutes-period');


    // calendar with 3-hours time periods
    new Calendar({
      timePeriod: 180, format: "%Y-%m-%d %H:%M"
    }).assignTo('date-with-3-hours-period');

## Fields Auto-Discovery, :auto

In simple cases you don't need to assign calendar instances to the input fields manually.
All you need to specify the `rel="calendar"` attribute on your input-text field and
the right calendar will do all the assignments automatically when the page is loaded.


You also can specify an input-trigger pair with the `rel="calendar[input_field_id]"`
attribute on the trigger element.

For example:

    <input type="text" rel="calendar" />
  
    <input type="text" id="input-field" />
    <input type="image" rel="calendar[input-field]" />

<p>
  <label>Simple Date:</label>
  <input type="text" rel="calendar" class="demo-field" />
</p>
<p>
  <label>With Trigger:</label>
  <input type="text" id="input-field" class="demo-field" />
  <input type="image" rel="calendar[input-field]" src="/images/calendar.png" />
</p>

## Inlined Calendars, :inline

You can inline your calendars right onto your page using the `insertTo` method

<p>
  <div id="simple-calendar"></div>
</p>
<p>
  <div id="simple-calendar-with-time"></div>
</p>
<p>
  <div id="simple-calendar-with-buttons"></div>
</p>
<script type="text/javascript">
//<![CDATA[
new Calendar().insertTo('simple-calendar');
new Calendar({showTime: true}).insertTo('simple-calendar-with-time');
new Calendar({showButtons: true}).insertTo('simple-calendar-with-buttons');
//]]>
</script>

You also can build several months calendars and calendar greed by defining the
`numberOfMonths` option

<p>
  <div id="two-calendars"></div>
</p>
<p>
  <div id="calendar-greed"></div>
</p>
<script type="text/javascript">
//<![CDATA[
new Calendar({numberOfMonths: 2}).insertTo('two-calendars');
new Calendar({numberOfMonths: [2,2]}).insertTo('calendar-greed');
//]]>
</script>

