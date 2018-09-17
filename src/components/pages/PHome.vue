<template>
  <div class="p-home">
    <w-placeholder v-if="showPlaceholder"></w-placeholder>
    <div v-else class="p-home__block">    

    <slick class="p-home__block-banner"
        ref="slick"
        :options="bannerSlickOptions">
          <div class="banner-slide">
            <img class="banner-slide__img" src="../../assets/move-up.jpg" alt="" v-on:click="bannerRedirect('content', 'video', 818173)">
            <div class="banner-slide__nav">
              <div class="banner-slide__nav-btn banner-slide__nav-btn_show" v-on:click="bannerRedirect('content', 'video', 818173)">Смотреть фильм</div>
              <div class="banner-slide__nav-btn banner-slide__nav-btn_favorite" v-if="authorized" v-on:click="bannerToFavorite(818173, 'video')">
                <i class="fa fa-bookmark" v-bind:style="isFavorite(818173, 'video') ? 'color: #e05f20' : ''"></i>
                Добавить в избранное
              </div>
            </div>
          </div>
          <div class="banner-slide">
            <img class="banner-slide__img" src="../../assets/men-films.jpg" alt="" v-on:click="bannerRedirect('channel', null, 10368)">
            <div class="banner-slide__nav">
              <div class="banner-slide__nav-btn banner-slide__nav-btn_show" v-on:click="bannerRedirect('channel', null, 10368)">Смотреть канал</div>
              <div class="banner-slide__nav-btn banner-slide__nav-btn_favorite" v-if="authorized" v-on:click="bannerToFavorite(10368, 'channel')">
                <i class="fa fa-bookmark" v-bind:style="isFavorite(10368, 'channel') ? 'color: #e05f20' : ''"></i>
                Добавить в избранное
              </div>
            </div>
          </div>
          <div class="banner-slide">
            <img class="banner-slide__img" src="../../assets/slim.jpg" alt="" v-on:click="bannerRedirect('content', 'video', 818289)">
            <div class="banner-slide__nav">
              <div class="banner-slide__nav-btn banner-slide__nav-btn_show" v-on:click="bannerRedirect('content', 'video', 818289)">Смотреть фильм</div>
              <div class="banner-slide__nav-btn banner-slide__nav-btn_favorite" v-if="authorized" v-on:click="bannerToFavorite(818289, 'video')">
                <i class="fa fa-bookmark" v-bind:style="isFavorite(818289, 'video') ? 'color: #e05f20' : ''"></i>
                Добавить в избранное
              </div>
            </div>
          </div>
          <!-- <div class="banner-slide">
            <img class="banner-slide__img" src="../../assets/borg.jpg" alt="" v-on:click="bannerRedirect('content', 'tvshow', '342018090703356600')">
            <div class="banner-slide__nav">
              <div class="banner-slide__nav-btn banner-slide__nav-btn_show" v-on:click="bannerRedirect('content', 'tvshow', '342018090703356600')">Смотреть фильм</div>
              <div class="banner-slide__nav-btn banner-slide__nav-btn_favorite" v-if="authorized" v-on:click="bannerToFavorite('342018090703356600', 'tvshow')">
                <i class="fa fa-bookmark" v-bind:style="isFavorite('342018090703356600', 'tvshow') ? 'color: #e05f20' : ''"></i>
                Добавить в избранное
              </div>
            </div>
          </div> -->
    </slick>
      
      <b-channels class="p-home__channels" v-if="channels !== null" :title="$lang.messages.home.live" :channels="channels" :isHaveRedirect="true" :isStub="true"></b-channels>
      <b-videos
        class="p-home__videos"
        v-for="section in featured"
        :key="section.name"
        :title="section.name"
        :items="section.items"
        :mode="section.mode"
        :isStub="true"
      ></b-videos>      

    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import BChannels from '@/components/blocks/BChannels';
  import Slick from 'vue-slick';
  import BVideos from '@/components/blocks/BVideos';
  import WPlaceholder from '@/components/widgets/WPlaceholder';
  import Metric from '@/persik/platform/Metric';
  import utils from '@/mixins/utils';
  import favorite from '@/mixins/favorite';

  const UPDATE_INTERVAL = 3600;

  export default {
    name: 'p-home',
    mixins: [utils, favorite],
    components: {
      BChannels,
      BVideos,
      WPlaceholder,
      Slick,
    },
    data() {
      return {
        channels: [],
        featured: [],
        showPlaceholder: true,
        lastUpdate: 0,
        bannerSlickOptions: {
          slidesToShow: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          autoplaySpeed: 5000,
        },
      };
    },
    computed: {
      connected() {
        return this.$store.getters.getConnectionStatus;
      },
      wrapper() {
        return document.getElementsByClassName('app-content')[0];
      },
      authorized() {
        return this.$store.getters.getAuthorized;
      },
    },
    watch: {
      channels() {
        this.$store.commit('setSpecialChannels', this.channels);
      },
    },
    activated() {
      Metric.getInstance().screenView('home');
      this.updateTimer = setInterval(this.lazyUpdate.bind(this), UPDATE_INTERVAL * 1000);
      this.lazyUpdate();
      this.$store.commit('setSpecialChannels', this.channels);
      this.reInit();
    },
    deactivated() {
      clearInterval(this.updateTimer);
    },
    methods: {
      isFavorite(id, content) {
        return this.checkFavorite(id, content);
      },
      bannerRedirect(content, type, id) {
        if (content === 'content') {
          this.$router.push({
            name: 'Main',
            params: { page: 'video' },
            query: { type, id },
          });
        } else {
          this.$router.push({ name: 'PlayerLive', params: { load: true, channelId: id } });
        }
      },
      bannerToFavorite(id, content) {
        if (!this.isFavorite(id, content)) {
          this.addToFavorite(id, content);
        } else {
          this.removeFromFavorite(id, content);
        }
      },
      reInit() {
        if (this.$refs.slick) {
          this.$nextTick(() => {
            this.$refs.slick.reSlick();
          });
        }
      },
      lazyUpdate() {
        if (this.lastUpdate < (moment().unix() - UPDATE_INTERVAL)) {
          this.loadData();
          this.lastUpdate = moment().unix();
        }
      },
      async loadData() {
        await this.loadChannels();
        await this.loadFeatured();
      },
      async loadFeatured() {
        const featured = await this.$backend.featured.getIndex();
        for (let i = 0; i < featured.length; i += 1) {
          const section = featured[i];
          section.mode = section.type === 'video' ? 'vertical' : 'horizontal';
          section.items = this.arrayToItems(section.videos);
        }
        this.featured = featured;
      },
      async loadChannels() {
        const { channels } = await this.$backend.featured.getChannels(10);
        this.channels = channels.map((x) => x.channel_id);
        this.contentReady();
      },
      contentReady() {
        this.showPlaceholder = false;
      },
    },
  };
