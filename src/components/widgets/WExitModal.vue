<template>
  <div class="alert">
    <div class="alert__modal" data-xy-group>
        {{ $lang.messages.exit.title }}
        <div class="button-group">
            <div class="button" data-xy-focusable tabindex="-1" v-on:click="exitApp">{{ $lang.messages.exit.yes }}</div>
            <div class="button" data-xy-focusable tabindex="-1" v-on:click="closeModal">{{ $lang.messages.exit.no }}</div>
        </div>        
    </div>
  </div>
</template>

<script>

  export default {
    name: 'w-exit-modal',
    props: ['closeExitModal'],
    data() {
      return {
        lastId: 0,
      };
    },
    mounted() {
      this.$root.$emit('focus', this.$el);
    },
    methods: {
      closeModal() {
        this.closeExitModal();
      },
      exitApp() {
        window.close();
      },
    },
  };
</script>

<style scoped lang="scss">

.alert {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 999;
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;

  &__modal {
    width: 20rem;
    height: 15rem;
    background-color: black;
    border-top: 3px solid #e05f20;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    color: white;

    .button-group {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin-top: 3rem;
      width: 12rem;
      -ms-flex-pack: distribute;
          justify-content: space-around;

      .button {
        width: 5rem;
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
        background-color: black;
        color: white;
        border: 1px solid #e05f20;

        &[data-xy-focus] {
          background-color: #e05f20;
        }
      }
    }
  }
}

</style>
