import $ from 'jquery';

class Scroller {

  static get DEFAULT_OVER_SCROLL() {
    return 6;
  }

  static setProps(object, propsArray, value) {
    propsArray.forEach((prop) => {
      object[prop] = value;
    });
  }

  static convertToPx(value) {
    const baseFontSize = parseFloat($('html').css('font-size'));
    return parseFloat(value) * baseFontSize;
  }

  static parseAttribute(attr, object) {
    const values = attr
      .trim()
      .split(/\s+/)
      .map(Scroller.convertToPx);

    if (values[0]) {
      Scroller.setProps(object, ['left', 'top', 'right', 'bottom'], values[0]);
    }
    if (values[1]) {
      Scroller.setProps(object, ['top', 'bottom'], values[1]);
    }
    if (values[2]) {
      Scroller.setProps(object, ['left'], values[2]);
    }
    if (values[3]) {
      Scroller.setProps(object, ['bottom'], values[3]);
    }
  }

  static getOverScroll(element) {
    const defaultOverScrollPx = Scroller.convertToPx(Scroller.DEFAULT_OVER_SCROLL);
    const result = {
      left: defaultOverScrollPx,
      top: defaultOverScrollPx,
      right: defaultOverScrollPx,
      bottom: defaultOverScrollPx,
    };
    const elem = $(element);
    const attr = elem.attr('scroll-margin');
    if (typeof attr !== typeof undefined && attr !== false) {
      Scroller.parseAttribute(attr, result);
    }
    return result;
  }

  static getThreshold(element) {
    const result = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    };
    const elem = $(element);
    const attr = elem.attr('scroll-threshold');
    if (typeof attr !== typeof undefined && attr !== false) {
      Scroller.parseAttribute(attr, result);
    }
    return result;
  }


  static scrollTo(element) {
    const ANIMATION_DURATION = 300;

    const el = $(element);
    const container = el.parent().closest('[data-scrollable], [data-scrollable-x], [data-scrollable-y], [scrollable], [scrollable-x], [scrollable-y]');
    if (container.length) {
      const overScroll = Scroller.getOverScroll(element);
      const threshold = Scroller.getThreshold(element);
      const containerElement = container.get(0);
      const containerScrollableX = container.is('[data-scrollable], [data-scrollable-x], [scrollable], [scrollable-x]');
      const containerScrollableY = container.is('[data-scrollable], [data-scrollable-y], [scrollable], [scrollable-y]');
      const computedStyle = getComputedStyle(containerElement);
      const isOverflowXVisible = computedStyle.overflowX === 'visible';
      const isOverflowYVisible = computedStyle.overflowY === 'visible';
      let scrollLeft = 0;
      let scrollTop = 0;

      const animateProps = {};

      if (containerScrollableX) {
        const contentWidth = containerElement.scrollWidth;
        const width = containerElement.clientWidth;
        if (width < contentWidth) {
          let offset = 0;
          if (isOverflowXVisible) {
            offset = container.data('scrollLeft') || 0;
          }
          const posLeft = el.offset().left - container.offset().left;
          const left = posLeft - offset;
          const right = left + element.offsetWidth;

          const freeWidth = width - element.offsetWidth;
          if (freeWidth < (overScroll.left + overScroll.right)) {
            // TODO: делить в соответствии с исходными пропорциями
            overScroll.left = freeWidth / 2;
            overScroll.right = freeWidth / 2;
          }

          scrollLeft = isOverflowXVisible ? offset : containerElement.scrollLeft;
          if (right > width) {
            // scroll to left
            scrollLeft += right + overScroll.right;
            scrollLeft -= width;
          } else if (left < 0) {
            // scroll to right
            scrollLeft -= (-left + overScroll.left);
          }

          const maxScrollLeft = contentWidth - width;
          if (scrollLeft < 0) {
            scrollLeft = 0;
          } else if (scrollLeft > maxScrollLeft) {
            scrollLeft = maxScrollLeft;
          }

          if (!isOverflowXVisible) {
            animateProps.scrollLeft = scrollLeft;
            scrollLeft = 0;
          }
        }
      }

      if (containerScrollableY) {
        const contentHeight = containerElement.scrollHeight;
        const height = containerElement.clientHeight;

        if (height < contentHeight) {
          let offset = 0;
          if (isOverflowYVisible) {
            offset = container.data('scrollTop') || 0;
          }
          const posTop = el.offset().top - container.offset().top;

          const top = posTop - offset;
          const bottom = top + element.offsetHeight;

          const freeHeight = height - element.offsetHeight;
          if (freeHeight < (overScroll.top + overScroll.bottom)) {
            // TODO: делить в соответствии с исходными пропорциями
            overScroll.top = freeHeight / 2;
            overScroll.bottom = freeHeight / 2;
          }


          scrollTop = isOverflowYVisible ? offset : containerElement.scrollTop;
          if ((bottom + threshold.bottom) > height) {
            // scroll to top
            scrollTop += bottom + overScroll.bottom;
            scrollTop -= height;
          } else if ((top - threshold.top) < 0) {
            // scroll to bottom
            scrollTop -= (-top + overScroll.top);
          }
          const maxScrollTop = contentHeight - height;
          if (scrollTop < 0) {
            scrollTop = 0;
          } else if (scrollTop > maxScrollTop) {
            scrollTop = maxScrollTop;
          }

          if (!isOverflowYVisible) {
            animateProps.scrollTop = scrollTop;
            scrollTop = 0;
          }
        }
      }
      if (Object.keys(animateProps).length > 0) {
        container.stop(true, false);
        container.animate(animateProps, ANIMATION_DURATION);
      }

      if (isOverflowXVisible || isOverflowYVisible) {
        container.data('scrollTop', scrollTop);
        container.data('scrollLeft', scrollLeft);
        scrollLeft = -scrollLeft;
        scrollTop = -scrollTop;
        container.css('transform', `translateX(${scrollLeft}px) translateY(${scrollTop}px)`);
      }

      this.scrollTo(containerElement);
    }
  }
}

export default Scroller;
