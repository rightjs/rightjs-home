# In Place Editors Demo
<% content_for :modules, javascript_include_tag('/builds/ui/right-in-edit-min.js') %>

Here are some simple [in-place editor](/ui/in-edit) examples


## Simple case, :simple

<p class="test-case">
  <span id="test-1">Click the 'Edit' link</span>
  <a href="" onclick="$('test-1').inEdit({toggle: this}); return false;">Edit</a>
</p>

## With Textarea, :textarea

<p class="test-case">
  <span id="test-2">Click the 'Edit' link</span>
  <a href="" onclick="$('test-2').inEdit({toggle: this, type: 'textarea'}); return false;">Edit</a>
</p>

## With A Password, :password

<p class="test-case">
  <span id="test-3">That's a secret thing in here</span>
  <a href="" onclick="$('test-3').inEdit({toggle: this, type: 'password'}); return false;">Edit</a>
</p>

<script type="text/javascript">
  $ext(InEdit.Options, {
    url: '/ui/in-edit/response',
    method: 'get'
  });
</script>
<style type="text/css">
  textarea.right-in-edit-field {
    height: 4em;
  }
</style>
