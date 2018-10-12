<template>
  <div id="app">
    <div v-if="$backend.settings.getDeveloperMode()" class="dev-menu">
      <span v-if="$backend.code.includes('b2b')">
        B2B: <a href="#" @click="switchToNet(0)">More TV</a>  <a href="#" @click="switchToNet(1)">WikiLink</a> <a href="#" @click="switchToNet(2)">Velcom</a>|
      </span>
      <w-memory-usage style="display: inline-block"></w-memory-usage> |
      <w-crazy-monkey></w-crazy-monkey>
      <router-link to="/player-test" tag="button"><i class="fa fa-play"></i></router-link>
      <button v-on:click="requestFullscreen"><i class="fa fa-expand"></i></button>
    </div>
    <div class="app-content" v-on:scroll="scrollHandler" ref="content">
      <w-connection-status></w-connection-status>
      <w-notifications></w-notifications>
      <w-modal v-if="progressModal!=null" :modal="progressModal"></w-modal>
      <keep-alive include="main">
        <router-view v-if="ready"></router-view>
      </keep-alive>
      <w-prompts></w-prompts>

      <transition name="fade-arrowup">
        <div class="up-arrow" v-show="isShowUpArrow" v-on:click="scrollToTop">
          <i class="fa fa-chevron-up"></i>
        </div>
      </transition>

      <w-exit-modal v-if="isExitNeeded" :closeExitModal="closeExitModal"></w-exit-modal>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Scroller from '@/persik/ui/Scroller';
  import EpgManager from '@/persik/service/EpgManager';
  import WProgressBarLine from '@/components/widgets/WProgressBarLine';
  import PContextMenu from '@/components/pages/PContextMenu';
  import WNotifications from '@/components/widgets/WNotifications';
  import WModal from '@/components/widgets/WModal';
  import WConnectionStatus from '@/components/widgets/WConnectionStatus';
  import WMemoryUsage from '@/components/widgets/WMemoryUsage';
  import WCrazyMonkey from '@/components/widgets/WCrazyMonkey';
  import WPrompts from '@/components/widgets/WPrompts';
  import WExitModal from '@/components/widgets/WExitModal';

  function delay(timeInterval) {
    return new Promise((resolve) => {
      setTimeout(() => { resolve(); }, timeInterval);
    });
  }

  const epgManager = EpgManager.getInstance();

  export default {
    components: {
      WPrompts,
      WCrazyMonkey,
      WProgressBarLine,
      PContextMenu,
      WNotifications,
      WModal,
      WConnectionStatus,
      WMemoryUsage,
      WExitModal,
    },
    name: 'app',
    props: ['username'],
    data() {
      return {
        epg: null,
        baseFontSize: 16,
        showInfo: false,
        progressModal: null,
        contextButtons: [],
        contextMenuVisible: false,
        isExitNeeded: false,
        exitCounter: 0,
        isShowUpArrow: false,
        scrollTimer: null,
        readyFlag: {
          epg: false,
        },
      };
    },
    computed: {
      ready() {
        return this.readyFlag.epg;
      },
      connected() {
        return this.$store.getters.getConnectionStatus;
      },
      authorized() {
        return this.$store.getters.getAuthorized;
      },
    },
    watch: {
      async connected(value) {
        if (value) {
          try {
            if (!this.readyFlag.epg) {
              await this.loadEpg();
            }
          } catch (e) {
            this.$nm.showError(e.message);
          }
        }
      },
    },
    async created() {
      console.log('App created');

      this.$lang.setLang('ru');

      this.$store.commit('authorized', this.$backend.authorized);

      setInterval(this.syncVuexWithBackend.bind(this), 3600000);
      await this.syncVuexWithBackend();


      this.$root.$on('scrollTo', (el) => {
        Scroller.scrollTo(el);
      });
      this.$root.$on('afterReset', () => {
        this.readyFlag.epg = false;
        this.$router.push('/');
        this.$nm.showMessage(this.$lang.messages.messages.data_reset, 0,
          this.$lang.messages.messages.reloading, () => window.location.reload(),
        );
      });

      epgManager.addEventListener(EpgManager.PROGRESS_CHANGE, (func, value) => {
        this.progressModal = {
          id: 100,
          contentType: 'progress',
          header: '',
          title: '',
          progress: value,
        };
      });
      epgManager.addEventListener(EpgManager.COMPLETE, () => {
        this.progressModal = null;
      });
    },
    async mounted() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
      window.app = this;
      if (this.connected) {
        const isTimeChecked = await this.$backend.utils.checkTime();
        if (!isTimeChecked) {
          this.$nm.showMessage(this.$lang.messages.messages.check_time_settings, 0);
        }
      }
      this.$root.$on('navigateBack', this.navigateBack);
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },
    updated() {},
    methods: {
      scrollToTop() {
        /* const scrollInterval = setInterval(() => {
          if (this.$refs.content.scrollTop > 0) {
            this.$refs.content.scrollTop = this.$refs.content.scrollTop - 10;
          } else {
            clearInterval(scrollInterval);
          }
        }, 1); */
        this.$refs.content.scrollTop = 0;
      },
      scrollHandler(t) {
        const delta = t.target.scrollHeight - (t.target.scrollTop + t.target.clientHeight);
        clearInterval(this.scrollTimer);
        if (delta < 500) {
          this.scrollTimer = setTimeout(() => {
            this.$root.$emit('bottomIsClose');
          }, 500);
        }
        if (t.target.scrollTop > 0) {
          this.isShowUpArrow = true;
        } else {
          this.isShowUpArrow = false;
        }
        let headerHeight = 0;
        if (document.getElementsByClassName('header')[0]) {
          headerHeight = document.getElementsByClassName('header')[0].getBoundingClientRect().height;
        }
        if (headerHeight >= t.target.scrollTop) {
          const result = headerHeight - t.target.scrollTop;
          const header = document.getElementsByClassName('header')[0];
          if (document.getElementsByClassName('sidebar')[0]) {
            document.getElementsByClassName('sidebar')[0].style.top = `${result}px`;
          }
          if (header) {
            header.style.position = 'relative';
            header.style.width = '100%';
            header.style.color = 'white';
          }
          if (document.getElementsByClassName('header__burger')[0]) {
            document.getElementsByClassName('header__burger')[0].style.opacity = 0;
          }
          const tags = document.getElementsByClassName('tags')[0];
          if (tags) {
            tags.style.top = `${headerHeight}px`;
            tags.style.height = 'calc(100vh - 2.5rem)';
          }
        } else {
          document.getElementsByClassName('sidebar')[0].style.top = `${headerHeight}px`;
          const header = document.getElementsByClassName('header')[0];
          if (header) {
            header.style.position = 'fixed';
            header.style.width = '3.4rem';
            header.style.color = '#111111';
          }
          document.getElementsByClassName('header__burger')[0].style.opacity = 1;
          const tags = document.getElementsByClassName('tags')[0];
          if (tags) {
            tags.style.top = 0;
            tags.style.height = '100vh';
          }
        }
      },
      closeExitModal() {
        this.isExitNeeded = false;
      },
      async loadEpg() {
        console.log('App epgm init:');
        let repeatCounter = 3;
        while (repeatCounter > 0) {
          repeatCounter -= 1;
          try {
            // eslint-disable-next-line
            await epgManager.init();
            console.log('App epgm inited');
            this.readyFlag.epg = true;
            return;
          } catch (e) {
            console.error(e);
            if (repeatCounter > 0) {
              // eslint-disable-next-line
              await delay(2000);
            } else {
              this.$nm.showMessage(
                `${this.$lang.messages.messages.reloading_error}.<br>${e}`, 0,
                this.$lang.messages.messages.reloading, () => window.location.reload(),
              );
            }
          }
        }
      },
      handleResize() {
        this.baseFontSize = (16 * this.$el.clientWidth) / 1280;
        $('html').css({ fontSize: this.baseFontSize });
      },
      requestFullscreen() {
        const elem = this.$el.querySelector('.app-content');
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }
      },
      navigateBack() {
        const levelUpRoute = this.$router.getLevelUpRoute();
        if (!levelUpRoute) {
          if (this.exitCounter === 0) {
            this.$root.$emit('focusMenu');
            this.exitCounter += 1;
          } else {
            this.isExitNeeded = true;
            this.exitCounter = 0;
          }
        } else {
          this.$router.push(levelUpRoute);
        }
      },
      switchToNet(net) {
        localStorage.setItem('network_id', net);
        location.reload();
      },
    },
  };
