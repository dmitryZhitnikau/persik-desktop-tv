<template>
  <div class="e-live-channel" @click="openChannel(id)" :age-rating="ageRating">
    <div class="e-live-channel__id">
        <div class="e-live-channel__id-bookmark" v-on:click.stop="toggleChannelFavorite" :title="isChannelFavorite ? 'Удалить канал из избранного' : 'Добавить канал в избранное'" :class="{'e-live-channel__id-bookmark_favorite': isChannelFavorite}">
          <i class="fa fa-bookmark"></i>
        </div>
      <div class="e-live-channel__logo" v-bind:style="{ backgroundImage: 'url(' + resize(logo, 144, 72) + ')'}"></div>
    </div>
    <div v-if="!sleep" class="e-live-channel__tvshow-current">
      <div class="e-live-channel__tvshow-current-bookmark" v-on:click.stop="toggleTvshowFavorite" :title="isTvshowFavorite ? 'Удалить программу из избранного' : 'Добавить программу в избранное'" :class="{'e-live-channel__tvshow-current-bookmark_favorite': isTvshowFavorite}">
        <i class="fa fa-bookmark"></i>
      </div>
      <div class="e-live-channel__tvshow-current-frame" v-bind:style="{ backgroundImage: 'url(' + frameUrl + '), url(' + resize(logo, 144, 72) + ')' }" >
        <w-progress-bar-line :passed="progress"></w-progress-bar-line>
      </div>
      <div class="e-live-channel__tvshow-current-info">
        <div v-if="tvshow" class="e-live-channel__tvshow-current-info-title">{{ tvshow.title }}</div>
        <div v-if="tvshow" class="e-live-channel__tvshow-current-info-description">{{ tvshow.description }}</div>
      </div>
    </div>
    <div v-if="!sleep" class="e-live-channel__tvshow-next">

      <div class="e-live-channel__tvshow-next-bookmark" v-on:click.stop="toggleNextTvshowFavorite" :title="isNextTvshowFavorite ? 'Удалить программу из избранного' : 'Добавить программу в избранное'" :class="{'e-live-channel__tvshow-next-bookmark_favorite': isNextTvshowFavorite}">
        <i class="fa fa-bookmark"></i>
      </div>

      <div v-if="nextTvshow" class="e-live-channel__tvshow-next-frame" v-bind:style="{ backgroundImage: 'url(' + resizeW(nextTvshow.cover, 190) + '), url(' + resize(logo, 144, 72) + ')' }" >
        <div class="e-live-channel__tvshow-next-frame-title">
          {{ nextTvshow.title }}
        </div>

        <div class="e-live-channel__tvshow-next-frame-time">
          через {{ nextTvshowLeftTime }}
        </div>
      </div>
      <div v-else class="e-live-channel__tvshow-next-frame" v-bind:style="{ backgroundImage: 'none, url(' + resize(logo, 144, 72) + ')'}"></div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  // eslint-disable-next-line
  import EpgReader from '@/persik/service/epg/EpgReader';
  import WProgressBarLine from '@/components/widgets/WProgressBarLine';
  import frames from '@/mixins/frames';
  import images from '@/mixins/images';
  import favorite from '@/mixins/favorite';

  export default {
    name: 'e-live-channel',
    props: ['id', 'sleep', 'time'],
    mixins: [frames, images, favorite],
    components: {
      WProgressBarLine,
    },
    data() {
      return {
        channel: null,
        tvshow: null,
        nextTvshow: null,
        roundTime: null,
        internalTime: null,
      };
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
    computed: {
      ageRating() {
        return this.channel ? this.channel.age_rating : '';
      },
      isChannelFavorite() {
        return this.checkFavorite(this.id, 'channel');
      },
      isTvshowFavorite() {
        if (this.tvshow) {
          return this.checkFavorite(this.tvshow.tvshow_id, 'tvshow');
        }
        return false;
      },
      isNextTvshowFavorite() {
        if (this.nextTvshow) {
          return this.checkFavorite(this.nextTvshow.tvshow_id, 'tvshow');
        }
        return false;
      },
      progress() {
        if (!this.tvshow) {
          return 0;
        }
        const duration = this.tvshow.stop - this.tvshow.start;
        const passed = this.internalTime - this.tvshow.start;
        return Math.max(0, Math.min(100, (passed / duration) * 100));
      },
      nextTvshowLeftTime() {
        const time = moment.unix(this.internalTime)
          .from(moment.unix(this.nextTvshow.start), true);
        return time;
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
    async created() {
      this.channel = await this.$backend.content.getChannel(this.id);
    },
    methods: {
      toggleChannelFavorite() {
        if (!this.isChannelFavorite) {
          this.addToFavorite(this.id, 'channel');
        } else {
          this.removeFromFavorite(this.id, 'channel');
        }
      },
      toggleTvshowFavorite() {
        if (!this.isTvshowFavorite) {
          this.addToFavorite(this.tvshow.tvshow_id, 'tvshow');
        } else {
          this.removeFromFavorite(this.tvshow.tvshow_id, 'tvshow');
        }
      },
      toggleNextTvshowFavorite() {
        if (!this.isNextTvshowFavorite) {
          this.addToFavorite(this.nextTvshow.tvshow_id, 'tvshow');
        } else {
          this.removeFromFavorite(this.nextTvshow.tvshow_id, 'tvshow');
        }
      },
      async update() {
        console.log('update');
        if (!this.channel) {
          this.channel = await this.$backend.content.getChannel(this.id);
        }
        if (this.internalTime && !this.runned
          && (!this.tvshow || (this.tvshow.stop < this.internalTime))
        ) {
          this.runned = true;
          try {
            [this.tvshow, this.nextTvshow] = await EpgReader.getInstance().getNextTvshows(
              this.id, this.internalTime, 2,
            );
          } catch (e) {
            this.$nm.showError(e.message, 5000);
          }
          this.runned = false;
        }
      },
      openChannel(id) {
        this.$router.push({ name: 'PlayerLive', params: { load: true, channelId: id } });
      },
    },
  };
</script>

<style scoped lang="scss">

  .e-live-channel {
  height: 7rem;
  margin: 1rem 1rem 0 3rem;
  position: relative;
  cursor: pointer;

  &:last-child {
    margin-bottom: 3rem;
  }

  .e-live-channel__id {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    background: $color-gray-dark;
    border: 1px solid $color-gray-light;
    width: 7rem;
    height: 7rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    float: left;
    margin-right: 1.5rem;
    position: relative;

    &-bookmark {
      position: absolute;
      top: 0;
      right: .5rem;
      color: white;
      opacity: 0;
      -webkit-transition: .3s;
      transition: .3s;
      font-size: 1.7rem;
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
      .e-live-channel__id-bookmark {
        opacity: .6;
      }
    }   


    .e-live-channel__logo {
      display: block;
      height: 4rem;
      width: 4rem;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      -webkit-filter: grayscale(95%);
              filter: grayscale(95%);
      -webkit-transition: -webkit-filter 200ms ease-out;
      transition: -webkit-filter 200ms ease-out;
      transition: filter 200ms ease-out;
      transition: filter 200ms ease-out, -webkit-filter 200ms ease-out;
    }
  }
  &:hover {
    .e-live-channel__tvshow-current-info {
      background: $color-hover !important;
    }

    .e-live-channel__logo {
      -webkit-filter: none !important;
              filter: none !important;
    }

    .e-live-channel__id {
      border-color: $color-hover;
    }
  }

  .e-live-channel__tvshow-current {
    width: 44rem;
    height: 7rem;
    float: left;
    background-color: $color-gray-medium;
    -webkit-box-shadow: $shadow-dark;
            box-shadow: $shadow-dark;
    margin-right: 1.5rem;
    position: relative;

    &-bookmark {
      position: absolute;
      top: 0;
      right: 1rem;
      color: white;
      opacity: 0;
      -webkit-transition: .3s;
      transition: .3s;
      font-size: 1.7rem;
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
      .e-live-channel__tvshow-current-bookmark {
        opacity: .6;
      }

      .e-live-channel__tvshow-current-info-description {
        color: white !important;
      }
    }

    .e-live-channel__tvshow-current-frame {
      position: relative;
      width: 12rem;
      height: 7rem;
      background-color: $color-gray-light;
      background-size: cover, 40%;
      background-repeat: no-repeat;
      background-position: top, center;
      float: left;
      .progress{
        position: absolute;
        width: 100%;
        height: 0.2rem;
        bottom: -0.2rem;
      }
    }

    .e-live-channel__tvshow-current-info {
      width: 31rem;
      height: 6rem;
      padding: 0.5rem;
      color: $color-text-simple;
      float: left;

      .e-live-channel__tvshow-current-info-title {
        font-size: 1.2rem;
        line-height: 1.5rem;
        font-weight: bold;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .e-live-channel__tvshow-current-info-description {
        font-size: .85rem;
        white-space: normal;
        height: 4.5rem;
        line-height: 1.1rem;
        overflow: hidden;
        color: rgba(255,255,255,.7);
      }
    }
  }

  .e-live-channel__tvshow-next {
    float: left;

    &-bookmark {
      position: absolute;
      top: 0;
      right: 1rem;
      color: white;
      opacity: 0;
      -webkit-transition: .3s;
      transition: .3s;
      font-size: 1.7rem;
      text-shadow: 0 0 .8rem 0 rgba(0,0,0,.8);
      z-index: 2;

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
      .e-live-channel__tvshow-next-bookmark {
        opacity: .6;
      }
    }

    .e-live-channel__tvshow-next-frame {
      position: relative;
      width: 12rem;
      height: 7rem;
      background-color: $color-gray-medium;
      background-size: cover, 40%;
      background-repeat: no-repeat;
      background-position: top, center;
      font-size: .9rem;

      .e-live-channel__tvshow-next-frame-title {
        color: $color-text-simple;
        width: calc(100% - 1.0rem);
        max-height: 2rem;
        line-height: 1.2rem;
        padding: .5rem .5rem .5rem;
        text-align: center;
        overflow: hidden;
        white-space: normal;
        background: rgba(0, 0, 0, .5);
      }

      .e-live-channel__tvshow-next-frame-time {
        color: $color-text-simple;
        width: calc(100% - 1.0rem);
        height: 1rem;
        line-height: 1rem;
        padding: .4rem .5rem .5rem;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        position: absolute;
        bottom: 0;
        font-size: .8rem;
        color: rgba(255,255,255, .6);
        background: rgba(0, 0, 0, .5);
      }
    }
  }
}

</style>
