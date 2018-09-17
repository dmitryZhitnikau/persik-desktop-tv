<template>
  <div class="p-context-menu" v-if="visible === true">
    <div class="p-context-menu__container">
      <button class="p-context-menu__button" v-if="list !== null" v-for="item in list" v-on:click="startFunction(item.id)" data-xy-focusable v-on:focus="focusHandler" tabindex="-1">{{item.btName}}</button>
      <button class="p-context-menu__button" v-on:click="closeContextMenu"data-xy-focusable v-on:focus="focusHandler" tabindex="-1">Close</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'p-context-menu',
    props: ['visible', 'list'],
    data() {
      return {
      };
    },
    watch: {
      visible() {
        if (this.visible === true) {
          setTimeout(() => {
            this.$emit('focusMe', this.$el);
          }, 0);
        }
      },
    },
    methods: {
      startFunction(id) {
        this.$cm.callFunc(id);
      },
      closeContextMenu() {
        this.$cm.close();
      },
      focusHandler(event) {
        this.$emit('focus', event);
      },
      onFocus(el) {
        this.$emit('focusMe', el);
      },
    },
  };
</script>

<style scoped lang="scss">
.p-context-menu {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.8;

  .p-context-menu__container {
    border: 3px solid orange;
    border-radius: 1rem;
    width: 17rem;
    height: auto;
    margin: 20% auto;
  }
  .p-context-menu__container[data-xy-focus] {
    border: 3px solid red;
  }
  .p-context-menu__button {
    margin: 0.3rem;
    width: 96%;
  }
  .p-context-menu__button[data-xy-focus] {
    border: 3px solid orange;
    background: orange;
  }
}
</style>
