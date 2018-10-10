<template>
  <div class="detail-video">
    <w-placeholder v-if="showPlaceholder"></w-placeholder>
    <div v-else class="detail-video__inner">
      <div class="detail-video__art" v-bind:style="{ backgroundImage: 'url(' + resizeW(art, 1920) + ')'}"></div>
      <div class="detail-video__header">
        <div class="detail-video__header-cover" v-bind:style="{ backgroundImage: 'url(' + resizeW(cover, 512) + ')'}"></div>
        <div class="detail-video__header-details">
          <div class="detail-video__header-details_genres">
            <span v-for="(genre, index) in video.genres" :key="index">{{ clearGenre(genre) | capitalize }}</span>
          </div>
          <h1 class="detail-video__header-details_big">{{ video.name }}</h1>
          <div class="detail-video__header-details_midi">{{ video.international_name }}</div>

          <div v-if="video.director.length" class="detail-video__header-details-list">
            <span class="detail-video__header-details-list-title">
              <span v-if="video.director.length > 1">{{ $lang.messages.video.directors }}:</span>
              <span v-else>{{ $lang.messages.video.director }}:</span>
            </span>
            <span class="detail-video__header-details-list-item" v-for="person in video.director" :key="person.id">
              {{ person.name }}
            </span>
          </div>

          <div v-if="video.cast.length" class="detail-video__header-details-list">
            <span class="detail-video__header-details-list-title">{{ $lang.messages.video.cast }}: </span>
            <span class="detail-video__header-details-list-item" v-for="person in video.cast" :key="person.id">
              {{ person.name }}
            </span>
          </div>

        </div>


        <ul class="detail-video__header-buttons">
          <li class="detail-video__header-buttons-item" v-if="isPlayable && isAvailable && authorized" v-on:click="showVideo()">
            <i class="fa fa-play"></i>
            {{ $lang.messages.video.watch }}
          </li>
          <li class="detail-video__header-buttons-item detail-video__header-buttons-item_subscr" v-if="!isAvailable && authorized && isPlayable" v-on:click="getSubscription()">{{ $lang.messages.buttons.subscr }}</li>
          <li class="detail-video__header-buttons-item" v-if="!authorized" v-on:click="login()">{{ $lang.messages.buttons.login }}</li> <!-- !isAvailable &&  -->
          <!-- <li data-xy-focusable tabindex="-1" scroll-margin="0 25 0 0" scroll-threshold="0 25 0 0">трейлер</li> -->
          <li class="detail-video__header-buttons-item" v-if="canFavorite && !isFavorite && authorized" v-on:click="addFavorite()">{{ $lang.messages.context.add_favorite }}</li>
          <li class="detail-video__header-buttons-item" v-if="showBack" v-on:click="back()">{{ $lang.messages.context.back }}</li>
          <li class="detail-video__header-buttons-item" v-if="isFavorite" v-on:click="removeFavorite()">{{ $lang.messages.context.remove_favorite }}</li>
        </ul>

      </div>

      <div class="detail-video__info">

        <div v-if="video.description" class="detail-video__info-about">
          <span class="detail-video__info-about_big">{{ $lang.messages.video.description }}</span>
          <span class="detail-video__info-about_description" v-html="video.description"></span>
        </div>

        <div class="detail-video__info-more">
          <div v-if="video.countries.length" class="detail-video__info-more-line">
            <span class="detail-video__info-more-line_left">{{ $lang.messages.video.country }}</span>
            <span class="detail-video__info-more-line_right">{{ video.countries.join(', ') }}</span>
          </div>
          <div v-if="video.year" class="detail-video__info-more-line">
            <span class="detail-video__info-more-line_left">{{ $lang.messages.video.year }}</span>
            <span class="detail-video__info-more-line_right">{{ video.year }}</span>
          </div>
          <div v-if="video.ratings.imdb" class="detail-video__info-more-line">
            <span class="detail-video__info-more-line_left">IMDb</span>
            <span class="detail-video__info-more-line_right">{{ video.ratings.imdb.value }}</span>
          </div>
          <div v-if="video.ratings.kinopoisk" class="detail-video__info-more-line">
            <span class="detail-video__info-more-line_left">{{ $lang.messages.video.kinopoisk }}</span>
            <span class="detail-video__info-more-line_right">{{ video.ratings.kinopoisk.value }}</span>
          </div>
          <div v-if="video.age_rating" class="detail-video__info-more-line">
            <span class="detail-video__info-more-line_left">{{ $lang.messages.video.age_limit }}</span>
            <span class="detail-video__info-more-line_right">{{ video.age_rating }}</span>
          </div>
          <div v-if="channel" class="detail-video__info-more-line">
            <span class="detail-video__info-more-line_left">{{ $lang.messages.video.channel }}</span>
            <span class="detail-video__info-more-line_right">{{ channel.name }}</span>
          </div>
          <div v-if="tvshow" class="detail-video__info-more-line">
            <span class="detail-video__info-more-line_left">{{ $lang.messages.video.ether }}</span>
            <span class="detail-video__info-more-line_right">{{ startTime }}</span>
          </div>

          <div class="detail-video__info-more-line">
            <span class="detail-video__info-more-line_left">{{ $lang.messages.video.duration }}</span>
            <span class="detail-video__info-more-line_right">{{ duration }} мин.</span>
          </div>
        </div>
      </div>

      <div class="detail-video__seasons" v-if="video.is_series">
        <ul class="detail-video__seasons-nav">
          <li
                  v-for="(season, index) in video.seasons"
                  :key="index"
                  @click="openSeason(season)"             
                  class="detail-video__seasons-nav-item">
            {{ season }}
            <span v-if="season===seasonSelect" class="detail-video__seasons-nav-item-glow"></span>
          </li>
        </ul>
        <div class="detail-video__seasons-thumbs" v-if="series.length > 0">
          <b-videos
                  :items="series"
                  :mode="'horizontal'"
                  :play="true"
                  :isStub="false"
          ></b-videos>
        </div>
      </div>

      <!-- <div v-if="video.cast && video.cast.length" class="detail-video__actors">
        <div class="detail-video__actors-title">
          {{ $lang.messages.video.team }}
        </div>
        <div class="detail-video__actors-thumbs">
          <div v-for="(person, index) in video.cast" class="detail-video__actors-thumbs-item" :key="index" v-on:click="showActorInfo(person)">
            <div class="detail-video__actors-thumbs-item-pict" v-bind:style="{ backgroundImage: 'url(' + person.photo + ')' }"> </div>
            <span class="detail-video__actors-thumbs-item-name"> {{ person.name }} </span>
          </div>
        </div>
      </div> -->
    </div>
  </div>

