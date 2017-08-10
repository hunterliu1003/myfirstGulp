(function($) {
  $.fn.slideshow = function(opts) {
    let config = $.extend({}, {
      imgPerPage: 4,
      border: 5,
      width: 500,
      index: 0,
      selectBorder: true,
      slideSpeed: 150,
      imgs: [],
      prevSlideshow: null,
      nextSlideshow: null,
      imgOnClick: null,
      slideTo: null,
      onSlide: null
    }, opts);

    function Slideshow() {
      this.index = config.index;
      this.slideshowLength = config.imgs.length;
      this.slideshowWidth = config.width;
    }

    Slideshow.prototype = {
      init: function(obj) {
        let _this = this;
        this.$obj = obj;
        let HTML = '';
        for (let i = 0; i < this.slideshowLength; i++) {
          HTML += `
            <li class="js-slideshow-item">
              <img class="js-slideshow-item-img slideshow-item-img" src="${config.imgs[i].url}" alt="${config.imgs[i].name}" data-id="${i}">
            </li>
          `;
        };
        this.$obj.find('.js-slideshow-list').append(HTML);
        this.$obj.css({
          'width': config.width + 'px',
          'margin': '0 auto',
          'overflow': 'hidden'
        });
        this.$obj.find($('.js-slideshow-item-img')).css({
          'width': '100%',
          'display': 'block'
        });
        this.$obj.find('.js-slideshow-list').css({
          'width': config.width / config.imgPerPage * config.imgs.length + 'px'
        });
        this.$obj.find('.js-slideshow-item').css({
          'width': (config.width / config.imgPerPage - 2 * config.border) + 'px',
          'padding': config.border
        });
        if (config.index > 0) {
          this.index = config.index;
          _this.slideTo(this.index);
        };
        this.$obj.find('.js-slideshow-prev').click(function(e) {
          e.preventDefault();
          _this.prevSlideshow();
        });
        this.$obj.find('.js-slideshow-next').click(function(e) {
          e.preventDefault();
          _this.nextSlideshow();
        });
        this.$obj.find('.js-slideshow-item-img').click(function() {
          _this.imgOnClick(this);
        });
      },
      imgOnClick: function($this) {
        if (typeof config.imgOnClick === 'function') {
          config.imgOnClick();
        } else {
          this.index = parseInt($this.getAttribute('data-id'));
          this.slideTo(this.index);
        }
      },
      prevSlideshow: function() {
        if (typeof config.prevSlideshow === 'function') {
          config.prevSlideshow();
        } else {
          if (this.getPage(this.index) !== 0) {
            this.index = (this.getPage(this.index) - 1) * config.imgPerPage;
            this.slideTo(this.index);
          } else {
            if (this.index !== 0) {
              this.index = 0;
              this.slideTo(this.index);
            } else {
              this.index = this.slideshowLength - config.imgPerPage;
              this.slideTo(this.index);
            }
          }
        }
      },
      nextSlideshow: function() {
        if (typeof config.nextSlideshow === 'function') {
          config.nextSlideshow();
        } else {
          if (this.index >= this.slideshowLength - config.imgPerPage) {
            this.index = 0;
            this.slideTo(this.index);
          } else {
            this.index = (this.getPage(this.index) + 1) * config.imgPerPage;
            this.slideTo(this.index);
          }
        }
      },
      slideTo: function(index) {
        let self = this;
        if (typeof config.slideTo === 'function') {
          config.slideTo();
        } else {
          if (config.selectBorder) {
            this.$obj.find('.active').removeClass('active');
            this.$obj.find('.js-slideshow-item').eq(index).addClass('active');
            this.$obj.find('.js-slideshow-item').eq(index).addClass('active');
          }
          if (index > this.slideshowLength - config.imgPerPage) {
            this.$obj.find('.js-slideshow-list').animate({ 'left': -this.slideshowWidth / config.imgPerPage * (this.slideshowLength - config.imgPerPage) + 'px' }, config.slideSpeed)
              .promise().done(function() {
                if (typeof config.onSlide === 'function') {
                  config.onSlide.call(self, self.index);
                }
              });
          } else if (this.getPage(index) === this.getPage(this.slideshowLength) - 1) {
            this.$obj.find('.js-slideshow-list').animate({ 'left': -this.slideshowWidth / config.imgPerPage * index + 'px' }, config.slideSpeed)
              .promise().done(function() {
                if (typeof config.onSlide === 'function') {
                  config.onSlide.call(self, self.index);
                }
              });
          } else {
            this.$obj.find('.js-slideshow-list').animate({ 'left': -this.slideshowWidth * this.getPage(index) + 'px' }, config.slideSpeed)
              .promise().done(function() {
                if (typeof config.onSlide === 'function') {
                  config.onSlide.call(self, self.index);
                }
              });
          }
        }
      },
      getPage: function(index) {
        return Math.floor(index / config.imgPerPage);
      }
    }

    return this.each(function() {
      let $target = $(this),
        instance = $target.data('slideshow');
      if (!instance) {
        instance = new Slideshow();
        instance.init($target);
        $target.data('slideshow', instance);
      }
      return instance;
    });
  };

})(jQuery);

