/**
 * Javascript-Equal-Height-Responsive-Rows
 * https://github.com/Sam152/Javascript-Equal-Height-Responsive-Rows
 */
(function ($) {
  'use strict';
  $.fn.equalHeight = function () {
    var heights = [];
    $.each(this, function (i, element) {
      var $element = $(element);
      var elementHeight;
      var includePadding = ($element.css('box-sizing') === 'border-box') || ($element.css('-moz-box-sizing') === 'border-box');
      if (includePadding) {
        elementHeight = $element.innerHeight();
      } else {
        elementHeight = $element.height();
      }
      heights.push(elementHeight);
    });
    this.css('height', Math.max.apply(window, heights) + 'px');
    return this;
  };
  $.fn.equalHeightGrid = function (columns) {
    var $tiles = this.filter(':visible');
    $tiles.css('height', 'auto');
    for (var i = 0; i < $tiles.length; i++) {
      if (i % columns === 0) {
        var row = $($tiles[i]);
        for (var n = 1; n < columns; n++) {
          row = row.add($tiles[i + n]);
        }
        row.equalHeight();
      }
    }
    return this;
  };
  $.fn.detectGridColumns = function () {
    var offset = 0, cols = 0, $tiles = this.filter(':visible');
    $tiles.each(function (i, elem) {
      var elemOffset = $(elem).offset().top;
      if (offset === 0 || elemOffset === offset) {
        cols++;
        offset = elemOffset;
      } else {
        return false;
      }
    });
    return cols;
  };
  var grids_event_uid = 0;
  $.fn.responsiveEqualHeightGrid = function () {
    var _this = this;
    var event_namespace = '.grids_' + grids_event_uid;
    _this.data('grids-event-namespace', event_namespace);
    function syncHeights() {
      var cols = _this.detectGridColumns();
      _this.equalHeightGrid(cols);
    }

    $(window).bind('resize' + event_namespace + ' load' + event_namespace, syncHeights);
    syncHeights();
    grids_event_uid++;
    return this;
  };
  $.fn.responsiveEqualHeightGridDestroy = function () {
    var _this = this;
    _this.css('height', 'auto');
    $(window).unbind(_this.data('grids-event-namespace'));
    return this;
  };
})(window.jQuery);