</script>

<style scoped lang="scss">

  .p-home {
  background: $color-gray-dark;

  &__block {
    position: relative;
    width: 100%;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    -webkit-transition-duration: 500ms;
            transition-duration: 500ms;
    -webkit-transition-timing-function: ease-out;
            transition-timing-function: ease-out;
    overflow-x: hidden;

    
    &_logo{
      display: block;
      margin: 0 auto;
      margin-top: 1.67rem;
      max-width: 7rem;
      max-height: 2rem;
    }
  }
  &__videos {
    margin-bottom: 2rem;
  }
}

.banner-slide {
    position: relative;
  
    &__nav {
      position: absolute;
      bottom: .9rem;
      left: calc(50% - 15rem);
      width: 30rem;
      height: 2.5rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: center;
  
      &-btn {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        padding: 0 2rem;
        color: white;
        font-weight: bold;
        border-radius: .5rem;
        height: 2.5rem;
        -webkit-transition: .2s;
        transition: .2s;
        margin-right: 3rem;
        cursor: pointer;
  
        &:last-child {
          margin-right: 0;
        }
  
        &_show {
          background-color: #e05f20;
  
          &:hover {
            background-color: #dd6a30;
          }
        }
  
        &_favorite {
          background-color: transparent;
          font-weight: 100;
  
          i {
            opacity: .7;
            padding-right: .5rem;
          }
  
          &:hover {
            color: #e05f20;
          }
        }
      }
    }
  
    &__img {
      width: 100%;
    }
  }

</style>
