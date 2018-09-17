<template>
  <div>
    <div class="e-video"
         :class="{'e-video_horizontal': mode==='horizontal'}"
         :content-type="type" :content-mode="contentMode" :content-id="id"
         data-xy-focusable tabindex="-1" @click="clickHandler"
         v-on:mouseover="hoverHandler"
    >
      <div class="e-video__cover" :style="{ backgroundImage: 'url(' + resizeW(cover, 256) + ')' }" ></div>
      <div v-if="play" class="e-video__play-button">
        <img src="../../assets/vector-image/play.svg"/>
      </div>
      <span class="e-video__title"><span class="e-video__title-text">{{ name | truncate(80)}}</span></span>
      <div v-if="isFavorite" class="e-video__icon">
        <i class="fa fa-bookmark"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import favorite from '@/mixins/favorite';
  import frames from '@/mixins/frames';
  import images from '@/mixins/images';

  export default {
    name: 'e-actor-film',
    props: {
      type: {
        type: String,
        required: true,
        validator(value) {
          return value === 'video' || value === 'tvshow';
        },
      },
      id: {
        type: [String, Number],
        required: true,
      },
      mode: {
        type: String,
        default: 'horizontal',
      },
      play: {
        type: Boolean,
        default: false,
      },
    },
    mixins: [favorite, frames, images],
    data() {
      return {
        name: '...',
        cover: '',
      };
    },
    async created() {
      /* let tvshow;
      if (this.type === 'tvshow') {
        tvshow = await this.$backend.content.getTvshow(this.id);
      }
      const videoId = this.type === 'video' ? this.id : tvshow.video_id;
      const video = await this.$backend.content.getVideo(videoId);

      let cover = video.cover;
      if ((!cover || !cover.length) && tvshow) {
        cover = await this.getTvshowFrame(tvshow, 'crop', 256, 144);
      }
      this.cover = cover;
      if (tvshow) {
        this.name = tvshow.title;
      } else {
        this.name = video.name;
      } */
    },
    computed: {
      isFavorite() {
        return this.checkFavorite(this.id, this.type);
      },
      contentMode() {
        // TODO: вычислять более точно
        return 'archive';
      },
    },
    methods: {
      hoverHandler() {
        this.$root.$emit('focus', this.$el);
      },
      clickHandler() {
        if (this.play) {
          this.$router.push({ name: 'PlayerVideo', params: { type: this.type, id: this.id } });
        } else {
          this.$router.push({
            name: 'Main',
            params: { page: 'video' },
            query: { type: this.type, id: this.id },
          });
        }
      },
    },
    i18n: false,
  };
</script>

<style scoped lang="scss">

  .e-video {
  display: inline-block;
  width: 16.25rem;
  height: 26.17rem;
  margin: 0 .625rem;
  background: $color-gray-light;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  -webkit-transition-duration: 300ms;
          transition-duration: 300ms;
  -webkit-transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
          transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
  position: relative;
  overflow: hidden;
  -webkit-box-shadow: $shadow-dark;
          box-shadow: $shadow-dark;

  &__cover{
    width: 100%;
    height: 22.17rem;
    background-color: #505050;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    &-fav {
      position: absolute;
      top: .8rem;
      right: 1rem;
      color: $color-hover;
    }
  }

  &__title {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    padding: 1rem;
    height: 4rem;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    text-align: center;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    &-text {
      white-space: pre-line;
      color: $color-text-simple;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -webkit-box-flex: 1;
          -ms-flex: auto;
              flex: auto;
    }
  }

  &__play-button{
    visibility: hidden;
    position: absolute;
    top: calc(40% - 1.25rem);
    left: calc(50% - 1.25rem);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: $color-text-simple;
    img{
      position: absolute;
      left: calc(50% - .2rem);
      top: calc(50% - .32rem);
      width: .5rem;
      height: .64rem;
    }
  }
  &__play-button:after{
    content: "";
    border: 1px solid $color-text-simple;
    background-color: transparent;
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 50%;
    position: absolute;
    -webkit-transform: translate(-.65rem, -.65rem);
            transform: translate(-.65rem, -.65rem);
  }

  &__icon {
    position: absolute;
    top: -0.25rem;
    right: 0.5rem;
    font-size: 1.75rem;
    color: rgba($color-text-simple, 0.85);
    text-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.5);
  }

  &_horizontal {
    height: 14.17rem;
    .e-video__cover {
      height: 9.17rem;
    }
  }
}

.e-video[data-xy-focus]{
  background-color: $color-hover;
}

.e-video[data-xy-focus] .e-video__play-button{
  visibility: visible;
}

.e-video[data-pressed]{
  outline: 1px solid $color-hover;
}

</style>
