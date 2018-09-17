<template>
  <div>
    <div class="modal-progress" v-if="modal.contentType==='progress'">
      <div class="modal-progress__wrapper">
        <img class="modal-progress__wrapper-logo" :src="$backend.logo">
        <div class="modal-progress__wrapper-progress-bar">
          <div class="modal-progress__wrapper-progress-bar-line" :style="{ width: modal.progress + '%' }"></div>
        </div>
        <div class="modal-progress__wrapper-progress-status">{{ modal.progress }}%</div>
      </div>
    </div>

    <div class="modal-simple" v-if="modal.contentType === 'simple'">
      <div class="modal-simple__info">
        <div class="modal-simple__info-text">
          <span v-html="modal.message"></span>
        </div>
         <div class="modal-simple__info-button" @click="closeModal">OK</div>
      </div>
    </div>

    <div class="modal-simple"  v-if="modal.contentType === 'sample' || modal.contentType === 'channel' || modal.contentType === 'tvshow' || modal.contentType === 'video'">
      <div class="modal-simple__group">
        <div v-for="(item, index) in contextMenu" :key="index" v-on:click="item.action" class="modal-simple__group-button" v-bind:class="{'modal-simple__group-button_hover': activeButtonIndex === index}">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import favorite from '@/mixins/favorite';

  export default {
    name: 'w-modal',
    props: ['modal'],
    mixins: [favorite],
    components: {},
    data() {
      return {
        contextMenu: [],
        activeButtonIndex: 0,
      };
    },
    created() {},
    mounted() {
      this.$root.$emit('focus', this.$el);
      this.initializeContextMenu();
    },
    destroyed() {},
    computed: {
      authorized() {
        return this.$store.getters.getAuthorized;
      },
    },
    methods: {
      initializeContextMenu() {
        const type = this.modal.contentType;
        const mode = this.modal.contentMode;
        const isFavorite = this.isFavorite();
        const items = {
          addFavorite: { name: this.$lang.messages.context.add_favorite, action: this.addFavorite },
          removeFavorite: {
            name: this.$lang.messages.context.remove_favorite,
            action: this.removeFavorite,
          },
          watchChannel: {
            name: this.$lang.messages.context.watch,
            action: this.watchChannel,
          },
          watchVideo: { name: this.$lang.messages.context.watch, action: this.watchVideo },
          info: { name: this.$lang.messages.context.show_info, action: this.showInfo },
          sample: {
            name: this.$lang.messages.context.add_favorite,
            action: () => {
              this.$root.$emit('contextSampleClicked');
            },
          },
          close: { name: this.$lang.messages.context.close, action: this.closeModal },
        };

        if (type === 'sample') {
          this.contextMenu.push(items.sample);
        }

        if (type === 'channel') {
          this.contextMenu.push(items.watchChannel);
          if (this.authorized) {
            this.contextMenu.push(isFavorite ? items.removeFavorite : items.addFavorite);
          }
        }
        if (type === 'video') {
          this.contextMenu.push(items.info);
          this.contextMenu.push(items.watchVideo);
          if (this.authorized) {
            this.contextMenu.push(isFavorite ? items.removeFavorite : items.addFavorite);
          }
        }
        if (type === 'tvshow') {
          switch (mode) {
            case 'archive':
              this.contextMenu.push(items.info);
              this.contextMenu.push(items.watchVideo);
              if (this.authorized) {
                this.contextMenu.push(isFavorite ? items.removeFavorite : items.addFavorite);
              }
              break;

            case 'live':
              this.contextMenu.push(items.watchChannel);
              this.contextMenu.push(items.info);
              if (this.authorized) {
                this.contextMenu.push(isFavorite ? items.removeFavorite : items.addFavorite);
              }
              break;

            case 'future':
              if (this.authorized) {
                this.contextMenu.push(isFavorite ? items.removeFavorite : items.addFavorite);
              }
              this.contextMenu.push(items.info);
              break;
  
            case 'past':
              this.contextMenu.push(items.info);
              break;
  
            default:
              break;
          }
        }
        this.contextMenu.push(items.close);
      },
      isFavorite() {
        return this.checkFavorite(this.modal.contentId, this.modal.contentType);
      },
      addFavorite() {
        this.addToFavorite(this.modal.contentId, this.modal.contentType);
      },
      removeFavorite() {
        this.removeFromFavorite(this.modal.contentId, this.modal.contentType);
      },
      showInfo() {
        this.$router.push({
          name: 'Main',
          params: { page: 'video' },
          query: { type: this.modal.contentType, id: this.modal.contentId },
        });
      },
      watchChannel() {
        this.$router.push({ name: 'PlayerLive', params: { load: true, channelId: this.modal.contentId } });
      },
      watchVideo() {
        this.$router.push({ name: 'PlayerVideo', params: { type: this.modal.contentType, id: this.modal.contentId } });
      },
      closeModal() {
        this.$nm.deleteModal(this.modal.id);
      },
    },
  };
</script>

<style lang="scss">
  
  .modal-simple {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color-black, 0.5);
  z-index: 500;
  color: $color-text-simple;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;

  &__info {
    width: 40%;
    text-align: center;
    padding: 2rem;
    border: 1px solid $color-gray-light;
    -webkit-box-shadow: $shadow-big;
            box-shadow: $shadow-big;
    background-color: $color-gray-dark;

    &-text {
      width: 100%;
    }

    &-button {
      width: 10rem;
      height: 2rem;
      color: $color-text-simple;
      background-color: $color-hover;
      outline: none;
      border: none;
      line-height: 2rem;
      margin: 1rem auto;
    }
  }

  &__group {
    width: 30%;
    background-color: $color-gray-medium;
    border: 1px solid $color-gray-light;
    -webkit-box-shadow: $shadow-big;
            box-shadow: $shadow-big;

    &-button {
      width: 100%;
      height: 3rem;
      text-align: center;
      line-height: 3rem;
      background: none;
      outline: none;
      border: none;
      color: $color-text-simple;
      &_hover {
        background-color: $color-hover;
      }
    }
  }
}


.modal-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $color-gray-medium;
  z-index: 500;
  color: $color-text-simple;

  &__wrapper {
    width: 17.5rem;
    margin: 15% auto;
    text-align: center;

    &-logo {
      max-width: 8.13rem;
      max-height: 3rem;
      margin-bottom: 2.08rem;
    }

    &-progress-bar {
      position: relative;
      width: 100%;
      height: .125rem;
      border-radius: .06rem;
      background-color: $color-gray-light;

      &-line {
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: .06rem;
        background-color: $color-glow;
        -webkit-box-shadow: $shadow-glow;
                box-shadow: $shadow-glow;

        -webkit-transition-property: width;

        transition-property: width;
        -webkit-transition-duration: 200ms;
                transition-duration: 200ms;
        -webkit-transition-timing-function: linear;
                transition-timing-function: linear;
      }
    }

    &-progress-status {
      margin-top: 1rem;
      font-size: .67rem;
    }
  }
}

</style>
