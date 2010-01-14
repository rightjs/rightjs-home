<% 

@title_text = 'Welcome Home!'

@promo_texts = {
  
  :friendly => {
    :title    => "It's Friendly",
    :subtitle => "Easy to read syntax",
    :text     => %Q{
      <p>
        RightJS is aimed at dynamic languages crowd, as such it does not have all the
        long names and complex class constructions like many other frameworks written
        by Java and C++ developers.
      </p>
      <p>
        On one side RightJS has a really nice and simple, easy to write and read syntax
        that makes it a snap to use and extend even for noobs. An on the other, it 
        supports multiple paradigms, has extensive OOP and FP abilities along with other
        features that will make any tough professional happy.
      </p>
    },
    :more     => "Getting started"
  },
  
  :compact => {
    :title    => "It's Compact",
    :subtitle => "Weights only 30k!",
    :text     => %Q{
      <p>
        RightJS is a really compact framework of just 30k and as the matter of fact it
        already has several plugins backed in. It has everything any serious framework
        should have, dom manipulations handling, native units extensions, basic visual
        effects, extensive OOP abilities, AJAX, additional form features, cookies. You
        name it!
      </p>
      <p>
        And RightJS is not just small by itself, it has a number of small and fast plugins,
        you can add them to the main build, or switch off unnecessary features stripping it
        down to the very skinny 18k core.
      </p>
    },
    :more     => "Custom builds page"
  },
  
  :fast => {
    :title    => "It's Fast",
    :subtitle => "Possibly THE Fastest!",
    :text     => %Q{
      <p>
        RightJS takes the performance issue very seriously, we do lots of regressive
        and performance testing to make sure all methods in the framework work
        just as fast as they possibly can.
      </p>
      <p>
        RightJS reuses all native functionality every browser can provide and it
        doesn't overcomplicate things with too fancy, slow features. As the result,
        RightJS beats up all the modern frameworks in most of the routine operations,
        and in many cases gets really close the pure dom code performance.
      </p>
    },
    :more     => "Benchmarks page"
  }
  
}

@hots_block = {
  :title     => "What's Hot?",
  :ui        => "A collection of useful interfaces and widgets",
  :goods     => "A collection of common use plugins",
  :showcases => "Slick applications/games built with RightJS"
}


-%>
<%= partial 'page' %>
