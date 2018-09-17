<template>
  <div class="e-channel" :class="{'e-channel_sleep' : sleep}" :content-id="id" content-type="channel" v-on:click="openChannel()" @focus="focusHandler" tabindex="-1">
    <template v-if="!sleep">
      <div v-if="!sleep" class="e-channel__frame" :style="{ backgroundImage: 'url(' + resize(logo, 144, 72) + ')' }">
        <div class="e-channel__frame-picture" :style="{backgroundImage: 'url(' + frameUrl + ')'}"></div>
        <div class="e-channel__frame-play-button">
          <img src="../../assets/vector-image/play.svg"/>
        </div>
        <div class="e-channel__bookmark" v-on:click.stop="toggleFavorite" :title="isFavorite ? 'Удалить канал из избранного' : 'Добавить канал в избранное'" :class="{'e-channel__bookmark_favorite': isFavorite}">
          <i class="fa fa-bookmark"></i>
        </div>
        <w-progress-bar-line v-if="!sleep" :passed="progress"></w-progress-bar-line>
      </div>
      <span v-if="!sleep" class="e-channel__item_name">{{ channelName }}</span>
      <span v-if="!sleep" class="e-channel__item_title">{{ tvshowTitle }}</span>
    </template>
  </div>
</template>

<script>
  import WProgressBarLine from '@/components/widgets/WProgressBarLine';
  // eslint-disable-next-line
  import EpgReader from '@/persik/service/epg/EpgReader';
  import favorite from '@/mixins/favorite';
  import frames from '@/mixins/frames';
  import images from '@/mixins/images';

  export default {
    name: 'e-channel',
    props: ['id', 'sleep', 'time'],
    mixins: [favorite, frames, images],
    components: {
      WProgressBarLine,
    },
    data() {
      return {
        channel: null,
        tvshow: null,
        internalTime: null,
        roundTime: null,
      };
    },
    computed: {
      channelName() {
        return this.channel ? this.channel.name : '...';
      },
      tvshowTitle() {
        return this.tvshow ? this.tvshow.title : '';
      },
      progress() {
        if (this.tvshow) {
          const total = this.tvshow.stop - this.tvshow.start;
          const onePercent = total / 100;
          const passed = this.internalTime - this.tvshow.start;
          return passed / onePercent;
        }
        return 0;
      },
      isFavorite() {
        return this.checkFavorite(this.id, 'channel');
      },
    },
    asyncComputed: {
      logo() {
        return this.getChannelLogo(this.id);
      },
      async frameUrl() {
        if (this.sleep || !this.roundTime || (this.channel && this.channel.age_rating === '18+')) {
          return '';
        }
        const url = await this.getChannelFrame(this.id, this.roundTime, 'crop', 256, 144);
        return this.loadImage(url);
      },
    },
    watch: {
      time(val) {
        if (!this.sleep) {
          this.internalTime = val;
        }
      },
      internalTime(val) {
        this.roundTime = Math.round(val / 60) * 60;
        this.update();
      },
      sleep(val) {
        if (!val) {
          this.internalTime = this.time;
          this.update();
        }
      },
    },
    methods: {
      toggleFavorite() {
        if (!this.isFavorite) {
          this.addToFavorite(this.id, 'channel');
        } else {
          this.removeFromFavorite(this.id, 'channel');
        }
      },
      openChannel() {
        this.$router.push({ name: 'PlayerLive', params: { load: true, channelId: this.id } });
        this.$root.$emit('closeSearch');
      },
      focusHandler() {
        this.$emit('focusChannel', this.id);
      },
      async update() {
        if (!this.channel) {
          this.channel = await this.$backend.content.getChannel(this.id);
        }
        if (this.internalTime && !this.runned
          && (!this.tvshow || (this.tvshow.stop < this.internalTime))
        ) {
          this.runned = true;
          try {
            [this.tvshow] = await EpgReader.getInstance().getNextTvshows(
                this.id, this.internalTime, 1,
            );
          } catch (e) {
            this.$nm.showError(e.message, 5000);
          }
          this.runned = false;
        }
      },
    },
  };
</script>

<style lang="scss">

.e-channel {
  width: 16.25rem;
  height: 14.17rem;
  margin: 0 .625rem;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  background: #393939;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  
  &__bookmark {
    position: absolute;
    top: -5px;
    right: 1rem;
    color: white;
    opacity: 0;
    -webkit-transition: .3s;
    transition: .3s;
    font-size: 2rem;
    text-shadow: 0 0 .8rem 0 rgba(0,0,0,.8);

    &:hover {
      opacity: .8 !important;
    }

    &_favorite {
      opacity: 1;

      &:hover {
        opacity: 1  !important;
      }
    }
  }

  &:hover {
    background-color: $color-hover;

    .e-channel__bookmark{
      opacity: .6;
    }
  }

  &:hover .e-channel__frame-play-button {
    display: block;
  }

    &:hover .e-channel__item_title {
    color: $color-text-simple;
  }

  &__frame{
    width: 100%;
    height: 9.17rem;
    background-color: $color-gray-medium;
    position: relative;
    background-size: 6rem auto;
    background-repeat: no-repeat;
    background-position: center center;
    
    &-picture{
      background-size: cover;
      background-repeat: no-repeat;
      width: inherit;
      height: inherit;
    }
    &-play-button{
      display: none;
      position: absolute;
      top: calc(50% - 1.25rem);
      left: calc(50% - 1.25rem);
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: $color-text-simple;

      img {
        position: absolute;
        left: calc(50% - .2rem);
        top: calc(50% - .32rem);
        width: .5rem;
        height: .64rem;
      }
    }
    &-play-button:after {
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
  }

  &__item_name {
    display: block;
    text-align: center;
    color: $color-text-simple;
    overflow: hidden;
    width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 1.17rem auto 0.33rem;
    text-transform: uppercase;
  }
  &__item_title {
    display: block;
    text-align: center;
    color: $color-hover;
    width: 90%;
    margin: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }


  &_sleep {
    -webkit-box-shadow: none;
            box-shadow: none;
  }
}

.e-channel:hover {
  background-color: $color-hover;
  .e-channel__item_title {
    color: $color-text-simple;
  }
  .e-channel__frame-play-button {
    display: block;
  }
  .progress__line {
    background: $color-text-simple;
  }
}

.e-channel[data-pressed]{
  outline: 1px solid $color-hover;
}

</style>