</template>

<script>
  import _ from 'lodash';
  import moment from 'moment';
  import Hls from 'hls.js';
  import BVideos from '@/components/blocks/BVideos';
  import WPlaceholder from '@/components/widgets/WPlaceholder';
  import Metric from '@/persik/platform/Metric';
  import datetime from '@/mixins/datetime';
  import favorite from '@/mixins/favorite';
  import frames from '@/mixins/frames';
  import utils from '@/mixins/utils';
  import images from '@/mixins/images';

  export default {
    name: 'p-video',
    props: ['type', 'id'],
    mixins: [images, datetime, favorite, frames, utils],
    components: {
      BVideos,
      WPlaceholder,
    },
    data() {
      return {
        video: null,
        tvshow: null,
        channel: null,
        series: [],
        seasonSelect: 0,
        showPlaceholder: true,
        isAvailable: true,
      };
    },
    created() {
      this.showPlaceholder = true;
      this.video = null;
      this.tvshow = null;
      this.channel = null;
      this.series = [];
      this.seasonSelect = 0;
      this.updateVideoInfo();
      console.log(this.id);
    },
    activated() {
      Metric.getInstance().screenView('video');
    },
    computed: {
      name() {
        if (this.video && this.video.name.length) {
          return this.video.name;
        }
        if (this.tvshow) {
          return this.tvshow.title;
        }
        return '-';
      },
      time() {
        return moment().unix();
      },
      art() {
        if (this.video.art && this.video.art.length) {
          return this.video.art;
        }
        if (this.video.cover && this.video.cover.length) {
          return this.video.cover;
        }
        if (this.tvshow) {
          return this.getTvshowFrame(this.tvshow);
        }
        return null;
      },
      duration() {
        if (this.tvshow) {
          return Math.round((this.tvshow.stop - this.tvshow.start) / 60);
        }
        return this.video.duration;
      },
      startTime() {
        if (this.tvshow) {
          return this.getMoment(this.tvshow.start).calendar().toLowerCase();
        }
        return '-';
      },
      isPlayable() {
        switch (this.type) {
          case 'video':
            return true;
          case 'tvshow':
            return this.tvshow.stop < this.time
              && this.tvshow.start > this.time - this.channel.dvr_sec;
          default:
            return false;
        }
      },
      canFavorite() {
        return this.isPlayable
          || (this.type === 'tvshow' && this.time < this.tvshow.stop);
      },
      isFavorite() {
        return this.checkFavorite(this.id, this.type);
      },
      showBack() {
        return !this.canFavorite && !this.isPlayable;
      },
      authorized() {
        return this.$store.getters.getAuthorized;
      },
    },
    asyncComputed: {
      async cover() {
        if (!this.video) {
          return '';
        }
        let cover = this.video.cover;
        if ((!cover || !cover.length) && this.tvshow) {
          cover = await this.getTvshowFrame(this.tvshow, 'resize', 512);
        }
        return cover;
      },
    },
    methods: {
      clearGenre(genre) {
        if (genre) {
          const genreSplit = genre.split(') ');
          if (genreSplit[1]) return genreSplit[1];
          return genre;
        } return null;
      },
      showActorInfo(person) {
        this.$router.push({
          name: 'Main',
          params: { page: 'actor-info' },
          query: { id: person.person_id },
        });
      },
      getSubscription() {
        this.$router.push({ name: 'Main', params: { page: 'account' } });
      },
      login() {
        this.$router.push({ name: 'Main', params: { page: 'login' } });
      },
      async updateVideoInfo() {
        if (this.type === 'tvshow') {
          this.tvshow = await this.$backend.content.getTvshow(this.id);
          this.channel = await this.$backend.content.getChannel(this.tvshow.channel_id);
          this.isAvailable = this.channel.available;
        } else {
          this.tvshow = null;
          this.channel = null;
        }
        const videoId = this.type === 'video' ? this.id : this.tvshow.video_id;
        this.video = await this.$backend.content.getVideo(videoId);
        this.video.genres = await Promise.all(
          this.video.genres.map((id) => this.$backend.categories.getGenreName(id)),
        );
        this.showPlaceholder = false;
        await this.castConvert();
        this.getSeasons();
        if (this.authorized) {
          let streamData;
          if (this.type === 'video') {
            streamData = await this.$backend.stream.getVideo(this.id);
          } else if (this.type === 'tvshow') {
            console.log(this.id);
            streamData = await this.$backend.stream.getTvshow(+this.id);
            console.log(streamData);
          }
          const streamUrl = streamData.stream_url;
          const hls = new Hls();
          hls.loadSource(streamUrl);
          hls.on(Hls.Events.ERROR, () => {
            this.isAvailable = false;
          });
        }
      },
      showVideo() {
        let id = this.id;
        let type = this.type;
        if (this.video.is_series && this.series.length) {
          const firstSerie = this.series[0];
          id = firstSerie.id;
          type = firstSerie.type;
        }
        this.$router.push({ name: 'PlayerVideo', params: { type, id } });
      },
      async castConvert() {
        if (this.video.cast && this.video.cast.length) {
          const actors = await this.$backend.content.getPerson(this.video.cast);
          this.video.cast = actors.persons;
        }
        if (this.video.director && this.video.director.length) {
          const directors = await this.$backend.content.getPerson(this.video.director);
          this.video.director = directors.persons;
        }
      },
      getSeasons() {
        if (this.video.is_series) {
          const episodes = this.video.episodes;
          const seasons = _.uniq(episodes.map(s => s.season)).sort();
          this.video.seasons = seasons;
          this.openSeason(seasons[0]);
        }
      },
      openSeason(season) {
        this.series = [];
        setTimeout(() => {
          this.series = this.arrayToItems(
          this.video.episodes
            .filter(e => e.season === season)
            .sort((a, b) => a.episode.localeCompare(b.episode)),
          );
          this.seasonSelect = season;
        }, 200);
      },
      addFavorite() {
        this.addToFavorite(this.id, this.type);
      },
      removeFavorite() {
        this.removeFromFavorite(this.id, this.type);
      },
      back() {
        this.$root.$emit('navigateBack');
      },
    },
    watch: {
      id() {
        this.updateVideoInfo();
      },
    },
  };
