<template>
  <div class="e-column-tvshow"
       :class="{'e-column-tvshow_future': isFuture, 'e-column-tvshow_active': active}"
       scroll-margin="0 15 0 15"
       @click="clickHandler"
       :content-id="id"
       content-type="tvshow"
       :content-mode="mode"
  >
    <div v-if="isArchive" class="e-column-tvshow__icon e-column-tvshow__icon_archive" title="Программа доступна для просмотра из архива"><i class="fa fa-hdd"></i></div>
    <div class="e-column-tvshow__icon" v-on:click.stop="toggleFavorite" :title="isFavorite ? 'Удалить программу из избранного' : 'Добавить программу в избранное'" :class="{'e-column-tvshow__icon_favorite': isFavorite}"><i class="fa fa-bookmark"></i></div>
    <div class="e-column-tvshow__title">
      <strong>{{ startTime }}</strong> &ndash; {{ title }}
    </div>
    <div class="e-column-tvshow__progress" v-if="isLive">
      <div class="e-column-tvshow__progress-line" :style="{ width: progress + '%' }"></div>
    </div>
    <hr class="e-column-tvshow__divider">
  </div>
</template>

<script>

  import datetime from '@/mixins/datetime';
  import favorite from '@/mixins/favorite';

  export default {
    name: 'e-column-tvshow',
    props: ['tvshow', 'id', 'active', 'time'],
    mixins: [datetime, favorite],
    data() {
      return {
        startTime: '...',
        title: '...',
        start: 0,
        stop: 0,
        dvr: 0,
      };
    },
    async created() {
      const tvshow = this.tvshow || await this.$backend.content.getTvshow(this.id);
      this.channel = await this.$backend.content.getChannel(tvshow.channel_id);
      this.dvr = this.channel.dvr_sec;
      this.startTime = this.getMoment(tvshow.start).format('HH:mm');
      this.start = tvshow.start;
      this.stop = tvshow.stop;
      this.title = tvshow.title;
    },
    computed: {
      dvrStart() {
        return this.time - this.dvr;
      },
      isArchive() {
        return this.start > this.dvrStart && this.stop < this.time;
      },
      isFuture() {
        return this.start > this.time;
      },
      isLive() {
        return this.time >= this.start && this.time < this.stop;
      },
      progress() {
        if (!this.start) {
          return 0;
        }
        const l = this.stop - this.start;
        let p = (this.time - this.start) / l;
        p = Math.max(0, Math.min(1, p));
        return p * 100;
      },
      mode() {
        if (this.isLive) return 'live';
        if (this.isArchive) return 'archive';
        if (this.isFuture) return 'future';
        return 'past';
      },
      isFavorite() {
        return this.checkFavorite(this.id, 'tvshow');
      },
    },
    methods: {
      toggleFavorite() {
        if (this.isFavorite) {
          this.removeFromFavorite(this.id, 'tvshow');
        } else {
          this.addToFavorite(this.id, 'tvshow');
        }
      },
      clickHandler() {
        if (this.isLive) {
          this.$router.push({ name: 'PlayerLive', params: { load: false, channelId: this.channel.channel_id } });
        } else {
          this.$router.push({ name: 'Main', params: { page: 'video' }, query: { type: 'tvshow', id: this.id } });
        }
        /*
        if (this.isArchive) {
          this.$router.push({ name: 'PlayerVideo', params: { id: this.id, type: 'tvshow' } });
        } else
        */
      },
    },
    i18n: false,
  };
</script>

<style scoped lang="scss">
  .e-column-tvshow {
  width: 100%;
  background: $color-gray-medium;
  overflow: auto;
  color: $color-text-simple;
  line-height: 2.5rem;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 0 2rem 0 2rem;
  cursor: pointer;

  &__title {
    height: 2.5rem;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__icon {
    color: white;
    float: right;
    line-height: 2.5rem;
    height: 2.5rem;
    margin-left: 0.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    opacity: 0;
    -webkit-transition: .3s;
    transition: .3s;

    &_favorite {
      opacity: 1 !important;
    }

    &_archive {
      opacity: .7;
    }
  }

  &__progress {
    height: .13rem;
    background-color: $color-gray-light;
    border-radius: .1rem;
    margin: 0.5rem 0 1.5rem;

    &-line {
      height: 100%;
      border-radius: .1rem;
      background-color: $color-glow;
      -webkit-box-shadow: $shadow-glow;
              box-shadow: $shadow-glow;
    }
  }

  &__divider {
    display: block;
    border: none;
    border-bottom: 1px solid $color-gray-light;
    margin: 0;
  }

  &:hover {
    background: $color-hover ;

    .e-column-tvshow__title {
      color: $color-text-simple !important;
    }

    .e-column-tvshow__icon {
      opacity: .5;

      &:hover {
        opacity: .7;
      }
    }

    .e-column-tvshow__divider {
      color: $color-text-simple !important;
      border-bottom: 1px solid $color-hover;
    }

    .e-column-tvshow__progress-line {
      background-color: $color-text-simple;
      -webkit-box-shadow: $shadow-white;
              box-shadow: $shadow-white;
    }

  }

  &_future {
    color: $color-text-muted;
  }

  &_active {
    color: $color-hover;
    font-weight: bold;
  }

}

</style>
