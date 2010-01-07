# RightJS Documentation

Some notes on the documentation organization on the site.

All the files are separated by language in the folders like `en/`, `ru/`.
Inside of every folder all the files and directories repeat the urls structure,
so if you're looking for a page `/goods/drag-n-drop/demo`, you need the file
`en/goods/drag-n-drop/demo.md`

## Formatting

We use a slightly modified [Markdown](http://maruku.rubyforge.org/markdown_syntax.html)
syntax. It's basically the good old Markdown, but with the `erb` features support, so
when you see things like `<%= .... %>`, just leave them alone.

And we use the RDoc style crossreferences like {String#trim} - will be transformed
into a link to the `String` class and its method `trim`

--

This is pretty much it. If you have questions you know how to contact us.






