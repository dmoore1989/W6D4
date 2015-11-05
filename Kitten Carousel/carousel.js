$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;

  this.bindEvents();
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};

$.Carousel.prototype.bindEvents = function(){
  $(".slide-left").on("click", this.slide.bind(this, 1));
  $(".slide-right").on("click", this.slide.bind(this, -1));
};



$.Carousel.prototype.slide = function (dir) {
  console.log("Before:", this.activeIdx);
  var $pics = this.$el.find("img");


  // $pics.removeClass();
  if (dir > 0) {
    $($pics[(this.activeIdx + 1) % $pics.length]).addClass("right");
  } else {
    $($pics[(this.activeIdx + $pics.length-1) % $pics.length]).addClass("left");
  }

  this.activeIdx += dir;
  if (this.activeIdx < 0) {
    this.activeIdx += $pics.length;
  } else if (this.activeIdx >= $pics.length) {
    this.activeIdx = this.activeIdx % $pics.length;
  }

  $($pics[this.activeIdx]).addClass("active");
  setTimeout(function () {
    $pics.removeClass("left");
    $pics.removeClass("right");
  }.bind(this), 0);
  console.log("Before:", this.activeIdx);
};
