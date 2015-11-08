(function(){
  $.Thumbnails = function (el) {
  this.$el = $(el);
  this.gutterIdx = 0
  this.$active = this.$el.find(".active")
  this.$gutterImages = this.$el.find(".gutter-images")
  this.$images = this.$gutterImages.find("img")
  this.$activeImg = $(this.$gutterImages.children()[0]);
  this.fillGutterImages();
  this.activate(this.$activeImg);
  this.bindEvents();
};

$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};

$.Thumbnails.prototype.activate = function($img){
  this.$active.find("img").remove();
  $cloneImg = $img.clone();
  this.$active.append($cloneImg);
};

$.Thumbnails.prototype.bindEvents = function(){
  this.$gutterImages.on("click","img", this.handleClick.bind(this));
  this.$gutterImages.on("mouseover","img", this.handleHover.bind(this));
  this.$gutterImages.on("mouseleave","img", this.handleEndHover.bind(this));
  this.$el.find(".gutter").on("click",".nav", this.handleArrow.bind(this));

};

$.Thumbnails.prototype.handleClick = function(e){
  this.$activeImg = $(e.currentTarget);
  this.activate(this.$activeImg);
}

$.Thumbnails.prototype.handleHover = function(e){
  this.activate($(e.currentTarget));
}

$.Thumbnails.prototype.handleEndHover = function(e){
  this.activate(this.$activeImg);
}

$.Thumbnails.prototype.handleArrow = function(e){
    if ($(e.currentTarget).hasClass("right")) {
      this.gutterIdx += 1;

    } else {
      this.gutterIdx -= 1;
    }
    this.checkGutterIdx();
    this.fillGutterImages();
  };

$.Thumbnails.prototype.checkGutterIdx = function(){
  if(this.gutterIdx < 0){
    this.gutterIdx = 0
  } else if (this.gutterIdx >= this.$images.length - 5) {
    this.gutterIdx = this.$images.length - 5
  }
};

$.Thumbnails.prototype.fillGutterImages = function(){
  this.$gutterImages.find("img").remove();
  for(var i = 0; i < 5; i++){
    this.$gutterImages.append(this.$images[this.gutterIdx + i])
  };

}

}());
