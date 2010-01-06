# Right Autocompleter Demo

This is a demo page for the [Autocompelter](/ui/autocompleter) feature


## Simple Example, :simple

Pick up some programming language via ajax

<input type="text" id="remote-auto-field" class="demo-field" />
<script type="text/javascript">
  // <![CDATA[
    new Autocompleter('remote-auto-field', {
      url: '/ui/autocompleter/languages/%{search}.js'
    });
  // ]]>
</script>

the code looks like that

    new Autocompleter('remote-auto-field', {
      url: '/ui/autocompleter/languages/%{search}.js'
    });

Same thing locally

<input type="text" id="local-auto-field" class="demo-field" />
<script type="text/javascript">
  // <![CDATA[
    new Autocompleter('local-auto-field', {
      local: <%= PagesController::LANGUAGES.to_json %>
    });
  // ]]>
</script>

the script

    new Autocompleter('local-auto-field', {
      local: <%= PagesController::LANGUAGES.slice(0,4).to_json %>
    });

## Auto-Discovered Fields, :auto

You might have the same result as above with auto discovered fields like this

<input type="text" rel="autocompleter[/ui/autocompleter/languages/%{search}.js]" class="demo-field" />

the script

    <input type="text" rel="autocompleter[/ui/autocompleter/languages/%{search}.js]" />

the same thing with a list of local options

<input type="text" rel="autocompleter<%= PagesController::LANGUAGES.to_json.gsub('"', "'") %>" class="demo-field" />

source code

    <input type="text" rel="autocompleter<%= PagesController::LANGUAGES.slice(0,4).to_json.gsub('"', "'") %>" />

<div style="height: 10em"> </div>