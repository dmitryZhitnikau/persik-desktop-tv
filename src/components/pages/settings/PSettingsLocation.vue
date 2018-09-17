<template>
  <div class="p-settings-location" data-xy-group-vertical data-xy-open-left>

    <div class="button-group" data-xy-group-horizontal data-xy-open-left>

      <div class="button" data-xy-focusable tabindex="-1" 
        v-bind:class="[curLang === 'ru'? 'button_active': null]"
        v-on:click="changeLocalization('ru')"
      >
        <img src="../../../assets/ru.png" alt="ru">
        Русский
      </div>

      <div class="button" data-xy-focusable tabindex="-1"
        v-bind:class="[curLang === 'en'? 'button_active': null]"
        v-on:click="changeLocalization('en')"
      >
        <img src="../../../assets/gb.png" alt="en">
        English
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'p-settings-location',
    props: [],
    data() {
      return {};
    },
    computed: {
      curLang() {
        return this.$lang.getLang();
      },
    },
    methods: {
      changeLocalization(lang) {
        if (lang !== this.curLang) {
          this.$lang.setLang(lang);
        }
      },
    },
  };
</script>

<style scoped lang="scss">

  .p-settings-location {
  padding: 1.5rem 2rem;

  .button-group {
    width: 22rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;

    .button {
      width: 10rem;
      height: 3rem;
      color: white;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: distribute;
          justify-content: space-around;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;

      &[data-xy-focus] {
        background-color: #e05f20;
      }

      &_active {
        border-bottom: 3px solid #e05f20;
      }
    }
  }
}

</style>