var imgSlider, thumbnailSlider;

$('.js-module-slideshow').slideshow({
  imgPerPage: 1,
  border: 5,
  index: 1,
  width: 500,
  selectBorder: true,
  slideSpeed: 150,
  onSlide: function(index) {
    if (thumbnailSlider.index !== imgSlider.index) {
      thumbnailSlider.slideTo(index);
      thumbnailSlider.index = index;
    }
  },
  imgs: [{
      id: 0,
      url: "http://placehold.it/500/CADBE9/4F86C6?text=0",
      name: 'Slide Image 0'
    },
    {
      id: 1,
      url: "http://placehold.it/500/CADBE9/4F86C6?text=1",
      name: 'Slide Image 1'
    },
    {
      id: 2,
      url: "http://placehold.it/500/CADBE9/4F86C6?text=2",
      name: 'Slide Image 2'
    },
    {
      id: 3,
      url: "http://placehold.it/500/CADBE9/4F86C6?text=3",
      name: 'Slide Image 3'
    },
    {
      id: 4,
      url: "http://placehold.it/500/CADBE9/4F86C6?text=4",
      name: 'Slide Image 4'
    },
    {
      id: 5,
      url: "http://placehold.it/500/CADBE9/4F86C6?text=5",
      name: 'Slide Image 5'
    },
    {
      id: 6,
      url: "http://placehold.it/500/CADBE9/4F86C6?text=6",
      name: 'Slide Image 6'
    },
    {
      id: 7,
      url: "http://placehold.it/500/CADBE9/4F86C6?text=7",
      name: 'Slide Image 7'
    },
    {
      id: 8,
      url: "http://placehold.it/500/CADBE9/4F86C6?text=8",
      name: 'Slide Image 8'
    },
    {
      id: 9,
      url: "http://placehold.it/500/CADBE9/4F86C6?text=9",
      name: 'Slide Image 9'
    }
  ]
});

$('.js-module-slideshow2').slideshow({
  imgPerPage: 3,
  border: 5,
  index: 0,
  width: 500,
  selectBorder: true,
  slideSpeed: 100,
  onSlide: function(index) {
    if (thumbnailSlider.index !== imgSlider.index) {
      imgSlider.slideTo(index);
      imgSlider.index = index;
    }
  },
  imgs: [{
      id: 0,
      url: "http://placehold.it/400/CADBE9/4F86C6?text=0",
      name: 'Slide Image 0'
    },
    {
      id: 1,
      url: "http://placehold.it/400/CADBE9/4F86C6?text=1",
      name: 'Slide Image 1'
    },
    {
      id: 2,
      url: "http://placehold.it/400/CADBE9/4F86C6?text=2",
      name: 'Slide Image 2'
    },
    {
      id: 3,
      url: "http://placehold.it/400/CADBE9/4F86C6?text=3",
      name: 'Slide Image 3'
    },
    {
      id: 4,
      url: "http://placehold.it/400/CADBE9/4F86C6?text=4",
      name: 'Slide Image 4'
    },
    {
      id: 5,
      url: "http://placehold.it/400/CADBE9/4F86C6?text=5",
      name: 'Slide Image 5'
    },
    {
      id: 6,
      url: "http://placehold.it/400/CADBE9/4F86C6?text=6",
      name: 'Slide Image 6'
    },
    {
      id: 7,
      url: "http://placehold.it/400/CADBE9/4F86C6?text=7",
      name: 'Slide Image 7'
    },
    {
      id: 8,
      url: "http://placehold.it/400/CADBE9/4F86C6?text=8",
      name: 'Slide Image 8'
    },
    {
      id: 9,
      url: "http://placehold.it/400/CADBE9/4F86C6?text=9",
      name: 'Slide Image 9'
    }
  ]
});

imgSlider = $('.js-module-slideshow').data('slideshow');
thumbnailSlider = $('.js-module-slideshow2').data('slideshow');