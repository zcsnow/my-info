function showMsg() {
    var $msg = $('.msg');
    TweenLite.to($msg, .5, {
      bottom: "0",
      ease: Quint.easeInOut,
      onComplete: function(){
        setTimeout(function(){
          TweenLite.to($msg, .5, {
            bottom: "-100%",
            ease: Quint.easeInOut
          });
        }, 4000);
      }
    });
  };
(function($) {

  var pathname = '';
  if(document.location.pathname == '/') {
    if(location.hostname == 'www.kreativa-studio.hr' || location.hostname == 'kreativa-studio.hr') {
      pathname = 'naslovnica';
    } else {
      pathname = 'home';
    }
  } else {
    pathname = document.location.pathname;
  }

  var headerHeight = 73,
      win = $(window),
      winWidth = win.width(),
      winHeight = win.height(),
      contentHeight = winHeight - headerHeight,
      bottomHeight = 170,
      $jsPage = $('.js-page'),
      $navSwitch = $('.nav-switch'),
      $mobileNav = $('.mobile-nav'),
      hoverState = false,
      baseUrl = $('body').attr('data-url'),
      baseTitle = $('body').attr('data-title'),
      path = document.location.pathname,
      param = [],
      page = $('.nav .active').attr('data-page');
      dataToSave = {
        title: document.title.replace(baseTitle+' - ', ''),
        url: pathname,
        dir: 'top',
        page: page
      },
      opts = {
        lines: 17, // The number of lines to draw
        length: 6, // The length of each line
        width: 2, // The line thickness
        radius: 13, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#525252', // #rgb or #rrggbb
        speed: 2.2, // Rounds per second
        trail: 54, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 100, // The z-index (defaults to 2000000000)
        top: '0', // Top position relative to parent in px
        left: '0' // Left position relative to parent in px
      };
  
  var spinner = new Spinner(opts);
  var caseSpinner = new Spinner(opts);

  var deviceAgent = navigator.userAgent.toLowerCase();

  var isMobile = Modernizr.touch || 
    (deviceAgent.match(/(iphone|ipod|ipad)/) ||
    deviceAgent.match(/(android)/)  || 
    deviceAgent.match(/(iemobile)/) || 
    deviceAgent.match(/iphone/i) || 
    deviceAgent.match(/ipad/i) || 
    deviceAgent.match(/ipod/i) || 
    deviceAgent.match(/blackberry/i) || 
    deviceAgent.match(/bada/i));

  $(function() {

    win.resize(function() {
      winWidth = win.width();
      winHeight = win.height();
      contentHeight = winHeight - headerHeight;

      setSize();
      if( $('.index-view.is-inside').length ) {
        indexInit();
      };
      if( $('.work-view.is-inside').length ) {
        workResize();
        workContentResize();
      };
      if( $('.services-view.is-inside').length ) {
        servicesInit();
      };
      if( $('.about-view.is-inside').length ) {
        aboutInit();
      };
      if( $('.contact-view.is-inside').length ) {
        if( $('.contact-outer').length ) {
          contactInit();
          //showMap();
        }
      };
      if( $('.view-404').length ) {
        notFoundInit();
      };

      if($mobileNav.hasClass('is-switched')) {
        $mobileNav.css('height', contentHeight);
      }

      if(!isMobile) {
        $('.l-content').mCustomScrollbar('update');
      }
    });

    var $initPage = $('.init-page');

    if( $initPage.length ) {
      initPage();
      activateView();
    };

    if( $('.view-404').length ) {
      notFoundInit();
    };

    $(document).on('click', '.js-to-top', function(e){
      if(!isMobile) {
        $('.mCSB_container').animate({
          top: 0
        }, 1000, function() {
          $('.l-content').mCustomScrollbar('update');
        });
      } else {
        $('.l-content').animate({ scrollTop: '0'}, 1000);
      }
      e.preventDefault();
    });

    if( $jsPage.length ) {
      $jsPage.on('click', function(e){
        
        if( !$(this).hasClass('active') ) {
          if( !$('body').hasClass('disable-click') ) {
            
            var url = $(this).attr('href'),
              title = $(this).attr('title'),
              page = $(this).attr('data-page')
              dataToSave = {
                title: title,
                url: url,
                dir: 'top',
                page: page
              };

            $jsPage.removeClass('active');
            $('.js-page[href="'+url+'"]').addClass('active');
            $navSwitch.removeClass('is-active');

            spinnerStart();
            document.title = baseTitle + " - " + title;

            if (Modernizr.history) {
              history.pushState(dataToSave, title, url);
            } else {
              window.location.hash = '#'+url;
            }

            param['0'] = url;
            param['1'] = 'top';
            switchPage(param);
          }
          
          $('body').addClass('disable-click');
        }
        e.preventDefault();
      });
    };

    if( $navSwitch.length ) {
      $navSwitch.on('click', function(e) {
        $(this).toggleClass('is-active');
        if( $mobileNav.hasClass('is-switched') ) {
          TweenLite.to($mobileNav, .5, {
            right: '-230px',
            ease: Quint.easeInOut,
            onComplete: function() {
              $mobileNav.removeClass('is-switched').hide().css('height', 'auto');
            }
          });
        } else {
          $mobileNav.addClass('is-switched').show().css('height', contentHeight);
          TweenLite.to($mobileNav, .5, {
            right: 0,
            ease: Quint.easeInOut
          });
        };
        e.preventDefault();
      });
    };

    $('.mobile-nav .js-page').on('click', function(){
      TweenLite.to($mobileNav, .5, {
        right: '-230px',
        ease: Quint.easeInOut,
        onComplete: function() {
          $mobileNav.removeClass('is-switched').hide().css('height', 'auto');
        }
      });
    });

    $(document).on({
      mouseenter: function () {
        TweenLite.to($(this).find('.js-hover-state'), .2, {
          opacity: "1",
          ease: Linear.easeInOut,
          overwrite: 1
        });
      },
      mouseleave: function () {
        TweenLite.to($(this).find('.js-hover-state'), .2, {
          opacity: "0",
          ease: Linear.easeInOut,
          delay: .2,
          overwrite: 1
        });
      }
    }, '.logo');

    if (Modernizr.history) {
      history.pushState(dataToSave, document.title, path);

      win.on('popstate', function(e){
        if ( e.originalEvent.state ) {
          if( !$('body').hasClass('disable-click') ) {
            if($('.case-study:visible').length) {
              window.history.forward();
              closeCaseStudy();
            } else {
              document.title = baseTitle + " - " + e.originalEvent.state.title;
              $(".nav").find("a").removeClass('active').end();
                
              if(e.originalEvent.state.page == 'work') {
                if(e.originalEvent.state.url == 'home' || e.originalEvent.state.url == 'naslovnica') {
                  $(".nav").find("[data-page='" + e.originalEvent.state.page + "']").addClass('active');
                }
              } else {
                $(".nav").find("[data-page='" + e.originalEvent.state.page + "']").addClass('active');
              }

              param['0'] = e.originalEvent.state.url;
              param['1'] = 'top';

              spinnerStart();
              $('body').addClass('disable-click');
              switchPage(param);
            }
          } else {
            e.preventDefault();
          }
        }
      });
    } else {
      var urlHash = window.location.hash;
      if(urlHash != '') {
        urlHash = urlHash.replace('#', '');
        window.location.href = urlHash;
      };

      win.on('hashchange',function() {
        if( !$('body').hasClass('disable-click') ) {
          urlHash = window.location.hash;

          $(".nav").find("a").removeClass('active');

          param['0'] = urlHash.replace('#', '');
          param['1'] = 'top';

          spinnerStart();
          switchPage(param);
        }
      });
    }  
    
    $(document).on('click', '.js-link', function(e){
      if( !$('body').hasClass('disable-click') ) {
        if( !$(this).hasClass('is-disabled'))  {
            
          var url = $(this).attr('href'),
            title = $(this).attr('title'),
            page = $(this).attr('data-page'),
            css = $(this).attr('class'),
            dataToSave = {
              title: title,
              url: url,
              dir: 'top',
              page: page
            };

          $jsPage.removeClass('active');
          $('.js-page[href="'+url+'"]').addClass('active');

          spinnerStart();
          document.title = baseTitle + " - " + title;
          if (Modernizr.history) {
            
            history.pushState(dataToSave, title, url);
          } else {
            window.location.hash = '#'+url;
          }

          param['0'] = url;
          param['1'] = 'top';
          switchPage(param);

          $('body').addClass('disable-click');
        }
      }
      e.preventDefault();
    });

    

  });
  
  $(document).on('click', '.subnav-switch', function(e){
	e.preventDefault();
	$('.subnav ul').toggleClass('is-open');
	
  });
  
  function initPage() {
    TweenLite.to($('.l-header'), .5, {
      top: 0,
      ease: Quint.easeInOut
    });
    animateTitle();
  };

  function animateTitle() {
    TweenLite.to($('.l-title'), .6, {
      top: 0,
      delay: .1,
      ease: Quint.easeInOut,
      onComplete: function() {
        $('body').removeClass('init-page');
      }
    });
    $('.l-view').addClass('is-inside');
    setTimeout(function(){
      articleAnimation();
    }, 300);
  };

  function activateView() {
    $('.l-view.is-inactive').removeClass('is-inactive').addClass('is-active');
    setSize();
    initContent();
    initScrollbar();
  };

  function setSize() {
    $('body, .l-page-content, .l-view')
      .css('width', winWidth)
      .css('height', winHeight);
    $('.is-inside .l-content')
      .css('width', winWidth)
      .css('height', contentHeight);
  }

  function initContent(dir) {
    dir = typeof dir !== 'undefined' ? dir : '';

    $('.logo').removeClass('is-disabled');
    if( $('.index-view.is-inside').length ) {
      indexInit();
    };

    if( $('.services-view.is-inside').length ) {
      servicesInit(dir);
    };

    if( $('.about-view.is-inside').length ) {
      aboutInit(dir);
    };

    if( $('.contact-view.is-inside').length ) {
      contactInit(dir);
    };

    if( $('.work-view.is-inside').length ) {
      workInit(dir);
    };

    var subpageClicked = false;
    if( $('.js-subpage').length && subpageClicked != true ) {
      $(document).on('click', '.js-subpage', function(e){
        e.preventDefault();
        if( !$(this).hasClass('active') ) {
          var linkUrl = $(this).attr('href'),
            linkTitle = $(this).attr('title'),
            dir = $(this).attr('data-dir'),
            page = $(this).attr('data-page');
          if( !$('body').hasClass('disable-click') ) {
            spinnerStart();
            changeSubpage(linkUrl, linkTitle, dir, page);
          }
          $('body').addClass('disable-click');
          subpageClicked = true;
        }
      });
    };

  };

  function initScrollbar() {
    var hiddenTitleWidth = $('.content-title-hidden').width() + 200;
    $('.content-title-hidden').css('margin-left', '-'+hiddenTitleWidth+'px');

    if( $('.mCustomScrollbar').length == 0 ) {
      if(!isMobile) {
        $('.l-content').mCustomScrollbar({
            autoHideScrollbar: true,
            mouseWheelPixels: 375,
            advanced:{
                updateOnContentResize: true
            },
            callbacks:{
              onTotalScroll:function(){
                if( $('.index-view.is-active').length ) {
                  getMoreWorks();
                }
              },
              whileScrolling:function(){ 
                var topPosition = mcs.top,
                    topDistance = -147;
                if(winWidth < 767 || winHeight < 680) {
                  topDistance = 0;
                };
                if(topPosition < topDistance) {
                  $('.l-view.is-active').addClass('fixed-subnav');
                  TweenLite.to($('.is-active .content-title-hidden'), .3, {
                    marginLeft: '0',
                    ease: Quint.easeOut
                  });
                } else {
                  $('.l-view.is-active').removeClass('fixed-subnav');
                  TweenLite.to($('.is-active .content-title-hidden'), .6, {
                    marginLeft: '-'+hiddenTitleWidth+'px'
                  });
                };
              }
            }
        });
      } else {
        $('.l-content').addClass('is-scroll');

        if(winWidth < 767 || winHeight < 680) {
          $('.l-view.is-active').addClass('fixed-subnav');
        } else {
          $('.l-view.is-active').removeClass('fixed-subnav');
        };
        
        $('.l-content').scroll(function(){
          if(winWidth > 767 && winHeight > 680) {
            var topPosition = $('.l-content').scrollTop();
            if(topPosition > 147) {
              $('.l-view.is-active').addClass('fixed-subnav');
              TweenLite.to($('.is-active .content-title-hidden'), .3, {
                marginLeft: '0',
                ease: Quint.easeOut
              });
            } else {
              $('.l-view.is-active').removeClass('fixed-subnav');
              TweenLite.to($('.is-active .content-title-hidden'), .6, {
                marginLeft: '-'+hiddenTitleWidth+'px'
              });
            }
          }

          if( $('.index-view.is-active').length ) {
            var difference = $('.l-bottom').offset().top - $('.l-content').height();
            if(difference <= 20){
              getMoreWorks();
            }
          }
        });
      }

    };
  };

  function spinnerStart() {
    if ( $('#spinner').length ) {
      spinner.spin(document.getElementById('spinner'));
    };
  };

  function spinnerStop() {
    if ( $('#spinner').length ) {
      spinner.stop();
    };
  };
  function subpageInit(bottomHeight) {
    var $activeViewContent = $('.is-inside .content'),
        contentTextHeight = $activeViewContent.height(),
        titleHeight = $('.l-title').height(),
        contentTextMargins = contentHeight - (titleHeight + bottomHeight),
        contentTextMarginTop = contentTextMargins - contentTextHeight;

    if(contentTextMargins > contentTextHeight) {
      $activeViewContent.css('margin-top', contentTextMarginTop);
    } else {
      $activeViewContent.css('margin-top', 'auto');
    };
  };

  function switchPage(param) {
    var currentContentId = $('.l-view').attr('id'),
        paramFirst = param['0'],
        paramSecond = param['1'],
        //ajaxUrl = paramFirst + '/1';
		ajaxUrl = paramFirst;

    hoverState = false;

    if( $('.mCSB_container').length ) {
      var mCSBContainerTop = ($('.mCSB_container').css('top').replace('px', '')) * -1;
      if(mCSBContainerTop > 147) {
        $('.l-subnav').css('position', 'absolute').css('top', mCSBContainerTop);
      }
    } else {
      var topPosition = $('.l-content').scrollTop();
      if(winWidth < 767 || winHeight < 680) {
        $('.l-subnav').css('position', 'absolute').css('top', topPosition);
      } else {
        if(topPosition > 147) {
          $('.l-subnav').css('position', 'absolute').css('top', topPosition);
        }
      }
    };

    $.get(ajaxUrl).done(function(data) {
      $('#content').prepend(data);
      var $activeContent = $('.l-view.is-active'),
        $inactiveContent = $('.l-view.is-inactive');

      $activeContent.addClass('is-outside').removeClass('is-inside');
      $inactiveContent.addClass('is-inside');

      if( $('.is-outside').hasClass('is-light') ) {
        $('.is-outside').css('background', '#141414');
      }
      
      if(paramSecond == 'next') {
        TweenLite.to($activeContent, .8, {
          left: winWidth,
          ease: Quint.easeInOut,
          onComplete: function() {
            $('.l-view').removeClass('fixed-subnav');
            $('.is-outside').remove();
          }
        });
        TweenLite.from($inactiveContent, .8, {
          left: winWidth * -1,
          ease: Quint.easeInOut,
          delay: .2,
          onComplete: function() {
            $('body').removeClass('disable-click');
            initScrollbar();
          }
        });

      } else if(paramSecond == 'prev') {
        TweenLite.to($activeContent, .8, {
          left: winWidth * -1,
          ease: Quint.easeInOut,
          onComplete: function() {
            $('.l-view').removeClass('fixed-subnav');
            $('.is-outside').remove();
          }
        });
        TweenLite.from($inactiveContent, .8, {
          left: winWidth,
          ease: Quint.easeInOut,
          delay: .2,
          onComplete: function() {
            $('body').removeClass('disable-click');
            initScrollbar();
          }
        });
      } else {
        TweenLite.to($activeContent, .8, {
          top: contentHeight,
          ease: Quint.easeInOut,
          onComplete: function() {
            $('.l-view').removeClass('fixed-subnav');
            $('.is-outside').remove();
          }
        });
        TweenLite.from($inactiveContent, .8, {
          top: contentHeight * -1,
          ease: Quint.easeInOut,
          delay: .2,
          onComplete: function() {
            $('body').removeClass('disable-click');
            initScrollbar();
          }
        });
      };

      setSize();
      $inactiveContent.removeClass('is-inactive').addClass('is-active');
      initContent(paramSecond);
      setTimeout( function () {
        articleAnimation(paramSecond);
      }, 500);

    });

  };

  function articleAnimation(dir) {
    dir = typeof dir !== 'undefined' ? dir : 'top';
    var dirCss = '-200px';
    if(dir == 'prev') {
      dirCss = '200px';
    } else {
      dirCss = '-200px';
    }

    if( $('.services-view.is-inside').length || $('.about-view.is-inside').length ) {
      if( !$('.is-inside .content').hasClass('is-animated') ) {
        if( $('.is-inside .articles').length ) {

          var totalP = ($('.is-inside .articles > *').length - 1);
          $('.is-inside .articles > *').each(function(i){
            var $this  = $(this);
            setTimeout( function () {
              
              if(dir == 'top') {
                TweenLite.from($this, .5, {
                  top: dirCss
                });
              } else {
                TweenLite.from($this, .5, {
                  left: dirCss
                });
              }
              TweenLite.to($this, .5, {
                opacity: "1"
              });

            }, i * 20);

          });

        } else {

          var totalP = ($('.is-inside .article > *').length - 1);
          $('.is-inside .article > *').each(function(i){
            var $this  = $(this);
            setTimeout( function () {
              
              if(dir == 'top') {
                TweenLite.from($this, .5, {
                  top: dirCss
                });
              } else {
                TweenLite.from($this, .5, {
                  left: dirCss
                });
              }
              TweenLite.to($this, .5, {
                opacity: "1"
              });

              if ( $('.is-inside .content-nav').length ) {
                if (totalP == i) {
                  if(dir == 'top') {
                    TweenLite.from($('.is-inside .content-nav, .is-inside .mobile-links'), .5, {
                      top: dirCss
                    });
                  } else {
                    TweenLite.from($('.is-inside .content-nav, .is-inside .mobile-links'), .5, {
                      left: dirCss
                    });
                  }
                  TweenLite.to($('.is-inside .content-nav, .is-inside .mobile-links'), .5, {
                    opacity: "1"
                  });
                }
              }

            }, i * 20);

          });

        }
      };
      $('.is-inside .content').addClass('is-animated');
    };

    if( $('.work-view.is-inside').length ) {
      if( !$('.work-view.is-inside .article').hasClass('is-complete') ) {
        var totalP = ($('.is-inside .article p').length - 1),
            $workImg = $('.work-bg img');
        $('.is-inside .article p').each(function(i){
          var $this  = $(this);
          setTimeout( function () {
            
            if(dir == 'top') {
              TweenLite.from($this, .5, {
                top: dirCss
              });
            } else {
              TweenLite.from($this, .5, {
                left: dirCss
              });
            }
            TweenLite.to($this, .5, {
              opacity: "1"
            });

            if (totalP == i) {
              if(dir == 'top') {
                TweenLite.from($('.is-inside .content-bottom'), .5, {
                  bottom: "200px"
                });
              } else {
                TweenLite.from($('.is-inside .content-bottom'), .5, {
                  left: dirCss
                });
              }
              TweenLite.to($('.is-inside .content-bottom'), .5, {
                opacity: "1",
                onComplete: function() {
                  $('.work-view.is-inside .article').addClass('is-complete');
                  imagePreload($workImg);
                }
              });
            }

          }, i * 20);

        });
      }
    };

    if( $('.contact-view.is-inside').length ) {

      if( $('.is-inside .form').length ) {
        var totalFields = ($('.is-inside fieldset').length - 1);
        $('.is-inside fieldset').each(function(i){
          var $this  = $(this);
          setTimeout( function () {
            if(dir == 'top') {
              TweenLite.from($this, .5, {
                top: dirCss
              });
            } else {
              TweenLite.from($this, .5, {
                left: dirCss
              });
            }
            TweenLite.to($this, .5, {
              opacity: "1"
            });
          }, i * 20);
        });

        $('input, textarea').placeholder();
      };

      if( $('.is-inside .contact-outer').hasClass('is-inactive') ){
        var totalLinks = ($('.is-inside .cont-form-links').length - 1);
        $('.is-inside .cont-form-links').each(function(i){
          var $this  = $(this);
          setTimeout( function () {
            
            if(dir == 'top') {
              TweenLite.from($this, .5, {
                top: dirCss
              });
            } else {
              TweenLite.from($this, .5, {
                left: dirCss
              });
            }
            TweenLite.to($this, .5, {
              opacity: "1"
            });

            if (totalLinks == i) {
              if(dir == 'top') {
                TweenLite.from($('.is-inside .contact-data'), .5, {
                  top: dirCss
                });
              } else {
                TweenLite.from($('.is-inside .contact-data'), .5, {
                  left: dirCss
                });
              }
              TweenLite.to($('.is-inside .contact-data'), .5, {
                opacity: "1",
                onComplete: function() {
                  //showMap();
                  $('.h-line').css('visibility', 'visible');
                }
              });
            };
            
          }, i * 20);

        });
      }
    };

  };

  function changeSubpage(linkUrl, linkTitle, dir, page) {
    if(changeSubpage.isLoaded != true) {
      dataToSave = {
        title: linkTitle,
        url: linkUrl,
        dir: dir,
        page: page
      };
      document.title = baseTitle + " - " + linkTitle;
      
      if (Modernizr.history) {
        history.pushState(dataToSave, linkTitle, linkUrl);
      } else {
        window.location.hash = '#'+linkUrl;
      }
      param['0'] = linkUrl;
      param['1'] = dir;
      switchPage(param);
    }
    changeSubpage.isLoaded = true;
  };
function indexInit() {
  
  getFirstWork.isLoaded = false;
  $('.logo').addClass('is-disabled');
  spinnerStart();

  filterWorks();
  indexResize();

  $(document).on('mouseenter mouseleave', '.works-active .active .work', function(e) {
    var $this = $(this),
      $thisMaskBlack = $this.find('.mask-black'),
      $thisImg = $this.find('.img'),
      $thisImage = $this.find('img'),
      $thisMask = $this.find('.mask'),
      $thisH2 = $this.find('h2'),
      $thisWorkLinks = $this.find('.work-links');
    if(winWidth > 799) {
      if(e.type === 'mouseenter') {
        hoverState = true;
        $thisImg.addClass('is-hover');
        $this.css('z-index', highestZindex());
        TweenLite.to($this, .5, {
          height: "410px",
          top: "-55px",
          ease: Quint.easeInOut
        });
        TweenLite.to($('.work-outer.active .mask-black'), .5, {
          opacity: ".6",
          ease: Quint.easeInOut
        });
        TweenLite.to($thisMaskBlack, .5, {
          opacity: "0",
          ease: Quint.easeInOut
        });
        TweenLite.to($thisImg, .5, {
          marginTop: "0",
          ease: Quint.easeInOut
        });
        if (Modernizr.opacity) {
          TweenLite.to($thisMask, .5, {
            opacity: "1",
            ease: Quint.easeInOut
          });
        }
        TweenLite.to($thisH2, .5, {
          bottom: "24px",
          opacity: "1",
          ease: Quint.easeInOut,
          delay: .1,
          overwrite: 1
        });
        TweenLite.to($thisWorkLinks, .5, {
          bottom: "23px",
          opacity: "1",
          ease: Quint.easeInOut,
          delay: .15,
          overwrite: 1,
          onComplete: function() {
            fadeHoverImages($this);
          }
        });

      } else {
        hoverState = false;
        $thisImg.removeClass('is-hover');
        TweenLite.to($this, .4, {
          height: "300px",
          top: "0",
          ease: Quint.easeInOut
        });
        TweenLite.to($('.work-outer.active .mask-black'), .5, {
          opacity: "0",
          ease: Quint.easeInOut
        });
        TweenLite.to($thisImg, .4, {
          marginTop: "-25px",
          ease: Quint.easeInOut
        });
        if (Modernizr.opacity) {
          TweenLite.to($thisMask, .4, {
            opacity: "0",
            ease: Quint.easeInOut
          });
        }
        TweenLite.to($thisH2, .4, {
          bottom: "-80px",
          opacity: "0",
          ease: Quint.easeInOut,
          overwrite: 1
        });
        TweenLite.to($thisWorkLinks, .4, {
          bottom: "-78px",
          opacity: "0",
          ease: Quint.easeInOut,
          overwrite: 1,
          onComplete: function() {
            showFirstImage($this);
          }
        });
      }
    }
  });

  $(document).on('mouseenter mouseleave', '.work-links a', function(e) {
      var $thisLink = $(this),
        $thisLinkHover = $thisLink.find('.js-hover-state'),
        $thisLinkNormal = $thisLink.find('.js-normal-state');
      if(!$thisLink.hasClass('is-disabled')) {
        if(e.type === 'mouseenter') {
          TweenLite.to($thisLinkHover, .2, {
            opacity: "1",
            ease: Linear.easeInOut,
            overwrite: 1
          });
          TweenLite.to($thisLinkNormal, .2, {
            opacity: "0",
            ease: Linear.easeInOut,
            delay: .2,
            overwrite: 1
          });
        } else {
          TweenLite.to($thisLinkHover, .2, {
            opacity: "0",
            ease: Linear.easeInOut,
            delay: .2,
            overwrite: 1
          });
          TweenLite.to($thisLinkNormal, .2, {
            opacity: "1",
            ease: Linear.easeInOut,
            overwrite: 1
          });
        }
      }
  });

  /*$(document).on('click', '.js-work', function(e){
    var $this = $(this),
        workUrl = $this.attr('href'),
        workTitle = $this.attr('data-title');
        
    getFirstWork(workUrl, workTitle);
    $('body').addClass('disable-click');
    e.preventDefault();
  });*/

};

function fadeHoverImages(work) {
  var $workImg = work.find('.img'),
    $workImage = work.find('img');

  if($workImg.hasClass('is-hover')) {
    if($workImage.length > 1) {
      var $visibleImg = $workImage.first(),
        $nextImg = $visibleImg.next(),
        nextImgSrc = $nextImg.attr('data-src');

      $('<img>').attr('src', nextImgSrc).load(function() {
        $nextImg.attr('src', nextImgSrc).css('display', 'block').animate({
          'opacity': '1'
        }, 450, function(){
          $visibleImg.css('opacity', '0').attr('data-src', $visibleImg.attr('src')).appendTo($workImg);
          setTimeout(function() {
            fadeHoverImages(work);
          }, 300);
        });
      });
      
    }
  }
};

function showFirstImage(work) {
  var $workImg = work.find('.img'),
    $workImage = work.find('img'),
    $workImageFirst = work.find('.is-first'),
    $workImageFirstChild = $workImage.first();
  if(!$workImageFirstChild.hasClass('is-first')) {
    setTimeout(function() {
      $workImageFirstChild.animate({
        'opacity': '0'
      }, 450);
      $workImageFirst.prependTo($workImg).css('opacity', '1');
    }, 200);
  }
};

function indexResize() {
  var count = $('.work-outer').length,
      countActive = $('.work-outer.active').length,
      titleHeight = $('.l-title').height(),
      worksContentHeight = winHeight - titleHeight - 96,
      workColls = Math.floor(winWidth / 400),
      workRows = Math.ceil(worksContentHeight / 300);

  if(workColls == 0){
    workColls = 1;
  }
  var total = workColls * workRows;
  
  if(count > total) {
    if(total > countActive){
      total = total - countActive;
      fadeWorks(total);
    } else {
      spinnerStop();
    }  
  } else {
    fadeWorks(count);
  }
  setColumns();
};

function fadeWorks(total) {
  if( $('.index-view.is-active').length ) {
    var href = $('#workFilter').find('.active').attr('href').replace('#', ''),
        $workOuterHide = $('.work-outer.hide'),
        hideCount = $workOuterHide.length;

    $workOuterHide.each(function(i) {

      var $this = $(this),
          cat = $this.data('cat'),
          opacityVal = '0',
          itemClass = 'active';

      if(hoverState == true && href == 'all') {
        opacityVal = ".6";
      };

      if(href != 'all') {
        if(href == cat) {
          opacityVal = "0";
          itemClass = 'active';
        } else {
          opacityVal = ".9";
          itemClass = 'inactive';
        }
      };

      if(i < total){
        $this.removeClass('hide')
        setTimeout(function(){
          TweenLite.to($this.find('.mask-black'), .4, {
            opacity: opacityVal,
            delay: .5,
            ease: Quint.easeInOut,
            onComplete: function() {
              
              $this.addClass(itemClass);

              if(i == (total-1)){
                spinnerStop();
                $('#works').addClass('works-active');
              };
            }
          });
        }, i * 100);
      };
    });

    if($('.work-outer.hide').length == 0){
      $('.has-more').css('display','none');
      $('.no-more').css('display','inline-block');
      spinnerStop();
    } else {
      $('.has-more').css('display','inline');
      $('.no-more').css('display','none');
    };
  };
};

function highestZindex() {
  var array = [],
      indexHighest;
  $(".work").each(function() {
    array.push($(this).css("z-index"));
    indexHighest = Math.max.apply(Math, array);
    indexHighest = indexHighest + 1;
  });
  return indexHighest;
};

function setColumns() {
  var workColls = Math.floor(winWidth / 400)
      itemWidth = Math.floor(winWidth / workColls);
  $('.work-outer').css('width', itemWidth+'px');
};

function filterWorks() {
  $(document).on('click', '#workFilter a', function(e){
    
    var $active = $(e.target),
        href = $(e.target).attr('href').replace('#', '');

    $('#workFilter a').removeClass('active');
    $active.addClass('active');

    TweenLite.to($('.work-list .mask-black'), .5, {
      opacity: 0,
      ease: Quint.easeInOut
    });

    $('.work-outer.inactive').removeClass('inactive').addClass('active');
    
    if(href != 'all') {
      $('#works').find("li[data-cat!='" + href + "']").each(function() {
        $(this).addClass("inactive").removeClass('active');

        TweenLite.to($(this).find('.mask-black'), .5, {
          opacity: ".9",
          ease: Quint.easeInOut
        });
      });
    };

    e.preventDefault();

  });
};

function getMoreWorks() {
  var winWidth = win.width(),
      workColls = Math.floor(winWidth / 400);

  if(workColls == 0){
    workColls = 1;
  }
  var total = workColls * 2;

  spinnerStart();
  fadeWorks(total);
};

function getFirstWork(workUrl, workTitle) {
  if(getFirstWork.isLoaded != true) {
    spinnerStart();
    dataToSave = {
      title: workTitle,
      url: workUrl,
      dir: 'next',
      page: 'work'
    };

    $jsPage.removeClass('active');
    
    document.title = baseTitle + " - " + workTitle;
    if (Modernizr.history) {
      history.pushState(dataToSave, workTitle, workUrl);
    } else {
      window.location.hash = '#'+workUrl;
    }
    param['0'] = workUrl;
    param['1'] = 'top';
    switchPage(param);
  };
  getFirstWork.isLoaded = true;
}
;
  function servicesInit(dir) {
    dir = typeof dir !== 'undefined' ? dir : '';
    if(winWidth > 767) {
      bottomHeight = 110;
    } else {
      bottomHeight = 0;
    }

    changeSubpage.isLoaded = false;
    subpageInit(bottomHeight);
  };
  function aboutInit(dir) {
    dir = typeof dir !== 'undefined' ? dir : '';
    bottomHeight = 0;

    changeSubpage.isLoaded = false;
    subpageInit(bottomHeight);
  };
  function contactInit() {
    var subpageTitleHeight = $('.l-title').height(),
        contactOuter = contentHeight - subpageTitleHeight,
        contactContentHeight = $('.contact-content').height(),
        contactDataHeight = $('.contact-data').height();
    openForm.isLoaded = false;
    closeForm.isLoaded = false;

    // ovo je samo za prikaz poruke nakon slanja forme
    // $('button[type="submit"]').on('click', function(e){
      // showMsg();
      // e.preventDefault();
    // });

    if (contactOuter > contactContentHeight) {
      $('.contact-outer').css('height', contactOuter).addClass('is-fixed-data');
      $('.cont-form-links-outer').css('padding-bottom', contactDataHeight);
    } else {
      $('.contact-outer').css('height', contactContentHeight).removeClass('is-fixed-data');
      $('.cont-form-links-outer').css('padding-bottom', '0');
    };

    if ($('.js-label').length) {
      $('.js-label').on('click', function(){
        setupLabel();
      });
      setupLabel();
    };

    if ($('.cont-form-bg').length) {
      $('.cont-form-bg').css('width', winWidth);
    };

    $('#sections').focus(function() {
      $(".l-content").mCustomScrollbar("scrollTo","#requests");
    });

    $(document).on('click', '.cont-form-links', function(e){
      var linkUrl = $(this).attr('href'),
        linkTitle = $(this).attr('title');

      openForm(linkUrl, linkTitle);

      e.preventDefault();
    });

    $(document).on('click', '.js-close-contact', function(e){
    $('.formError').hide();
      var linkUrl = $(this).attr('href'),
        linkTitle = $(this).attr('title');

      closeForm(linkUrl, linkTitle);

      e.preventDefault();
    });

  };

  function openForm(linkUrl, linkTitle) {
    if(openForm.isLoaded != true) {
      dataToSave = {
        title: linkTitle,
        url: linkUrl,
        dir: 'top',
        page: 'contact'
      };

      $jsPage.removeClass('active');
      document.title = baseTitle + " - " + linkTitle;
      if (Modernizr.history) {
        history.pushState(dataToSave, linkTitle, linkUrl);
      } else {
        window.location.hash = '#'+linkUrl;
      }
      spinnerStart();
      $('body').addClass('disable-click');

      param['0'] = linkUrl;
      param['1'] = 'prev';
      switchPage(param);
    }
    openForm.isLoaded = true;
  };

  function closeForm(linkUrl, linkTitle) {
    if(closeForm.isLoaded != true) {
      dataToSave = {
        title: linkTitle,
        url: linkUrl,
        dir: 'top',
        page: 'contact'
      };

      $jsPage.removeClass('active');
      $('.js-page[data-page="contact"]').addClass('active');
      document.title = baseTitle + " - " + linkTitle;
      if (Modernizr.history) {
        history.pushState(dataToSave, linkTitle, linkUrl);
      } else {
        window.location.hash = '#'+linkUrl;
      }
      spinnerStart();
      $('body').addClass('disable-click');

      param['0'] = linkUrl;
      param['1'] = 'next';
      switchPage(param);
    }
    closeForm.isLoaded = true;
  };

  /*function showMap() {
    var myLatlng = new google.maps.LatLng(45.484945,16.371265);
    var myOptions = {
      zoom: 16,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      panControl: false,
      //zoomControl: false,
      streetViewControl: false,
      disableDefaultUI: true,
      //zoomControl: false,
      //scaleControl: false,
      scrollwheel: false,
      //disableDoubleClickZoom: true
    }
    var map = new google.maps.Map(document.getElementById("map"), myOptions);
    
    var marker = new google.maps.Marker({
      position: myLatlng, 
      map: map,
      icon: '/static/img/pince.png'
    });

    var styles = [ 
      { "stylers": [
        { "saturation": -100 }, 
        { "lightness": 75 } 
        ] 
      } 
    ];

    map.setOptions({styles: styles});

    google.maps.event.addListenerOnce(map, 'idle', function(){
      $('.contact-outer').removeClass('is-inactive').addClass('is-active');
      setTimeout(function(){
        contactAnimation();
      }, 200);
      setTimeout(function(){
        $('.contact-outer').addClass('is-transparent');
      }, 600);
    });

    
  };*/

  function setupLabel() {
    $('.js-label').each(function(){
      $(this).removeClass('checked');
    });
    $('.js-label input:checked').each(function(){
      $(this).parent('label').addClass('checked');
    });
  };

  function contactAnimation() {
    $(document).on({
      mouseenter: function () {
        TweenLite.to($(this), .5, {
          maxWidth: "100%",
          ease: Quint.easeInOut,
          overwrite: 1
        });
        TweenLite.to($(this).find('.cont-form-bg'), .5, {
          height: "198px",
          marginTop: "-99px",
          ease: Quint.easeInOut,
          overwrite: 1
        });
        TweenLite.to($(this).find('.h-line'), .5, {
          left: "0",
          ease: Quint.easeInOut,
          overwrite: 1
        });
        TweenLite.to($(this).find('h2'), .5, {
          top: "-20px",
          ease: Quint.easeInOut,
          overwrite: 1
        });
        TweenLite.to($(this).find('p'), .5, {
          top: "125px",
          opacity: "1",
          ease: Quint.easeInOut,
          delay: .05,
          overwrite: 1
        });
      },
      mouseleave: function () {
        TweenLite.to($(this), .5, {
          maxWidth: "618px",
          ease: Quint.easeInOut,
          overwrite: 1
        });
        TweenLite.to($(this).find('.cont-form-bg'), .5, {
          height: "0",
          marginTop: "0",
          ease: Quint.easeInOut,
          overwrite: 1
        });
        TweenLite.to($(this).find('.h-line'), .5, {
          left: "41px",
          ease: Quint.easeInOut,
          overwrite: 1
        });
        TweenLite.to($(this).find('h2'), .5, {
          top: "0",
          ease: Quint.easeInOut,
          overwrite: 1
        });
        TweenLite.to($(this).find('p'), .5, {
          top: "175px",
          opacity: "0",
          ease: Quint.easeInOut,
          delay: .05,
          overwrite: 1
        });
      }
    }, '.contact-outer.is-active .cont-form-links');
  };

  
function workInit(dir) {
  dir = typeof dir !== 'undefined' ? dir : '';
  var $workImg = $('.work-bg img'),
    dirCss = '-400px';
  if(dir == 'prev') {
    dirCss = '400px';
  } else {
    dirCss = '-400px';
  }
  
  returnToIndex.isLoaded = false;
  prevWork.isLoaded = false;
  nextWork.isLoaded = false;

  workContentResize();

  $(document).on('click', '#workGrid', function(e){
    var linkUrl = $(this).attr('href'),
      linkTitle = $(this).attr('title');
    if( !$('body').hasClass('disable-click') ) {
      returnToIndex(linkUrl, linkTitle);
      spinnerStart();
    }
    $('body').addClass('disable-click');
    e.preventDefault();
  });

  $(document).on('click', '#workPrev', function(e){
    var linkUrl = $(this).attr('href'),
      linkTitle = $(this).attr('title');
    if( !$(this).hasClass('is-disabled') ) {
      if( !$('body').hasClass('disable-click') ) {
        prevWork(linkUrl, linkTitle);
        spinnerStart();
      }
      $('body').addClass('disable-click');
    } 
    e.preventDefault();
  });

  $(document).on('click', '#workNext', function(e){
    var linkUrl = $(this).attr('href'),
      linkTitle = $(this).attr('title');
    if( !$(this).hasClass('is-disabled') ) {
      if( !$('body').hasClass('disable-click') ) {
        nextWork(linkUrl, linkTitle);
        spinnerStart();
      }
      $('body').addClass('disable-click');
    }
    e.preventDefault();
  });

  
};

$(document).on('click', '.js-open-case-study', function(e){
	e.preventDefault();
    openCaseStudy();
});

$(document).on('click', '.js-close-case-study', function(e){
  e.preventDefault();
  console.log(1);
  closeCaseStudy();
  
});

function loadImg($img) {
  var imgSrc = $img.attr('data-src'),
  imgPreload = $('<img>').attr('src', imgSrc).load(function(){
    $img.attr('src', imgSrc).show();
    TweenLite.to($img, .8, {
      opacity: "1",
      ease: Quint.easeInOut,
      onComplete: function(){
        loadImg($img.next());
        if($('.case-study-scroll img:last-child').css('display') !== 'none') {
          caseSpinner.stop();
        }
      }
    });
  });
}

function openCaseStudy() {
  
  $('.case-study').fadeIn(400, function() {

    caseSpinner.spin(document.getElementById('case-loader'));

    var $img = $('.case-study-scroll img').first();
    loadImg($img);

    if(!isMobile) {
      if(!$('.case-study-scroll').hasClass('mCustomScrollbar')) {
        $('.case-study-scroll').css('height', winHeight).mCustomScrollbar({
          autoHideScrollbar: true,
          mouseWheelPixels: 375,
          advanced:{
            updateOnContentResize: true
          }
        });
      }
    } else {
      $('.case-study-scroll').css('height', winHeight).addClass('is-scroll');
    }
  });
};

function closeCaseStudy() {
  $('.case-study').fadeOut(400);
  caseSpinner.stop();
};

function imageScale($image){
  var imageWidth = $image.attr('width'),
      imageHeight = $image.attr('height'),
      picHeight = imageHeight / imageWidth,
      picWidth = imageWidth / imageHeight;

  $image.parent().css("height", contentHeight);
  if ((contentHeight / winWidth) < picHeight) {
    $image.css("width",winWidth).css("height",picHeight*winWidth);
  } else {
    $image.css("height",contentHeight).css("width",picWidth*contentHeight);
  };
  $image
    .css("margin-left",((winWidth - $image.width())/2))
    .css("margin-top",((contentHeight - $image.height())/2));
};

function imagePreload($image){
  if(winWidth > 767) {
    var imgSrc = $image.attr('data-src'),
    img = $('<img>').attr('src', imgSrc).load(function(){
      $image.attr('src', imgSrc);
      imageScale($image);

      TweenLite.to($image.parent(), .8, {
        opacity: "1",
        ease: Quint.easeInOut,
        overwrite: 1, 
        onComplete: function() {
          $image.addClass('is-loaded');
          $('.work-content').addClass('is-animated');
        }
      });
    });
  } else {
    $('.work-content').addClass('is-animated');
  }
};

function returnToIndex(linkUrl, linkTitle) {
  if(returnToIndex.isLoaded != true) {
    dataToSave = {
      title: linkTitle,
      url: linkUrl,
      dir: 'top',
      page: 'work'
    };

    $jsPage.removeClass('active');
    $('.js-page[data-page="work"]').addClass('active');

    document.title = baseTitle + " - " + linkTitle;
    if (Modernizr.history) {
      history.pushState(dataToSave, linkTitle, linkUrl);
    } else {
      window.location.hash = '#'+linkUrl;
    }
    param['0'] = linkUrl;
    param['1'] = 'top';
    switchPage(param);
  }
  returnToIndex.isLoaded = true;
};

function prevWork(linkUrl, linkTitle) {
  if(prevWork.isLoaded != true) {
    dataToSave = {
      title: linkTitle,
      url: linkUrl,
      dir: 'prev',
      page: 'work'
    };
    document.title = baseTitle + " - " + linkTitle;
    if (Modernizr.history) {
      history.pushState(dataToSave, linkTitle, linkUrl);
    } else {
      window.location.hash = '#'+linkUrl;
    }
    param['0'] = linkUrl;
    param['1'] = 'next';
    switchPage(param);
  }
  prevWork.isLoaded = true;
};

function nextWork(linkUrl, linkTitle) {
  if(nextWork.isLoaded != true) {
    dataToSave = {
      title: linkTitle,
      url: linkUrl,
      dir: 'next',
      page: 'work'
    };
    document.title = baseTitle + " - " + linkTitle;
    if (Modernizr.history) {
      history.pushState(dataToSave, linkTitle, linkUrl);
    } else {
      window.location.hash = '#'+linkUrl;
    }
    param['0'] = linkUrl;
    param['1'] = 'prev';
    switchPage(param);
  }
  nextWork.isLoaded = true;
};

function workResize() {
  var $workImg = $('.work-bg img');
  if(winWidth > 767) {
    if(!$workImg.hasClass('is-loaded')){
      imagePreload($workImg);
    } else {
      imageScale($workImg);
    }
  }

  $('.case-study-scroll').css('height', winHeight)
};

function workContentResize() {
  var workContentHeight = $('.work-content .article').height(),
      workTitleHeight = $('.l-title').height(),
      workNavHeight = $('.content-bottom').height();

  if(winWidth > 767) {
    if(workContentHeight > (contentHeight - (workTitleHeight + workNavHeight) ) ) {
      $('.work-view').addClass('is-fixed-nav');
      $('.content-bottom').css('bottom', '0');
    } else {
      $('.l-content').css('height', 'auto');
      $('.work-view').removeClass('is-fixed-nav');
      
    }
  } else {
    $('.work-view').removeClass('is-fixed-nav');
  };
};
function notFoundInit() {
  $('.view-404, .scroll-404').css('width', winWidth).css('height', winHeight);
  var $image = $('.bg-404 img');

  if (!$('.bg-404').hasClass('is-animated')) {
    notFoundPreload($image);
  } else {
    notFoundScale($image);
  };
};

function notFoundPreload($image) {
  var imgSrc = $image.attr('data-src'),
  img = $('<img>').attr('src', imgSrc).load(function(){
    $image.attr('src', imgSrc);
    notFoundScale($image);

    TweenLite.to($image.parent(), .8, {
      opacity: "1",
      ease: Quint.easeInOut,
      overwrite: 1, 
      onComplete: function() {
        $('.bg-404').addClass('is-animated');
      }
    });

    if(!isMobile) {
      if(!$('.scroll-404').hasClass('mCustomScrollbar')) {
        $('.scroll-404').css('height', winHeight).mCustomScrollbar({
          autoHideScrollbar: true,
          mouseWheelPixels: 375,
          advanced:{
            updateOnContentResize: true
          }
        });
      }
    } else {
      $('.scroll-404').addClass('is-scroll');
    }

    $(document).on('mouseenter mouseleave', '.logo-v', function(e) {
      var $thisLink = $(this),
        $thisLinkHover = $thisLink.find('.icon-logo-v-hover'),
        $thisLinkNormal = $thisLink.find('.icon-logo-v');

      if(e.type === 'mouseenter') {
        TweenLite.to($thisLinkHover, .2, {
          opacity: "1",
          ease: Linear.easeInOut,
          overwrite: 1
        });
        TweenLite.to($thisLinkNormal, .2, {
          opacity: "0",
          ease: Linear.easeInOut,
          delay: .2,
          overwrite: 1
        });
      } else {
        TweenLite.to($thisLinkHover, .2, {
          opacity: "0",
          ease: Linear.easeInOut,
          delay: .2,
          overwrite: 1
        });
        TweenLite.to($thisLinkNormal, .2, {
          opacity: "1",
          ease: Linear.easeInOut,
          overwrite: 1
        });
      }

    });

  });
};

function notFoundScale($image) {
  var imageWidth = $image.width(),
      imageHeight = $image.height(),
      picHeight = imageHeight / imageWidth,
      picWidth = imageWidth / imageHeight;
  $image.parent().css("height", winHeight);
  if ((winHeight / winWidth) < picHeight) {
    $image.css("width",winWidth).css("height",picHeight*winWidth);
  } else {
    $image.css("height",winHeight).css("width",picWidth*winHeight);
  };
  $image
    .css("margin-left",((winWidth - $image.width())/2))
    .css("margin-top",((winHeight - $image.height())/2));
};

$('.js-preview-btn').click(function(e){
	e.preventDefault();
	openCaseStudy();
	//alert(e);
});

})(jQuery);