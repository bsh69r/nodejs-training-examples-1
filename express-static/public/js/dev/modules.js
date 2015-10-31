/* global jQuery, ZeroClipboard  */

(function ($) {
  "use strict";


  ZeroClipboard.config({
    swfPath: "./swf/ZeroClipboard.swf"
  });

  // Module name: Copy to clipboard
  // Dependencies: ZeroClipboard.min.js
  // Docs: https://github.com/zeroclipboard/zeroclipboard
  (function () {
    $(window).load(function () {

      var btns = $('.js-copy-to-clipboard');

      var zc = new ZeroClipboard(btns);

      ZeroClipboard.on("error", function (e) {
        btns.click(function () {
          var btn = $(this),
            doc = document,
            text = btn.parent().find('code')[0],
            range, selection;

          if (text) {
            if (doc.body.createTextRange) {
              range = document.body.createTextRange();
              range.moveToElementText(text);
              range.select();
            } else if (window.getSelection) {
              selection = window.getSelection();
              range = document.createRange();
              range.selectNodeContents(text);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        });
      });

      zc.on("ready", function () {

        zc.on('copy', function (event) {

          var clipboard = event.clipboardData;
          var code = $('code', $(event.target).parent());

          clipboard.setData("text/plain", code.text());
        });


        zc.on('aftercopy', function (event) {
          var btn = $(event.target);
          btn.text('copied');
          setTimeout(function () {
            btn.text('copy');
          }, 700);
        });
      });
    });
  })();

  // Module name: Filetree
  // Dependencies: jquery.treeView.js
  // Docs: https://github.com/samarjeet27/TreeViewJS
  (function () {
    $('.js-file-tree').each(function () {
      var fileTree = $(this);
      var expanded = fileTree.data('expanded');
      fileTree.treeView();

      if (expanded === true) {
        fileTree.treeView('expandAll');
      }

      $('.js-expand', fileTree.parent()).click(function () {
        fileTree.treeView('expandAll');
      });

      $('.js-collapse', fileTree.parent()).click(function () {
        fileTree.treeView('collapseAll');
      });
    });
  })();

  // Module name: Modal
  // Dependencies: jquery.bPopup.js
  // Docs: https://github.com/dinbror/bpopup
  (function () {
    $('.js-open-modal').click(function (event) {
      event.preventDefault();

      var button = $(this),
        target = $(button.data('target')),
        options = button.data('config'),
        defaults = {
          closeClass: 'js-close-modal-button'
        };

      $.extend(defaults, options);

      target.bPopup(defaults);
    });
  })();

  // Module name: Before and After
  // Dependencies: jquery.twentytwenty.js
  // Docs: https://github.com/zurb/twentytwenty
  (function () {
    $('.js-ba').twentytwenty();
  })();

  // Module name: FAQ
  // Dependencies: jquery.fastLiveFilter.js
  // Docs: https://github.com/awbush/jquery-fastLiveFilter
  (function () {
    var faqFilters = $('.js-faq-filter');
    var faqs = $('.js-faq');

    faqFilters.each(function () {
      var faqFilter = $(this);
      var faqFilterInput = faqFilter.find('input');
      var target = faqFilter.data('target');

      if (typeof target !== 'undefined') {
        faqFilterInput.fastLiveFilter(target, {
          selector: $(target).find('.faq-question')
        });
      }

    });

    faqs.each(function () {
      var faq = $(this);
      var questions = faq.find('.faq-question');

      questions.click(function (event) {
        event.preventDefault();

        var question = $(this);
        var scope = question.closest('.faq-item');
        var answer = $('.faq-answer', scope);

        if (answer.hasClass('active')) {
          question.removeClass('active');
          answer.stop().slideUp().removeClass('active');
        } else {
          question.addClass('active');
          answer.stop().slideDown().addClass('active');
        }
      });
    });
  })();

  // Module name: Interactive steps
  // Dependencies: jquery.steps.js
  // Docs: https://github.com/rstaib/jquery-steps
  (function () {
    var steps = $('.js-steps-interactive');

    steps.each(function () {
      var step = $(this);
      var config = {
        headerTag: "h4",
        transitionEffect: "fade",
        labels: {
          current: ''
        }
      };
      var userConfig = step.data('config');

      $.extend(true, config, userConfig);
      steps.steps(config);
    });
  })();

  // Module name: Tabs
  // Dependencies: jquery.steps.js
  // Docs: https://github.com/rstaib/jquery-steps
  (function () {
    var tabsList = $('.js-tabs');

    tabsList.each(function () {
      var tab = $(this);
      var config = {
        headerTag: "h4",
        bodyTag: "div",
        titleTemplate: '#title#',
        transitionEffect: "fade",
        enableFinishButton: false,
        enablePagination: false,
        enableAllSteps: true,
        labels: {
          current: ''
        }
      };
      var userConfig = tab.data('config');

      $.extend(true, config, userConfig);
      tab.steps(config);
    });
  })();

  // Module name: Video
  // Dependencies: jquery.fitvids.js
  // Docs: https://github.com/davatron5000/FitVids.js
  (function () {
    $('body').fitVids();
  })();

  // Module name: Video Advanced
  // Dependencies: jquery.ytv.js
  // Docs: https://github.com/Giorgio003/Youtube-TV
  (function () {
    var vids = $('.js-video-advanced');

    vids.each(function () {
      var vid = $(this);
      var config = {
        apiKey: vid.data('api')
      };
      var userConfig = vid.data('config');
      $.extend(true, config, userConfig);

      vid.ytv(config);

      vid.removeAttr('data-api');
    });

  })();

  // Module name: Menu Mobile
  // Dependencies: jquery.slicknav.js
  // Docs: https://github.com/ComputerWolf/SlickNav
  (function () {
    var menus = $('.js-menu');

    menus.each(function () {
      var menu = $(this);
      var config = {
        label: '',
        prependTo: menu.parent(),
        closedSymbol: '&#xf054',
        openedSymbol: '&#xf078',
        allowParentLinks: true
      };

      var userConfig = menu.data('config');

      $.extend(true, config, userConfig);

      menu.slicknav(config);
      menu.superfish({
        delay: 300,
        autoArrows: false,
        speed: 'fast',
        disableHI: true
      });

      if (menu.hasClass('menu-light')) {
        $('.slicknav_menu').addClass('menu-light');
      }
    });
  })();

  // Module name: Menu Side
  // Dependencies: jquery.sidr.js
  // Docs: https://github.com/artberri/sidr
  (function () {
    $(document).ready(function () {
      var position = 'left';
      var button = $('.js-menu-side');

      if (button.data('position') === 'right') {
        position = 'right';
      }

      button.sidr({
        source: '.js-menu-side-content',
        side: position
      });
    });
  })();

  // Module name: Menu Vertical
  // Dependencies: tendina.min.js
  // Docs: https://github.com/iprignano/tendina
  (function () {
    var menus = $('.js-menu-vertical');
    var menusFixed = $('.js-menu-fixed');

    var updateMenuFixed = function (menu, menuOffset) {
      var topDistance = $(window).scrollTop();
      var sidebarHeight = menu.parent().outerHeight();
      var menuHeight = menu.outerHeight();
      var heightLeft = topDistance - menuOffset + menuHeight;

      if (topDistance > menuOffset && heightLeft <= sidebarHeight) {
        menu.addClass('menu-fixed').removeClass('menu-bottom');
      } else if (topDistance > menuOffset && heightLeft > sidebarHeight) {
        menu.removeClass('menu-fixed').addClass('menu-bottom');
      } else {
        menu.removeClass('menu-fixed menu-bottom');
      }
    };

    menus.each(function () {
      var menu = $(this);
      var menuFixed = menu.closest('.js-menu-fixed');
      var menuOffset = menu.offset().top;

      menu.tendina({
        animate: false,
        activeMenu: '.selected',
        openCallback: function () {
          updateMenuFixed(menuFixed, menuOffset);
        }
      });
    });

    menusFixed.each(function () {
      var menu = $(this);
      var menuOffset = menu.offset().top;

      $(window).scroll(function () {
        if (menu.is(':visible')) {
          updateMenuFixed(menu, menuOffset);
        }
      });
    });

  })();

  // Module name: Search Minimal
  // Dependencies: no dependencies
  (function () {
    var searchIcons = $('.js-search-minimal-icon');

    searchIcons.each(function () {
      var btn = $(this);
      var scope = btn.closest('.js-search-minimal');
      var input = scope.find('.js-search-minimal-input');

      btn.click(function () {
        if (!input.is(':visible')) {
          input.fadeIn('fast');
          $('input', input).focus();
        } else {
          input.fadeOut('fast');
        }
      });
    });
  })();

  // Module name: Scroll Top
  // Dependencies: no dependencies
  (function () {
    var scrollButton = $('.js-scroll-top');

    scrollButton.click(function (e) {
      e.preventDefault();
      $("html, body").animate({scrollTop: "0px"});
    });
  })();

  // Module name: Full Page Section
  // Dependencies: no dependencies
  (function () {
    var elems = $('.js-full-page');
    var height = $(window).height();
    var doit;

    elems.outerHeight(height);

    function resizedw() {
      height = $(window).height();
      elems.outerHeight(height);
    }

    window.onresize = function () {
      clearTimeout(doit);
      doit = setTimeout(resizedw, 100);
    };
  })();

  // Module name: Scroll To
  // Dependencies: no dependencies
  (function () {
    var buttons = $('.js-scroll-to');

    buttons.each(function () {
      var button = $(this);
      var target = button.data('target');

      if (typeof target !== 'undefined' && $(target).length) {
        button.click(function (event) {
          event.preventDefault();

          $('html, body').animate({
            scrollTop: $(target).first().offset().top
          }, 1000);
        });
      }
    });
  })();

  // Module name: Documentation version
  // Dependencies: no dependencies
  (function () {
    var scope = $('.js-docs-version');
    var currentBtn = scope.find('.js-docs-current-version');
    var versionList = scope.find('.js-docs-version-list');

    currentBtn.click(function (e) {
      e.preventDefault();

      if (versionList.is(':visible')) {
        versionList.fadeOut('fast');
      } else {
        versionList.fadeIn('fast');
      }

    });
  })();

  // Module name: Notes
  // Dependencies: no dependencies
  (function () {
    var elems = $('.js-note');

    elems.each(function () {
      var note = $(this);
      var close = note.find('.js-close');
      close.click(function (e) {
        e.preventDefault();
        note.fadeOut();
      });
    });
  })();

  // Module name: Grid View
  // Dependencies: jquery.equalHeight.js
  // Docs: https://github.com/Sam152/Javascript-Equal-Height-Responsive-Rows
  (function () {
    var grid = $('.js-grid-view');
    var elems = grid.find('.js-grid-view-elem');

    elems.responsiveEqualHeightGrid();
  })();

  // Module name: Steps Slider
  // Dependencies: owl.carousel.min.js
  // Docs: https://github.com/smashingboxes/OwlCarousel2
  (function () {
    var slider = $('.js-steps-slider');

    slider.owlCarousel({
      items: 1,
      margin: 5,
      nav: true,
      navText: ['&#xf104;', '&#xf105;'],
      navSpeed: 600,
      dragEndSpeed: 600
    });
  })();

  // Module name: Gif Player
  // Dependencies: jquery.gifplayer.js
  // Docs: https://github.com/rubentd/gifplayer
  (function () {
    var gifs = $('.js-gif-player');

    gifs.gifplayer({
      label: '&#xf04b;'
    });
  })();

  // Module name: Rotator
  // Dependencies: morphext.js
  // Docs: https://github.com/MrSaints/Morphext
  (function () {
    var rotators = $('.js-rotator');

    rotators.Morphext({
      animation: "bounceIn",
      separator: ",",
      speed: 2000
    });
  })();

  // Module name: Notification
  // Dependencies: no dependencies
  (function () {
    var notifications = $('.js-notification');

    notifications.each(function () {
      var elem = $(this);
      var close = elem.find('.js-close');

      close.click(function (e) {
        e.preventDefault();
        elem.slideUp(500);
      });
    });
  })();


  // Module name: Languages
  // Dependencies: no dependencies
  (function () {
    var languages = $('.js-languages');

    languages.each(function () {
      var language = $(this);
      var list = language.find('.js-languages-list');

      language.mouseenter(function () {
        list.stop().fadeIn();
      }).mouseleave(function () {
        list.stop().fadeOut();
      });
    });
  })();

  // Module name: Parallax
  // Dependencies: no dependencies
  (function () {
    var elems = $('.js-parallax');

    elems.each(function () {
      var elem = $(this);
      var height = elem.outerHeight();
      var percent = height * 0.4;

      elem.css('background-size', '120%');

      $(window).scroll(function () {
        var top = $(window).scrollTop();
        var offsetBottom = elem.offset().top + height;
        var scrolledPercents = (top * 100) / height;
        var move = -(percent * scrolledPercents) / 100;


        if (top < offsetBottom) {
          elem.css('background-position', 'center ' + move + "px");
        }

      });
    });
  })();

  // Module name: Animate numbers
  // Dependencies: jquery.animateNumbers.js
  // Docs: https://github.com/talmand/jquery-animate-numbers
  (function () {
    var elems = $('.js-animate-number');
    var animateNumbers = function (elem) {
      if (elem.data('animated') !== true) {
        var scrollTop = $(window).scrollTop() + $(window).outerHeight();
        var elemOffset = elem.offset().top + elem.outerHeight();

        if (scrollTop > elemOffset) {
          elem.data('animated', true);
          elem.animateNumbers(elem.data('number'), false, 2000, "swing");
        }
      }
    };

    elems.each(function () {
      var elem = $(this);
      animateNumbers(elem);

      $(window).scroll(function () {
        animateNumbers(elem);
      });
    });

  })();

  // Module name: Placeholder fix for old browsers
  // Dependencies: jquery.placeholder.js
  // Docs: https://github.com/mathiasbynens/jquery-placeholder
  (function () {
    $('input, textarea').placeholder();
  })();

  // Module name: Info
  // Dependencies: no dependencies
  (function () {
    var infos = $('.js-info');

    infos.each(function () {
      var info = $(this);
      var closeBtn = info.find('.js-info-close');
      closeBtn.click(function (e) {
        e.preventDefault();
        info.slideUp();
      });
    });
  })();

  // Module name: Changelog
  // Dependencies: jquery.instafilta.js
  // Docs: https://github.com/chromawoods/instaFilta/
  (function () {
    var changelogs = $('.js-changelog');

    changelogs.each(function () {
      var changelog = $(this);
      var changelogItems = changelog.find('.js-changelog-item');

      var changelogFilter = changelog.find('.js-changelog-input').instaFilta({
        scope: '.js-changelog',
        targets: '.js-changelog-update-description'
      });

      var changelogCheckBox = changelog.find('.js-changelog-checkbox');

      changelogItems.each(function () {
        var changelogItem = $(this);
        var switchBtn = changelogItem.find('.js-changelog-switch');

        switchBtn.click(function (e) {
          e.preventDefault();
          changelogItem.toggleClass('changelog-view-files');
        });
      });

      changelogCheckBox.on('change', function () {
        var checkedCategories = [];

        changelogCheckBox.each(function () {
          if ($(this).prop('checked')) {
            checkedCategories.push($(this).val());
          }
        });

        changelogFilter.filterCategory(checkedCategories);
      });
    });
  })();

  // Module name: Video Playlist Custom
  // Dependencies: video.js, videojs-playlist.js
  // Docs: https://github.com/videojs/video.js
  // https://github.com/tim-peterson/videojs-playlist
  (function () {
    var videoPlaylists = $('.js-video-playlist');

    videoPlaylists.each(function () {
      var video = $(this);
      var videoId = video.attr('id');
      var config = video.data('config');

      videojs(videoId).ready(function (event) {
        var myPlayer = this;

        if (config) {
          myPlayer.playlist(config);
        } else {
          myPlayer.playlist();
        }
      });

    });

  })();

  // Module name: Fragment Identifier
  // Dependencies: ZeroClipboard.min.js
  // Docs: https://github.com/zeroclipboard/zeroclipboard
  (function () {
    $(window).load(function () {

      var btns = $('.js-fragment-identifier');

      var zc = new ZeroClipboard(btns);

      zc.on("ready", function () {

        zc.on('copy', function (event) {

          var clipboard = event.clipboardData;
          var link = window.location.host + window.location.pathname + $(event.target).attr('href');

          clipboard.setData("text/plain", link);
        });

        zc.on('aftercopy', function (event) {
          var btn = $(event.target);

          btn.addClass('fragment-identifier-copied');

          setTimeout(function () {
            btn.removeClass('fragment-identifier-copied');
          }, 1000);
        });

      });

      ZeroClipboard.on("error", function (event) {
        btns.click(function () {
          var btn = $(this);

          btn.addClass('fragment-identifier-error');

          setTimeout(function () {
            btn.removeClass('fragment-identifier-error');
          }, 1000);
        });
      });

      btns.click(function (event) {
        event.preventDefault();

        var btn = $(this);
        var href = btn.attr('href');

        if (btn.hasClass('fragment-identifier-scroll')) {
          $('html, body').animate({
            scrollTop: $(href).offset().top
          }, 500, function () {
            window.location.hash = href;
          });
        }

      });
    });
  })();

})(jQuery);