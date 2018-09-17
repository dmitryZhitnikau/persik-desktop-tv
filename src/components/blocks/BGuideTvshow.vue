<template>
    <div v-if="tvshow" class="guide-tvshow" v-bind:class="{'guide-tvshow_current': isCurrent }" v-bind:style="{ transform: 'translateX(' + offsetX + 'rem)'}" v-on:click="playTvShow">
        <div class="guide-tvshow__time">
            <div v-if="isLive">
              {{ startTime }} (в эфире)
            </div>
            <div v-else>
                {{ startTime }}
            </div>
        </div>

        <div class="guide-tvshow__frame" v-bind:style="{ backgroundImage: 'url(' + crop(frameUrl, 288, 168) + '), url(' + resize(logo, 144, 72) + ')' }" >
            <div v-if="isArchive" class="guide-tvshow__frame-isArch"><i class="fa fa-hdd"></i></div>
            <div v-if="!isCurrent" class="guide-tvshow__frame-title">
                {{ tvshow.title }}
            </div>
            <div v-if="isLive">
                <w-progress-bar-line :passed = "progress * 100"></w-progress-bar-line>
            </div>
        </div>
        
        <div class="guide-tvshow__info" v-bind:style="{ opacity: infoOpacity}">
            <div class="guide-tvshow__info-title">{{ tvshow.title }}</div>
            <div class="guide-tvshow__info-description">{{ tvshow.description }}</div>
        </div>
    </div>
</template>

<script>

  import WProgressBarLine from '@/components/widgets/WProgressBarLine';
  import loadImage from 'image-promise';
  import datetime from '@/mixins/datetime';
  import frames from '@/mixins/frames';
  import images from '@/mixins/images';

  export default {
    name: 'b-guide-tvshow',
    props: ['tvshow', 'time', 'index', 'translateX', 'isArchive'],
    mixins: [datetime, frames, images],
    components: {
      WProgressBarLine,
    },
    computed: {
      offsetX() {
        const index = this.index + this.translateX;
        let offset = 13 + (index * 13);
        if (index > 0) {
          offset += 26 * Math.min(index, 1);
        }
        return offset;
      },
      infoOpacity() {
        let opacity = 0;
        const index = Math.abs(this.index + this.translateX);
        if (index < 1) {
          opacity = 1 - index;
        }
        return opacity;
      },
      isCurrent() {
        return this.index === 0;
      },
      isLive() {
        return this.time >= this.tvshow.start && this.time < this.tvshow.stop;
      },
      isFuture() {
        return this.time < this.tvshow.start;
      },
      progress() {
        const l = this.tvshow.stop - this.tvshow.start;
        let p = (this.time - this.tvshow.start) / l;
        if (p < 0) {
          p = 0;
        }
        if (p > 1) {
          p = 1;
        }
        return p;
      },
      startTime() {
        return this.getMoment(this.tvshow.start).format('HH:mm');
      },
      stopTime() {
        return this.getMoment(this.tvshow.stop).format('HH:mm');
      },
    },
    asyncComputed: {
      logo() {
        if (!this.tvshow) {
          return '';
        }
        return this.getChannelLogo(this.tvshow.channel_id);
      },
      async frameUrl() {
        if (!this.tvshow) {
          return '';
        }
        let url = '';
        if (this.isFuture) {
          if (this.tvshow.cover) {
            url = this.tvshow.cover;
          }
        } else if (this.isLive) {
          url = await this.getChannelFrame(this.tvshow.channel_id, this.time, 'crop', 288, 168);
        } else {
          url = await this.getTvshowFrame(this.tvshow, 'crop', 288, 168);
        }

        if (url !== '') {
          try {
            await loadImage(url);
          } catch (e) {
            url = '';
          }
        }
        return url;
      },
    },
    methods: {
      playTvShow() {
        if (this.isArchive) {
          this.$router.push({ name: 'PlayerVideo', params: { type: 'tvshow', id: this.tvshow.tvshow_id } });
        }
      },
    },
  };
</script>

<style scoped lang="scss">

    .guide-tvshow {
  width: 8rem;
  height: 7.0rem;
  font-size: 1rem;
  position: absolute;
  margin-right: 1rem;
  -webkit-box-shadow: none;
          box-shadow: none;
  outline: none;
  z-index: 2;

  &__time {
      position: absolute;
      font-size: 1.2rem;
      font-weight: bold;
      top: -1.7rem;
      color: #eeeeee;
      text-shadow: 0 1px 1px #111111;
  }
  &__frame {
      position: absolute;
      width: 12rem;
      height: 7rem;
      background-size: cover, 40%;
      background-repeat: no-repeat;
      background-position: top, center;
      .progress{
          position: absolute;
          bottom: -.3rem;
          width: 100%;
          height: .3rem;
      }

      &-isArch {
        position: absolute;
        left: .5rem;
        top: .5rem;
        color: rgba(240, 0, 0, .6);
      }

      &-title {
        color: #eeeeee;
        text-shadow: 0 1px 1px #111111;
        width: calc(100% - 1.5rem);
        height: 3.2rem;
        line-height: 1.2rem;
        padding: 0.5rem;
        background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.75)), to(transparent));
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, transparent 100%);
        text-align: center;
        overflow: hidden;
        white-space: normal;
      }
  }
  .guide-tvshow__progress {
      position: absolute;
      top: 7.5rem;
      width: 12rem;
      background: #808080;
      height: 0.25rem;
      .guide-tvshow__progress-bar {
          background: #eee;
          height: 0.25rem;
      }
      .guide-tvshow__progress-start,
      .guide-tvshow__progress-stop {
          color: #eeeeee;
          font-weight: bold;
          text-shadow: 0 1px 1px #111111;
          position: absolute;
          top: 0.5rem;
      }

      .guide-tvshow__progress-start {
          left: 0;
      }
      .guide-tvshow__progress-stop {
          right: 0;
      }
  }

  .guide-tvshow__info {
      position: absolute;
      width: 25rem;
      height: 6rem;
      padding: 0.5rem;
      left: 12rem;
      background: $color-gray-medium;
      color: #eeeeee;

      &-title {
          font-size: 1.2rem;
          line-height: 1.5rem;
          font-weight: bold;
          text-overflow: ellipsis;
          overflow: hidden;
      }

      &-description {
          font-size: 1.0rem;
          white-space: normal;
          height: 3.6rem;
          line-height: 1.21rem;
          overflow: hidden;
      }
  }
  &.guide-tvshow_current {
      width: 38rem;
      z-index: 2;
      .guide-tvshow__info{
          background-color: $color-hover;
      }
  }
}
</style>
