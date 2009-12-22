document.onReady(function() {
  
  // fancy code resize effects
  var roll_code = function() {
    this._timer = null;
    this.scrollLeft = 1;
    if (this.scrollLeft && !this._hovering) {
      this.scrollLeft = 0;
      this._hovering = true;
      
      // block has an offset and a border size
      var offset = ((this.getStyle('paddingLeft')||'0').toFloat() + (this.getStyle('borderLeftWidth')||'0').toFloat()) * 2;
      
      // creating a resizable clone
      var clone = $(this.cloneNode(true))
        .setStyle({
          top:   this.position().y + 'px',
          width: this.offsetWidth - offset + 'px',
          position: 'absolute'
        })
        .insertTo(this, 'before')
        .morph({width: this.offsetWidth + $('sidebar').offsetWidth - offset + 'px'});
      
      
      var rollback = function() {
        clone.morph({width: this.offsetWidth - offset + 'px'}, {
          onFinish: function() {
            clone.remove();
            this._hovering = false;
          }.bind(this)
        });
      }.bind(this);
      
      window.on('blur', function() { rollback(); this.stopObserving('blur', rollback);});
      
      clone.onMouseout(function(event) {
        var dims = this.dimensions();
        if (event.pageX < dims.left || event.pageX > (dims.left + dims.width - offset/2) ||
            event.pageY < dims.top  || event.pageY > (dims.top + dims.height - offset/2))
          rollback();
      })
    }
  };
  
  
  $$('code').each(function(block) {
    block
      .onMouseover(function() { this._timer = roll_code.bind(this).delay(40); })
      .onMouseout(function() { if (this._timer) this._timer.cancel(); })
  });
})