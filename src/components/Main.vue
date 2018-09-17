<template>
  <div class="main">

    <div class="header" ref="header">
      <!-- <img class="p-home__block_logo" :src="$backend.logo"> -->

      <div class="header__burger">
        <div class="header__burger-line"></div>
      </div>

      <img class="header__logo" :src="$backend.logo" v-on:click="goToMain">

      <div class="header__item header__item_menu">
      <!--   <div class="header__item-button">Private</div>-->
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdj9WBRu9n_8txQLT0Lc1UqiqceJuSvLJ3-Luk8u26V_2WvQg/viewform" class="header__item-button header__item-button_active">Перейти на анкету</a>
        <!--<div class="header__item-button">Corporate</div>-->
      </div> 

      <div class="header__items">

        <div class="header__items-phones">
          <i class="fa fa-phone"></i>
          <span>+375 17 3361111</span>
          <span>+375 29 3361100</span>
        </div>

        <div class="header__items-navs">
          <i class="fa fa-search" :class="{'elem-active' : isShowSearchPage}" v-on:click="toggleSearch"></i>
          <i class="fa fa-user" v-if="!isLogged" v-on:click="login"></i>
          <i class="fa fa-user" v-if="isLogged" v-on:click="personal"></i>
        </div>


      </div>

    </div>

    <div class="sidebar" ref="mainMenu" v-on:click="isShowSearchPage = false">
      <div class="sidebar__col">
        <div v-for="(block, index) in menu" :key="index" v-on:click="scrollToTop">
          <router-link
            v-for="(item, i) in block.items"
            v-show="item.show"
            tag="div"
            :key="i"
            :to="{ name: 'Main', params: { page: item.page }, query: { tag: 0 }}"
            class="sidebar__item"
            :class="{sidebar__item_active: item.page === normalizedPage}"
          >
            <div class="sidebar__item-short">
              <div class="sidebar__item-short-icon">
                <i class="fa" :class="item.icon"></i>
              </div>
            </div>
            <div class="sidebar__item-full">
              <div class="sidebar__item-full-icon">
                <i class="fa" :class="item.icon"></i>
              </div>
              <span class="sidebar__item-full-name">{{ item.name }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="filterVisible" class="tags" :class="{'tags_open': tagsCollapse}">
      <div class="tags__selected" v-on:click="openFilter" v-show="!tagsCollapse">{{ currentTag.name }}</div>
      <div>
        <div v-for="(tag, index) in tags"
             :key="index"
             class="tags__item"
             :class="{'tags__item_active': tag.filter === currentTag.filter, 'tags__item_open': tagsCollapse}"
             @click="selectTag(tag)"
        >
          <div class="tags__item-count">{{ tag.count }}</div>
          <div class="tags__item-name">{{ tag.name }}</div>
        </div>
      </div>
    </div>

    <div v-if="genreFilterVisible && currentVideoTag.genres.length > 0" class="tags tags_genre" :class="{'tags_open': tagsCollapse}">
      <div class="tags__selected" v-on:click="openFilter" v-if="!tagsCollapse && currentVideoTagGenre">{{ currentVideoTagGenre.name }}</div>
      <div class="tags__block">
        <div v-for="(genre, index) in currentVideoTag.genres"
        :key="index"
        class="tags__item"
        :class="{'tags__item_open': tagsCollapse}"
        @click="selectVideoGenre(genre)"
        >
          <div class="tags__item-name">{{ genre.name }}</div>
        </div>        
      </div>    
    </div>

    <div ref="mainContent" class="main__content">
      <keep-alive include="p-home,p-search,p-tv,p-videos,p-live,p-tv-column,p-favorites,p-video-cartoons,p-video-films,p-video-series,p-video-shows">
        <p-home v-if="normalizedPage=='home'"></p-home>
        <p-tv v-if="normalizedPage=='tv'" :channels="filteredChannels" :pageTitle="currentTag.name"></p-tv>
        <p-live v-if="normalizedPage=='live'" :channels="filteredChannels" :pageTitle="currentTag.name"></p-live>
        <p-tv-column v-if="normalizedPage=='tv-column'" :channels="filteredChannels"></p-tv-column>
        <p-grid v-if="normalizedPage=='grid'" :channels="filteredChannels"></p-grid>
        <p-login v-if="normalizedPage=='login'"></p-login>
        <p-favorites v-if="normalizedPage=='favorites'"></p-favorites>
        <p-account v-if="normalizedPage=='account'" :tab="query.tab"></p-account>
        <p-video v-if="normalizedPage=='video'" :id="query.id" :type="query.type"></p-video>
        <p-video-cartoons v-if="normalizedPage=='video-cartoons'" :genreId="currentVideoTagGenre.id" :pageTitle="currentVideoTagGenre.name"></p-video-cartoons>
        <p-video-films v-if="normalizedPage=='video-films'" :genreId="currentVideoTagGenre.id" :pageTitle="currentVideoTagGenre.name"></p-video-films>
        <p-video-series v-if="normalizedPage=='video-series'" :genreId="currentVideoTagGenre.id" :pageTitle="currentVideoTagGenre.name"></p-video-series>
        <p-video-shows v-if="normalizedPage=='video-shows'" :genreId="currentVideoTagGenre.id" :pageTitle="currentVideoTagGenre.name"></p-video-shows>
        <p-settings v-if="normalizedPage=='settings'" :tab="query.tab"></p-settings>
        <p-actor-info v-if="normalizedPage=='actor-info'" :id="query.id"></p-actor-info>
      </keep-alive>      
    </div>

    <transition name="search-fade">
      <p-search v-show="isShowSearchPage"></p-search>
    </transition>
   
  </div>
</template>

<script>
  import _ from 'lodash';
  import Metric from '@/persik/platform/Metric';
  import datetime from '@/mixins/datetime';
  import PHome from './pages/PHome';
  import PTv from './pages/PTv';
  import PLive from './pages/PLive';
  import PLogin from './pages/PLogin';
  import PTvColumn from './pages/PTvColumn';
  import PGrid from './pages/PGrid';
  import PFavorites from './pages/PFavorites';
  import PSearch from './pages/PSearch';
  import PAccount from './pages/PAccount';
  import PVideo from './pages/PVideo';
  import PSettings from './pages/PSettings';
  import PVideoCartoons from './pages/PVideoCartoons';
  import PVideoFilms from './pages/PVideoFilms';
  import PVideoSeries from './pages/PVideoSeries';
  import PVideoShows from './pages/PVideoShows';
  import PActorInfo from './pages/PActorInfo';

  export default {
    name: 'main',
    props: ['page', 'query'],
    mixins: [datetime],
    components: {
      PTv,
      PHome,
      PLive,
      PLogin,
      PTvColumn,
      PGrid,
      PFavorites,
      PSearch,
      PAccount,
      PVideo,
      PSettings,
      PVideoCartoons,
      PVideoFilms,
      PVideoSeries,
      PVideoShows,
      PActorInfo,
    },
    data() {
      return {
        currentTag: { name: this.$lang.messages.buttons.all_channels, filter: null },
        currentVideoTag: { name: this.$lang.messages.buttons.all_genres, genres: [], id: 0 },
        currentVideoTagGenre: { name: this.$lang.messages.buttons.all_genres, id: 0 },
        previousPage: null,
        tagsCollapse: false,
        isShowSearchPage: false,
      };
    },
    computed: {
      homePage() {
        return this.$backend.support.featured ? 'home' : 'tv';
      },
      normalizedPage() {
        return !this.page ? this.homePage : this.page;
      },
      menu() {
        return [
          {
            id: 1,
            items: [
              { page: 'home', name: this.$lang.messages.main_menu.main, icon: 'fa-home', show: this.$backend.support.featured },
              { page: 'tv', name: this.$lang.messages.main_menu.tv_review, icon: 'fa-th', show: true },
              { page: 'live', name: this.$lang.messages.main_menu.tv_live, icon: 'fa-th-list', show: true },
              { page: 'tv-column', name: this.$lang.messages.main_menu.tv_guide, icon: 'fa-columns', show: true },
              { page: 'video-films', name: this.$lang.messages.main_menu.films, icon: 'fa-film', show: this.$backend.support.vod },
              { page: 'video-cartoons', name: this.$lang.messages.main_menu.cartoons, icon: 'fa-film', show: this.$backend.support.vod },
              { page: 'video-series', name: this.$lang.messages.main_menu.series, icon: 'fa-film', show: this.$backend.support.vod },
              { page: 'video-shows', name: this.$lang.messages.main_menu.shows, icon: 'fa-film', show: this.$backend.support.vod },
              { page: 'favorites', name: this.$lang.messages.main_menu.favorite, icon: 'fa-bookmark', show: this.$backend.support.auth && this.isLogged },
            ],
          },
        ];
      },
      isLogged() {
        return this.$store.getters.getAuthorized;
      },
      countFavoriteChannels() {
        return this.$store.getters.countFavoriteChannels;
      },
      filter() {
        return this.$store.state.filter;
      },
      filteredChannels() {
        return this.$store.state.filteredChannels;
      },
      filterVisible() {
        const haveFilterPages = ['tv', 'live', 'tv-column', 'grid'];
        return haveFilterPages.includes(this.page);
      },
      categoryFilterVisible() {
        const haveFilterPages = ['videos'];
        return haveFilterPages.includes(this.page);
      },
      genreFilterVisible() {
        const haveFilterPages = ['video-cartoons', 'video-films', 'video-series', 'video-shows'];
        return haveFilterPages.includes(this.page);
      },
    },
    asyncComputed: {
      tags: {
        async get() {
          const channels = await this.$backend.content.getChannels();
          const tags = [];
          tags.push({
            name: this.$lang.messages.buttons.all_channels,
            filter: null,
            count: channels.length,
          });
          if (this.countFavoriteChannels) {
            tags.push({ name: this.$lang.messages.main_menu.favorite, filter: 'favorites', count: this.countFavoriteChannels });
          }
          const genres = await this.$backend.categories.getChannelGenres();
          genres.forEach(genre => {
            const count = channels.filter(channel => channel.genres.includes(genre.id)).length;
            if (count) {
              tags.push({
                name: genre.name,
                filter: {
                  genre_id: genre.id,
                },
                count,
              });
            }
          });
          return tags;
        },
        watch() {
          return this.countFavoriteChannels;
        },
      },
      videoTags: {
        async get() {
          let videoTags = [];
          videoTags = await this.$backend.categories.getVideo();
          videoTags.forEach(tag => {
            tag.genres.unshift({
              id: 0,
              name: this.$lang.messages.buttons.all_genres,
              is_main: true,
            });
            tag.genres = tag.genres.filter(genre => genre.is_main === true);
          });
          this.currentVideoTag = videoTags[0];
          /* this.currentVideoTagGenre =
          this.currentVideoTag.genres.find(tagGenre => +tagGenre.id === +this.$route.query.tag); */
          // this.currentVideoTagGenre = this.currentVideoTag.genres[0];
          return videoTags;
        },
      },
    },
    watch: {
      async filter(value) {
        this.$store.commit('setFilteredChannels', await this.getChannelsByFilter(value));
      },
      filterVisible(value) {
        if (value) {
          this.$store.commit('setSpecialChannels', []);
        }
      },
    },
    methods: {
      scrollToTop() {
        document.getElementsByClassName('app-content')[0].scrollTop = 0;
      },
      goToMain() {
        this.$router.push({ name: 'Main', params: { page: 'home' } });
      },
      personal() {
        this.$router.push({ name: 'Main', params: { page: 'account' } });
        this.isShowSearchPage = false;
      },
      login() {
        this.$router.push({ name: 'Main', params: { page: 'login' } });
        this.isShowSearchPage = false;
      },
      toggleSearch() {
        this.isShowSearchPage = !this.isShowSearchPage;
      },
      openFilter() {
        this.tagsCollapse = !this.tagsCollapse;
      },
      selectTag(tag) {
        this.currentTag = tag;
        this.tagsCollapse = false;
        this.$store.commit('changeFilter', tag.filter);
        this.$router.push({ name: 'Main', params: { page: this.normalizedPage }, query: { tag: this.currentTag.filter.genre_id } });
      },
      resetGenre() {
        if (this.normalizedPage !== 'video' && this.previousPage !== 'video' && this.normalizedPage !== this.previousPage) {
          this.currentVideoTagGenre = this.currentVideoTag.genres[0];
        }
        this.previousPage = this.normalizedPage;
      },
      selectVideoGenre(genre) {
        this.tagsCollapse = false;
        this.currentVideoTagGenre = genre;
        this.$router.push({ name: 'Main', params: { page: this.normalizedPage }, query: { tag: this.currentVideoTagGenre.id } });
      },
      async getChannelsByFilter(filter) {
        let channels = [];
        if (filter === 'favorites') {
          channels = _.cloneDeep(this.$store.getters.favoriteChannels);
        } else {
          channels = await this.$backend.content.getChannels();
          if (filter !== null && filter.genre_id) {
            channels = channels.filter(e => e.genres.includes(filter.genre_id));
          }
          channels = channels.sort((a, b) => {
            if (a.priority === b.priority) {
              return b.rank - a.rank;
            }
            return a.priority < b.priority ? -1 : 1;
          });
        }
        return channels.map(x => x.channel_id);
      },
    },
    async mounted() {
      this.$root.mainContent = this.$refs.mainContent;
      this.$root.$on('hideFilters', () => {
        this.tagsCollapse = false;
      });
      this.$store.commit('setFilteredChannels', await this.getChannelsByFilter(this.filter));
    },
    activated() {
      Metric.getInstance().screenView('home');
    },
    async created() {
      /* if (this.normalizedPage === 'tv') {
        this.$store.commit('changeFilter', this.$route.query.tag);
        console.log(this.$route.query.tag);
        console.log(this.filter);
        this.$store.commit('setFilteredChannels',
        await this.getChannelsByFilter(this.$route.query.tag));
      } */
      this.$root.$on('closeSearch', () => { this.isShowSearchPage = false; });
    },
    updated() {
      if (this.videoTags) {
        switch (this.normalizedPage) {
          case 'video-cartoons':
            this.currentVideoTag = this.videoTags.find(tag => tag.id === 3);
            break;
          case 'video-films':
            this.currentVideoTag = this.videoTags.find(tag => tag.id === 1);
            break;
          case 'video-series':
            this.currentVideoTag = this.videoTags.find(tag => tag.id === 2);
            break;
          case 'video-shows':
            this.currentVideoTag = this.videoTags.find(tag => tag.id === 4);
            break;
          default: break;
        }
        this.resetGenre();
      }
    },
  };
</script>

<style scoped lang="scss">

  .main {
    text-align: left;
    position: relative;
    z-index: 3;

    &__content {
      position: relative;
      height: 100%;
      width: 100%;
      margin-left: 3.29rem;
    }

    .header {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
          -ms-flex-pack: justify;
              justify-content: space-between;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      color: white;
      background-color: #111111;
      font-size: .7rem;
      height: 2.5rem;
      position: relative;
      -webkit-box-shadow: 0 0px 5px 0 rgba(0,0,0,.5);
              box-shadow: 0 0px 5px 0 rgba(0,0,0,.5);
      top: 0;
      left: 0;
      width: 100%;
      -webkit-transition: .5s;
      transition: .5s;
      z-index: 4;
      transition: .5s;
      overflow: hidden;

      &__item {
        margin-left: 18rem;
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        border-bottom: 3px solid #67b437;
        padding: 0 1rem;
        -webkit-transition: .3s;
        transition: .3s;

        &:hover {
          background-color: $color-hover;
        }

        &-button {
          text-decoration: none;
          color: white;
        }
      }

      &__burger {
        width: 3.4rem;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        background-color: #111111;
        cursor: pointer;
        opacity: 0;
        font-size: 2rem;

        &-line {
          width: 1.5rem;
          height: 2px;
          background-color: white;
          position: relative;

          &:after {
            content: '';
            width: 1.5rem;
            height: 2px;
            background-color: white;
            position: absolute;
            top: 7px;
          }

          &:before {
            content: '';
            width: 1.5rem;
            height: 2px;
            background-color: white;
            position: absolute;
            bottom: 7px;
          }
        }
      }

      &__logo {
        height: 1.5rem;
        margin-left: 1.5rem;
        cursor: pointer;
      }

      &__items {
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
            -ms-flex-pack: justify;
                justify-content: space-between;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;

        &-phones {
          margin-left: 1.5rem;
          width: 12rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-pack: distribute;
              justify-content: space-around;
          margin-right: 5rem;
        }

        &-navs {
          margin-right: 1.5rem;
          width: 5rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
              -ms-flex-pack: justify;
                  justify-content: space-between;

          i {
            height: 2.5rem;
            width: 2.5rem;
            cursor: pointer;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
            -webkit-transition: .3s;
            transition: .3s;

            &:hover {
              background-color: $color-hover;
            }
          }
        }

        &-button {
          cursor: pointer;
          height: 100%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          padding: 0 1rem;
          -webkit-transition: .3s;
          transition: .3s;

          &:hover {
            background-color: $color-hover;
          }

          &_active {
            border-bottom: 2px solid rgb(103, 180, 55);
            -webkit-box-shadow: 0 12px 19px -12px rgba(103, 180, 55, 1);
                    box-shadow: 0 12px 19px -12px rgba(103, 180, 55, 1);
          }
        }
      }

      &:hover {
        width: 100% !important;
        color: white !important;

        .header__burger {
          opacity: 0 !important;
        }
      }
    
    }
  }

  .sidebar {
    background: $color-black;
    color: $color-text-simple;
    position: fixed;
    left: 0;
    height: 100%;
    width: 15.42rem;
    z-index: 100;
    -webkit-transform: translateX(-12rem);
            transform: translateX(-12rem);
    -webkit-transition: .4s;
    transition: .4s;

    &:hover {
      -webkit-transform: translateX(0);
              transform: translateX(0);

      .sidebar__item-full {
        opacity: 1;
      }

      .sidebar__item-full-name {
        opacity: 1;
      }

      .sidebar__item-short {
        opacity: 0;
      }
    }

    &__col {
      position: relative;
      z-index: 100;
      width: 100%;
      height: 100%;
      -webkit-transition-property: -webkit-transform;
      transition-property: -webkit-transform;
      transition-property: transform;
      transition-property: transform, -webkit-transform;
      -webkit-transition-duration: 500ms;
              transition-duration: 500ms;
      -webkit-transition-timing-function: ease-out;
              transition-timing-function: ease-out;
    }

    &__item {
      position: relative;
      white-space: nowrap;
      height: 2.5rem;
      -webkit-transition-property: -webkit-transform;
      transition-property: -webkit-transform;
      transition-property: transform;
      transition-property: transform, -webkit-transform;
      -webkit-transition-duration: 200ms;
              transition-duration: 200ms;
      -webkit-transition-timing-function: ease-out;
              transition-timing-function: ease-out;
      cursor: pointer;

      &:hover {
        background-color: rgb(224, 95, 32);
      }

      &_active {
        .sidebar__item-full {
          &-icon {
            color: #fff;
          }
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          opacity: 1;
          width: 100%;
          :after {
            content: '';
            background-color: $color-glow;
            -webkit-box-shadow: $shadow-glow;
                    box-shadow: $shadow-glow;
            position: absolute;
            right: 0;
            top: 0;
            height: 2.5rem;
            width: 0.125rem;
          }
        }
        .sidebar__item-short {
          &-icon {
            color: #fff;
          }
          opacity: 1;
        }
      }

      &-short,
      &-full {
        position: absolute;
        top: 0;
        height: 100%;
        -webkit-transition-property: opacity, -webkit-transform;
        transition-property: opacity, -webkit-transform;
        transition-property: opacity, transform;
        transition-property: opacity, transform, -webkit-transform;
        -webkit-transition-duration: 200ms;
                transition-duration: 200ms;
        -webkit-transition-timing-function: ease-out;
                transition-timing-function: ease-out;
        &-icon {
          color: #666;
          width: 3.4rem;
          text-align: center;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
              -ms-flex-direction: row;
                  flex-direction: row;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
        }
      }

      &-short {
        -webkit-transform: translateX(12rem);
                transform: translateX(12rem);
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 22%;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
            -ms-flex-direction: row;
                flex-direction: row;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        padding-left: 0 !important;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
      }

      &-full {
        opacity: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
            -ms-flex-direction: row;
                flex-direction: row;
        -webkit-box-pack: start;
            -ms-flex-pack: start;
                justify-content: flex-start;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        &-name {
          display: block;
          opacity: 0;
        }
      }
    }
  }

  .tags {
    background-color: $color-filter;
    color: $color-text-simple;
    position: fixed;
    top: 2.5rem;
    left: 5rem;
    height: calc(100vh - 2.5rem);
    width: 15.5rem;
    z-index: 3;
    -webkit-transform: translateX(-14.1rem);
            transform: translateX(-14.1rem);
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    -webkit-transition-duration: 200ms;
            transition-duration: 200ms;
    -webkit-transition-timing-function: ease-out;
            transition-timing-function: ease-out;
    cursor: pointer;
    -webkit-box-shadow: $shadow-dark;
            box-shadow: $shadow-dark;

    &_open {
      -webkit-transform: translateX(-1.6rem);
              transform: translateX(-1.6rem);
      overflow-y: auto;
      overflow-x: hidden;
    }

    &_genre {
      left: 5rem;
    }

    &__selected {
      -webkit-transition-property: -webkit-transform;
      transition-property: -webkit-transform;
      transition-property: transform;
      transition-property: transform, -webkit-transform;
      -webkit-transition-duration: 200ms;
              transition-duration: 200ms;
      -webkit-transition-timing-function: ease-out;
              transition-timing-function: ease-out;
      text-transform: capitalize;
      color: #e05f20;
      -webkit-transform: rotate(180deg);
              transform: rotate(180deg);
      -ms-writing-mode: tb-rl;
      -webkit-writing-mode: vertical-rl;
              writing-mode: vertical-rl;
      text-align: center;
      line-height: 3rem;
      width: 3rem;
      height: 100%;
      display: -ms-flexbox;
      display: -webkit-box;
      display: flex;
      -ms-flex-pack: end;
      -webkit-box-pack: end;
              justify-content: flex-end;
      padding-bottom: 5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      z-index: 200;
      position: absolute;
      top: 0;
      right: 0;
      background-color: #111111;
      opacity: 1;
    }

    &__item {
      position: relative;
      white-space: nowrap;
      height: 2.5rem;
      line-height: 2.5rem;
      padding: 0 0.5rem 0 1rem;
      opacity: 0;

      &_open {
        opacity: 1;
      }

      &-name {
        overflow: hidden;
        text-overflow: ellipsis;
        text-transform: capitalize;
      }
      &-count {
        float: right;
        padding: 0 0.5rem;
        background-color: $color-gray-medium;
        color: darken($color-text-simple, 20%);
        height: 1.5rem;
        line-height: 1.6rem;
        font-size: 0.875rem;
        margin: 0.5rem 0;
        border-radius: 0.5rem;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        opacity: 0;
        -webkit-transition-property: opacity;
        transition-property: opacity;
        -webkit-transition-delay: .3s;
                transition-delay: .3s;
        -webkit-transition-duration: 300ms;
                transition-duration: 300ms;
        -webkit-transition-timing-function: ease-out;
                transition-timing-function: ease-out;
      }

      &:hover {
        background-color: $color-hover;
        color: $color-text-simple;
      }
    }

  }

    .search-fade-enter-active {
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  .search-fade-leave-active {
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }

  .search-fade-enter {
    opacity: 0;
    -webkit-transform: scale(0);
            transform: scale(0);
  }

  .search-fade-leave-to {
    opacity: 0;
    -webkit-transform: scale(1);
            transform: scale(1);
  }

</style>
