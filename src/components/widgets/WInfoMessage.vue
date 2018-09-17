<template>
  <div class="notify" v-bind:class="[index === 0 ? 'notify_active': '']">

        <div class="notify__message">
          <span v-html="notify.message"></span>
        </div>

        <div class="notify__buttons">
          <button class="notify__buttons-button" v-bind:class="[activeButtonId === 0? 'notify__buttons-button_hover' : '']" v-on:click="deleteMessage(notify.id)">Закрыть</button><br>
          <button class="notify__buttons-button" v-bind:class="[activeButtonId === 1? 'notify__buttons-button_hover' : '']" v-if="hasExtraButtons" v-on:click="doAction()">{{notify.btName}}</button>
        </div>

  </div>
</template>

<script>

  export default {
    name: 'w-info-message',
    props: ['notify', 'active', 'index'],
    data() {
      return {
        activeButtonId: 0,
      };
    },
    computed: {
      hasExtraButtons() {
        return this.notify.btName !== undefined && this.notify.fnName !== '';
      },
    },
    created() {},
    destroyed() {},
    methods: {
      deleteMessage(id) {
        this.$nm.deleteNotif(id);
      },
      doAction() {
        this.$nm.callFunc(this.notify.id);
      },
    },
  };
</script>

<style scoped lang="scss">

  .notify {
  width: 100%;
  height: auto;
  border: 1px solid $color-text-muted;
  background-color: $color-gray-medium;
  -webkit-box-shadow: $shadow-big;
          box-shadow: $shadow-big;

  text-align: center;
  padding-bottom: .5rem;
  margin-bottom: 1.5rem;

  &_active {
    border-bottom: .33rem solid $color-hover;
  }

  &__message {
    margin-top: 1rem;
    word-wrap: break-word;
    margin-bottom: 1rem;
    color: $color-text-simple;
    font-size: .75rem;
    padding: 0 1.25rem;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }

  &__buttons {
    
    &-button {
      background-color: $color-black;
      color: $color-text-simple;
      border: none;
      width: 10rem;
      text-transform: uppercase;
      height: 2.08rem;
      margin-bottom: .83rem;
      font-size: .67rem;
      &_hover {
        background-color: $color-hover;
      }

    }
  }
}

</style>