</script>

<style scoped lang="scss">

  .detail-video {
  background: $color-gray-dark;
  background: #1b1b1b;
  position: relative;
  min-height: 110vh;

  &__inner {
    padding-bottom: 3rem;
  }

  &__art {
    width: 100%;
    height: 27rem;
    background-color: $color-gray-medium;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-filter: brightness(0.4);
            filter: brightness(0.4);
  }

  &__header{
    position: absolute;
    top: 7.67rem;
    width: 100%;
    height: 11.3rem;

    &-cover {
      width: 22.4rem;
      height: 33.12rem;
      margin: -3.7rem 3.96rem 0 7rem;
      z-index: 5;
      -webkit-box-shadow: $shadow-dark;
              box-shadow: $shadow-dark;
      float: left;
      background-size: cover;
      background-position: center;
    }

    &-details {
      width: 95%;
      color: $color-text-simple;

      &_genres {
        line-height: 1rem;
        font-size: .75rem;
        padding-bottom: .21rem;
        > span + span:before {
          content: ", ";
        }
      }

      &_big {
        font-size: 1.83rem;
        line-height: 2.5rem;
        text-transform: uppercase;
        padding-bottom: .88rem;
      }

      &_midi {
        font-size: 1.5rem;
        line-height: 2rem;
        padding-bottom: .54rem;
      }

      &-list {
        font-size: .83rem;
        line-height: 1.13rem;
        padding-bottom: .54rem;

        &-title {
          font-weight: bold;
        }
        &-item + &-item:before {
          content: ", ";
        }
      }

      &_small {
        font-size: .83rem;
        line-height: 1.13rem;
        padding-bottom: .54rem;

        .muted {
          color: $color-text-muted;
        }
      }
    }

    &-buttons{
      display: block;
      margin-top: 1.29rem;

      &-item {
        display: inline-block;
        background-color: $color-black;
        color: $color-text-simple;
        text-transform: uppercase;
        padding: .6rem 2rem;
        text-align: center;
        font-size: .92rem;
        position: relative;
        margin-left: .83rem;
        cursor: pointer;

        &_subscr {
          background-color: #c05c2a;
        }

        &:hover {
          background-color: $color-hover;
        }

        &:hover .fa {
          color: white;
        }

        .fa {
          vertical-align: middle;
          margin-right: 0.2rem;
          font-size: 0.5rem;
          color: $color-hover;
        }
      }

      &-item:first-child{
        margin-left: 0;
      }

      &-item:hover{
        .fa {
          color: $color-text-simple;
        }
      }
    }
  }

  &__info {
    width: 100%;
    overflow: hidden;
    color: $color-text-simple;
    padding-top: 3.54rem;

    &-about{
      overflow: inherit;
      width: 26.67rem;
      margin-left: 33.54rem;
      float: left;

      &_big{
        display: block;
        text-transform: uppercase;
        font-size: 1.63rem;
        margin-bottom: 1.17rem;
      }

      &_description {
        display: block;
        color: $color-text-simple;
        font-size: 1rem;
        text-align: justify;
        -webkit-hyphens: auto;
            -ms-hyphens: auto;
                hyphens: auto;
        line-height: 1.25rem;
      }
    }

    &-more {
      overflow: hidden;
      width: 12rem;
      margin-right: 3.96rem;
      float: right;
      font-size: .92rem;

      &-line {
        border-bottom: 1px solid $color-text-muted;
        line-height: 2.08rem;
        width: 100%;
        overflow: hidden;

        &_left{
          display: block;
          float: left;
        }

        &_right{
          display: block;
          float: right;
          font-weight: bold;
        }
      }

      &-line:last-child {
        border-bottom: none;
      }
    }
  }

  &__actors {
    width: 100%;
    height: 17rem;
    margin-left: 7.29rem;
    margin-top: 5.88rem;

    &-title {
      color: $color-text-muted;
      text-transform: uppercase;
      font-size: 1.21rem;
      line-height: 1.63rem;
      margin-bottom: .92rem;
    }

    &-thumbs {
      white-space: nowrap;
      width: 73rem;

      &-item {
        background-color: $color-gray-medium;
        width: 7.5rem;
        height: 12.63rem;
        display: inline-block;
        margin: 0 .625rem;
        text-align: center;
        -webkit-box-shadow: $shadow-dark;
                box-shadow: $shadow-dark;

        &-pict {
          background-color: $color-gray-light;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          width: inherit;
          height: 9.5rem;
        }

        &-name {
          line-height: 3.13rem;
          text-transform: uppercase;
          font-size: .67rem;
          color: $color-text-simple;
        }
      }

      &-item:first-child {
        margin-left: 0;
      }

      &-item[data-xy-focus] {
        background-color: $color-hover;
      }
    }
  }

  &__seasons {
    height: 19rem;
    margin-top: 5.88rem;

    &-nav {
      overflow: hidden;
      margin-bottom: 1.25rem;
      margin-left: 5rem;
      padding: 0;

      &-item {
        position: relative;
        display: block;
        float: left;
        margin: 0;
        width: 7.5rem;
        height: 2.5rem;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        border: 1px solid $color-gray-light;
        border-right: none;
        color: $color-text-simple;
        text-align: center;
        font-size: 1rem;
        line-height: 2.5rem;
        cursor: pointer;

        &:hover {
          background-color: $color-hover;
        }

        &-glow {
          background-color: $color-glow;
          -webkit-box-shadow: $shadow-glow;
                  box-shadow: $shadow-glow;
          position: absolute;
          left: 0;
          bottom: 0;
          height: 0.125rem;
          width: 7.5rem;
        }
      }

      &-item:last-child {
        border-right: 1px solid $color-gray-light;
      }

    }

    &-thumbs {
      white-space: nowrap;

      &-item {
        background-color: $color-gray-medium;
        width: 7.5rem;
        height: 10.63rem;
        display: inline-block;
        margin: 0 .625rem;
        text-align: center;

        &-pict {
          background-repeat: no-repeat;
          background-size: 100% 100%;
          width: inherit;
          height: 7.5rem;
        }

        &-name {
          line-height: 3.13rem;
          text-transform: uppercase;
          font-size: .67rem;
          color: $color-text-simple;
        }
      }

      &-item:first-child {
        margin-left: 0;
      }

      &-item[data-xy-focus] {
        background-color: $color-hover;
      }
    }
  }
}

</style>
