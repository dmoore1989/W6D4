(function(){
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
  if (this.transitioning){
    return
  }
  this.transitioning = true
  var $pics = this.$el.find("img");
  var nextPicIdx = this.activeIdx + dir;

  debugger
  if (nextPicIdx > $pics.length - 1){
    nextPicIdx = 0;
  } else if (nextPicIdx < 0) {
    nextPicIdx = nextPicIdx + ($pics.length);
  }
  console.log("next:" + nextPicIdx);

    console.log(this.activeIdx);
  var $activePic = $($pics[this.activeIdx]);
  var $nextPic = $($pics[nextPicIdx]);

  // add L/R to the "from" pic
  if (dir === 1) {
    // debugger
    $nextPic.addClass("active right");
    setTimeout(function(){
      $nextPic.removeClass("right");
      $activePic.addClass("left");
    }.bind(this), 0);
  } else {
    $nextPic.addClass("active left");
    setTimeout(function(){
      $nextPic.removeClass("left");
      $activePic.addClass("right");
    }.bind(this), 0);
  }
  $nextPic.one("transitionend",function(){
    $pics.removeClass("left");
    $pics.removeClass("right");
    $pics.removeClass("active");
    $nextPic.addClass("active");
    this.activeIdx = nextPicIdx;
    this.transitioning = false;
  }.bind(this));


  //  else {
  //   $($pics[this.activeIdx]).addClass("right");
  // }

  // $($pics[this.activeIdx]).one("transitionend", function (e) {
  // $($pics[oldActiveIdx]).removeClass();
  // }.bind(this));

  // add L/R to the "to" pic
  // if (dir > 0) {
  //   $($pics[(this.activeIdx + 1) % $pics.length]).addClass("right");
  // } else {
  //   $($pics[(this.activeIdx + $pics.length-1) % $pics.length]).addClass("left");
  // }
  // if()

  // $pics.removeClass("active");
  //
  // // change activeIdx
  //   this.activeIdx += dir;
  //
  // // make inifinte looping of pics
  //   if (this.activeIdx < 0) {
  //     this.activeIdx += $pics.length;
  //   } else if (this.activeIdx >= $pics.length) {
  //     this.activeIdx = this.activeIdx % $pics.length;
  //   }
  //
  //   // add ACTIVE to "to" pic, remove L/R from all pics
  //   setTimeout(function () {
  //   // $pics.removeClass("active");
  //   debugger
  //   $($pics[this.activeIdx]).addClass("active");
  //     $pics.removeClass("left");
  //     $pics.removeClass("right");
  //   }.bind(this), 0);

};
}());
