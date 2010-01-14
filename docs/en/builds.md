# Custom Build Creating

You are free to create your own build of RightJS that fits your needs the best.

To create the builds we use [Front Compiler](http://github.com/MadRabbit/frontcompiler),
the most effective javascript compressing library written in Ruby.

## Custom Builder
<%= partial 'form' %>

<div style="font-size: 80%">
  <h2>The Self-Building Feature</h2>
  <p>
    The self-building feature creates a self-building javascript code
    that reconstructs itself on the browser side. It gives additionally about 25-30%
    of compression, but in exchange it takes about 5-100 ms on reconstruction (depends on a browser).
  </p>
  <p>
    In most of the cases of real live applications it is practically invisible for the
    user, but if you are creating an extremely light-weight application and care about the
    user experience you might consider to switch the feature off.
  </p>
</div>

