<template>

    <div class="info" data-xy-group-horizontal data-xy-open-left>
        
        <div class="info__actor">

          <div class="info__actor-image">

          </div>

          <div class="info__actor-name">Стив Джобс</div>

        </div>

        <!-- <div data-xy-focusable tabindex="-1" class="back-btn">Назад</div> -->

        <div class="info__video-group" scrollable-y data-xy-group data-xy-open-left>

          <div class="b-videos__list-item" v-for="item in featured[0].items" :key="item.id">
            <e-video :type="item.type" :id="item.id" :mode="'horizontal'"></e-video>
          </div>

        </div>       

    </div>  

</template>

<script>

  import EActorFilm from '@/components/elements/EActorFilm';
  import EVideo from '@/components/elements/EVideo';
  import utils from '@/mixins/utils';

  export default {
    name: 'p-actor-info',
    mixins: [utils],
    props: ['id'],
    components: {
      EActorFilm,
      EVideo,
    },
    data() {
      return {
        featured: [],
      };
    },
    created() {
      this.loadFeatured();
    },
    deactivated() {},
    destroyed() {},
    mounted() {
      this.$root.$emit('focus', this.$el);
    },
    computed: {},
    methods: {
      async loadFeatured() {
        const featured = await this.$backend.featured.getIndex();
        for (let i = 0; i < featured.length; i += 1) {
          const section = featured[i];
          section.mode = section.type === 'video' ? 'vertical' : 'horizontal';
          section.items = this.arrayToItems(section.videos);
        }
        this.featured = featured;
      },
    },
  };
</script>

<style scoped lang="scss">

  .info {
  position: absolute;
  left: 3rem;
  width: 74rem;
  padding-left: 5rem;

  &__actor {
    margin-top: 2rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;

    &-image {
      background-image: url("https://24smi.org/public/media/235x307/celebrity/2015/10/29/1446106852-stiv-dzhobs.jpg");
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      width: 15rem;
      height: 20rem;
    }

    &-name {
      color: white;
      font-weight: bold;
      font-size: 2rem;
      margin-left: 2rem;
    }
    
  }

  &__video-group {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    margin-top: 2rem;
    height: 28rem;
    overflow: hidden;
    -webkit-transition: .5s;
    transition: .5s;

    &-item {
      width: 5rem;
      height: 5rem;
      color: white;
    }
  }

  .back-btn {
    width: 8rem;
    height: 2rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    border: 1px solid orange;
    color: orange;
    margin-top: 2rem;

    &[data-xy-focus] {
      background-color: orange;
      color: white;
    }
  }
}
</style>
