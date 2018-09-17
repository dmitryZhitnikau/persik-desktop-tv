<template>
  <div class="b-channels">
    <div class="b-channels__title">
      <h2 class="b-channels__title-text b-channels__title-text_redirect" v-if="isHaveRedirect" v-on:click="showAll">{{title}}</h2>
      <h2 class="b-channels__title-text" v-if="!isHaveRedirect">{{ title }}</h2>
    </div>
    
    <div class="b-channels__list">

      <span class="b-channels__list-arrow" v-on:click="prev"><</span>

      <slick
        ref="slick"
        :options="slickOptions"
        class="b-channels__list-banner"
        >
          <div class="b-channels__list-item" v-for="id in channels" :key="id">
              <e-channel :id="id" :time="time"></e-channel>
          </div>
          <div class="stub" v-if="isStub">
            <span class="stub__link" v-on:click="showAll">Посмотреть все</span>
          </div>
      </slick>

      <span class="b-channels__list-arrow b-channels__list-arrow_right" v-on:click="next">></span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Slick from 'vue-slick';
import EChannel from '@/components/elements/EChannel';
import utils from '@/mixins/utils';

export default {
  name: 'b-channels',
  props: ['title', 'channels', 'isStub', 'isHaveRedirect'],
  mixins: [utils],
  components: {
    EChannel,
    Slick,
  },
  data() {
    return {
      time: null,
      slickOptions: {
        slidesToShow: 4,
        infinite: false,
      },
    };
  },
  created() {
    this.startTimeInterval();
  },
  activated() {
    this.startTimeInterval();
    this.reInit();
  },
  deactivated() {
    this.stopTimeInterval();
  },
  destroyed() {
    this.stopTimeInterval();
  },
  methods: {
    showAll() {
      this.$router.push({ name: 'Main', params: { page: 'tv' } });
    },
    startTimeInterval() {
      this.time = moment().unix();
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.time = moment().unix();
      }, 5000);
    },
    stopTimeInterval() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },
    next() {
      this.$refs.slick.next();
    },
    prev() {
      this.$refs.slick.prev();
    },
    reInit() {
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },
  },
};
</script>

<style scoped lang="scss">

  .b-channels {
  width: calc(100% - 4rem);
  margin-left: 4rem;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  -webkit-transition-duration: 500ms;
          transition-duration: 500ms;
  -webkit-transition-timing-function: ease-out;
          transition-timing-function: ease-out;

  &:hover {
    .b-channels__title-text {
      color: white;
      font-size: 1.2rem;
    }

    .b-channels__title-text_redirect {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  &__title {
    text-transform: uppercase;
    color: #616161;
    margin-bottom: .91rem;
    height: 2rem;
    padding-top: 1rem;

    &-text {
      font-weight: 100;
      -webkit-transition: .3s;
      transition: .3s;
      font-size: 1rem;
      height: 2rem;
      margin: 0;
    }
  }

  &__list {
    white-space: nowrap;
    position: relative;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    -webkit-transition-duration: 500ms;
            transition-duration: 500ms;
    -webkit-transition-timing-function: ease-out;
            transition-timing-function: ease-out;
    vertical-align: top;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;

    &-banner {
      .slick-list {
        overflow: hidden;
        width: 68rem;
      }
    }        

  &-arrow {
    font-size: 1rem;
    font-weight: 100;
    color: black;
    width: 1rem;
    cursor: pointer;
    -webkit-transform: scaleX(1.5) scaleY(14);
            transform: scaleX(1.5) scaleY(14);
    -webkit-transition: .3s;
    transition: .3s;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

    &_right {
      padding-left: .6rem;
    }

    &:hover {
      color: $color-hover;
    }
  }

    &-item {
      display: inline-block;
      vertical-align: top;
    }

      .stub {
        width: 16.25rem;
        height: 14.17rem;
        margin: 0 .625rem;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        background-color: $color-gray-medium;
        overflow: hidden;
        position: relative;
        display: -webkit-box !important;
        display: -ms-flexbox !important;
        display: flex !important;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;

        &__link {
          color: white;
          cursor: pointer;
          -webkit-transition: .2s;
          transition: .2s;

          &:hover {
            color: $color-hover;
            text-decoration: underline;
          }
        }
      }

    &-item:first-child{
      margin-left: -.625rem;;
    }
  }

  &:hover &__title{
    color: $color-text-simple;
    font-size: 1.5rem;
  }
}

</style>