</script>

<style lang="scss">

  @import url('../node_modules/normalize.css/normalize.css');
  @import url('../node_modules/ragrid/ragrid.css');
  @import url('./assets/fonts/fonts.css');
  @import url('../node_modules/fontawesome5-webfont/css/fontawesome-all.css');

  .slick-track {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .slick-list {
    overflow: hidden;
    width: 68rem;
  }

  .p-home__block-banner {
    position: relative;
        .slick-list {
          overflow: hidden;
          width: calc(100% - 3rem);
        }

        .banner {
          background-image: url('https://media.persik.by/banners/2018-04/banner.jpg');
          height: 15rem;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          margin-bottom: 2rem;
        }

        .slick-arrow {
          display: block !important;
          position: absolute;
          top: 0;
          width: 6rem;
          height: 100%;
          z-index: 2;
          border: none;
          opacity: 0;
          cursor: pointer;
          -webkit-user-select: none;
             -moz-user-select: none;
              -ms-user-select: none;
                  user-select: none;
        }

        .slick-prev {
          left: 0;
        }

        .slick-next {
          right: 3rem;
        }
  }

  .slick-dots {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 9rem;
    height: 1rem;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -ms-flex-pack: distribute;
        justify-content: space-around;
    align-items: center;
    position: absolute;
    right: 9rem;
    bottom: 1.4rem;

    .slick-active {
      background-color: rgba(103, 180, 55, .6);;
    }

    .slick-active:after {
      content: '';
      width: .8rem;
      height: .8rem;
      border-radius: 50%;
      position: absolute;
      -webkit-box-shadow: 0 0 5px 1px rgba(103,180,55, .5);
              box-shadow: 0 0 5px 1px rgba(103,180,55, .5);
      top: -.1rem;
      left: -.1rem;
    }

    li {
      display: block;
      width: .6rem;
      height: .6rem;
      background-color: rgba(255, 255, 255, .6);
      border-radius: 50%;
      cursor: pointer;
      list-style-type: none;
      -webkit-transition: .5s;
      transition: .5s;
      position: relative;

      &:hover {
        background-color: rgb(255, 255, 255);
      }
    }

    button {
      display: none;
    }
  }

  .slick-arrow {
    display: none !important;
  }

  .up-arrow {
    position: fixed;
    right: .8rem;
    bottom: 2rem;
    width: 3rem;
    height: 3rem;
    z-index: 3;
    border-radius: 50%;
    background-color: rgba(224, 95, 32, 0.5);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-transition: .4s;
    transition: .4s;
    cursor: pointer;

    &:hover {
      background-color: rgb(224, 95, 32);
      color: white;
    }
  }

  .section-title {
    margin-top: 0;
    margin-left: 6rem;
    font-size: 1.5rem;
    text-transform: capitalize;
    color: white;
  }

  ::-webkit-scrollbar-button {
    width:10px;
    height:0px
  }

  ::-webkit-scrollbar-track {
    background-color: #393939;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background-color:rgba(224, 95, 32, .6);
  }

  ::-webkit-scrollbar-thumb:hover{
    background-color:rgb(224, 95, 32);
  }

  ::-webkit-resizer {
    width:8px;
    height:0px;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  body {
    padding: 0;
    margin: 0;
    background: #1b1b1b;
  }

  *:focus {
    outline: none;
  }

  #player_window{
    position: absolute;
    width: 100%;
    left: 0;
    height: 100vh;
    -o-object-fit: contain;
       object-fit: contain;
    background-color: #000;
    top: 0;
    z-index: 0;
  }

  #app {
    font-family: 'Roboto Condensed', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .app-content {
    width: 100%;
    min-height: 550px;
    height: 100vh;
    text-align: left;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .dev-menu{
    color: white;
    background: rgba(100, 100, 100, 0.5);
    -ms-flex-pack: distribute;
        justify-content: space-around;
    position: fixed;
    z-index:150;
    right:0;
  }

  .dev-menu a{
    color: orange;
  }
  .dev-menu a:active{
    color: orangered;
  }


.fade-arrowup-enter-active {
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  .fade-arrowup-leave-active {
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }

  .fade-arrowup-enter {
    opacity: 0;
    -webkit-transform: scale(0);
            transform: scale(0);
  }

  .fade-arrowup-leave-to {
    opacity: 0;
    -webkit-transform: scale(2);
            transform: scale(2);
  }
</style>

