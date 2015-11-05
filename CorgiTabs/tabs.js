$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data("content-tabs"));
  this.$activeContentTab = this.$contentTabs.find(".active");
  this.$el.on("click", "a", this.clickTab.bind(this));
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};

$.Tabs.prototype.clickTab = function(e) {
    var $newTab = $(e.currentTarget);

    this.$el.find(".active").removeClass();
    this.$activeContentTab.addClass("transitioning");

    this.$activeContentTab.one("transitionend", function (e) {
      this.$activeContentTab.removeClass();
      this.$activeContentTab = this.$contentTabs.find($newTab.attr("href")).addClass("active");
      this.$activeContentTab.addClass("active transitioning");

      setTimeout(function(){
        this.$activeContentTab.removeClass("transitioning");
        $newTab.addClass("active");
      }.bind(this), 0);

    }.bind(this));

};
