<template>
  <div
          class="e-column-channel"
          :class="{'e-column-channel_active': active}"
          :content-id="id"
          content-type="channel"
          @click="$emit('click')"
  >
    <div class="e-column-channel-num">{{ num }}</div>
    <div class="e-column-channel-logo" v-bind:style="{ backgroundImage: 'url(' + resize(logo, 48, 24) + ')'}"></div>
    <div class="e-column-channel-title">{{ name }}</div>
    <div class="e-column-channel-icon" v-on:click.stop="toggleFavorite" :title="isFavorite ? 'Удалить канал из избранного' : 'Добавить канал в избранное'" :class="{'e-column-channel-icon_favorite': isFavorite}">
        <i class="fa fa-bookmark"></i>
    </div>
  </div>
</template>

<script>

  import favorite from '@/mixins/favorite';
  import frames from '@/mixins/frames';
  import images from '@/mixins/images';

  export default {
    name: 'e-channel',
    props: ['id', 'num', 'active'],
    mixins: [favorite, frames, images],
    data() {
      return {
        name: null,
        logo: null,
      };
    },
    async created() {
      const channel = await this.$backend.content.getChannel(this.id);
      this.name = channel.name;
      this.logo = await this.getChannelLogo(this.id);
    },
    computed: {
      isFavorite() {
        return this.checkFavorite(this.id, 'channel');
      },
    },
    methods: {
      toggleFavorite() {
        if (this.isFavorite) {
          this.removeFromFavorite(this.id, 'channel');
        } else {
          this.addToFavorite(this.id, 'channel');
        }
      },
    },
  };
</script>

<style lang="scss">

  .e-column-channel {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  background: $color-gray-medium;
  padding: 1rem;
  white-space: nowrap;
  color: $color-text-simple;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  cursor: pointer;

  &-num {
    display: block;
    height: 1rem;
    width: 1.5rem;
    text-align: center;
    -ms-flex-negative: 0;
        flex-shrink: 0;
  }

  &-logo {
    display: block;
    margin-left: 1rem;
    height: 1rem;
    width: 2rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-filter: grayscale(100%) brightness(200%);
            filter: grayscale(100%) brightness(200%);
    -ms-flex-negative: 0;
        flex-shrink: 0;
  }

  &-title {
    display: block;
    margin-left: 1rem;
    height: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-flex: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
  }

  &-icon {
    margin-left: 0.5rem;
    color: $color-text-simple;
    -ms-flex-negative: 0;
        flex-shrink: 0;
    opacity: 0;
    -webkit-transition: .3s;
    transition: .3s;

    &_favorite {
      opacity: 1;
    }
  }

  &_active {
    color: $color-hover;
    font-weight: bold;
  }

  &:hover {
    background: $color-hover;
    color: $color-text-simple !important;
    font-weight: bold;

    .e-column-channel-icon {
      opacity: .5;

      &:hover {
        opacity: .7;
      }
    }
  }

  &:hover .e-column-channel_active {
    color: $color-text-simple !important;
  }
}

</style>
