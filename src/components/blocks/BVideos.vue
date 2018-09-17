<template>
  <div class="b-videos">
    <div v-if="title" class="b-videos__title">
      <h2 class="b-videos__title-text b-videos__title-text_redirect" v-if="isHaveRedirect" v-on:click="showAll">{{ title }}</h2>
      <h2 class="b-videos__title-text" v-if="!isHaveRedirect">{{ title }}</h2>
    </div>

    <div class="b-videos__list">
      <span class="b-videos__list-arrow" v-on:click="prev"><</span>

      <slick
        ref="slick"
        :options="slickOptions"
        class="b-videos__list-slider">

          <div class="b-videos__list-item" v-for="item in items" :key="item.id">
            <e-video :type="item.type" :id="item.id" :mode="mode" :play="play"></e-video>
          </div>

        <div v-if="isStub" class="stub" v-bind:class="{'stub_vertical' : this.mode === 'vertical'}">
          <span class="stub__link" v-on:click="showAll">Посмотреть все</span>
        </div>

      </slick>

      <span class="b-videos__list-arrow b-videos__list-arrow_right" v-on:click="next">></span>
    </div>

  </div>
</template>

<script>
import Slick from 'vue-slick';
import EVideo from '@/components/elements/EVideo';

export default {
  components: {
    EVideo,
    Slick,
  },
  name: 'b-videos',
  props: {
    title: String,
    items: Array,
    mode: {
      type: String,
      default: 'horizontal',
    },
    play: {
      type: Boolean,
      default: false,
    },
    isStub: {
      type: Boolean,
      default: true,
    },
    isHaveRedirect: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      slickOptions: {
        slidesToShow: 4,
        infinite: false,
      },
    };
  },
  activated() {
    this.reInit();
  },
  mounted() {
    this.reInit();
  },
  watch: {
    items() {
      console.log('items changed');
      this.reInit();
    },
  },
  methods: {
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
    showAll() {
      if (this.title === 'Фильмы') {
        this.$router.push({ name: 'Main', params: { page: 'video-films' } });
      } else if (this.items[0].type === 'tvshow') {
        this.$router.push({ name: 'Main', params: { page: 'video-shows' } });
      } else {
        this.$router.push({ name: 'Main', params: { page: 'video-series' } });
      }
    },
  },
};
</script>

<style scoped lang="scss">

.b-videos {
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
    .b-videos__title-text {
      font-size: 1.2rem;
      color: white;
    }

    .b-videos__title-text_redirect {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  &__title {
    text-transform: uppercase;
    color: $color-text-muted;
    margin: 1.67rem 0 .54rem 0;
    text-align: left;
    height: 2rem;

    &-text {
      font-weight: 100;
      font-size: 1rem;
      -webkit-transition: .3s;
      transition: .3s;
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;

    &-item {
      display: inline-block;
      -webkit-transition-property: -webkit-transform;
      transition-property: -webkit-transform;
      transition-property: transform;
      transition-property: transform, -webkit-transform;
      -webkit-transition-duration: 300ms;
              transition-duration: 300ms;
      -webkit-transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
              transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
      position: relative;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover, auto;
    }

    &-item:first-child{
      margin-left: -.625rem;
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

        &_vertical {
          height: 26.17rem;
        }

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

  }

  &:hover &__title{
    color: $color-text-simple;
    font-size: 1.5rem;
  }
}

</style>
