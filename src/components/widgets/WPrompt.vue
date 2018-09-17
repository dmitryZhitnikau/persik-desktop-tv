<template>
  <div class="w-prompt" :class="'w-prompt_'+ type">
    <div class="w-prompt__box">
      <div class="w-prompt__box-title">{{ title }}</div>
      <div class="w-prompt__box-input">{{ visibleText }}</div>
      <span v-if="errorMessage" class="w-prompt__box-message">{{ errorMessage }}</span>

        <div class="w-prompt__box-buttons" ref="buttons">
          <w-button
              v-for="(button, index) in buttons"
              :key="index"
              class="w-prompt__box-buttons-button"
              :active="index === activeButtonIndex"
              @click="actionHandler(index)"
              :caption="button.title"
          ></w-button>
        </div>
    </div>        
  </div>
</template>

<script>

  import _ from 'lodash';
  import WButton from '@/components/widgets/WButton';

  export default {
    name: 'w-prompt',
    /**
     * extraButtons[] = [{ String title, String action }, ...]
     */
    props: ['id', 'title', 'type', 'maxLength', 'extraButtons', 'errorMessage'],
    components: {
      WButton,
    },
    data() {
      return {
        text: '',
        activeButtonIndex: -1,
      };
    },
    computed: {
      visibleText() {
        if (this.type === 'password' || this.type === 'pin') {
          return this.text.replace(/./g, '*');
        }
        return this.text;
      },
      buttons() {
        return [
          { title: this.$lang.messages.buttons.ok, action: this.actionOk.bind(this) },
          { title: this.$lang.messages.buttons.cancel, action: this.close.bind(this) },
          ...this.extraButtons || [],
        ];
      },
      keyboardType() {
        if (this.type === 'pin') {
          return 'int';
        }
        return this.type;
      },
    },
    watch: {
      id() {
        this.text = '';
      },
    },
    created() {},
    mounted() {
      this.$root.$emit('focus', this.$el);
    },
    destroyed() {},
    methods: {
      keyboardReachBound(bound) {
        if (bound === 'bottom') {
          this.$root.$emit('focus', this.$refs.buttons);
          this.activeButtonIndex = 0;
        }
      },
      actionHandler(index) {
        const action = this.buttons[index].action;
        if (_.isFunction(action)) {
          action();
        } else {
          this.$emit(action);
        }
      },
      actionOk() {
        this.$emit('return', this.text);
      },
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style lang='scss'>
  
  .w-prompt {
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

  &__box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    padding: 2rem;
    border: 1px solid $color-gray-light;
    -webkit-box-shadow: $shadow-big;
            box-shadow: $shadow-big;
    background-color: $color-gray-dark;

    &-title {
      text-align: center;
      margin-bottom: 1rem;
    }

    &-input {
      width: 100%;
      height: 3rem;
      background-color: $color-text-simple;
      color: $color-black;
      margin: 0 auto;
      margin-bottom: 1rem;
      text-align: center;
      line-height: 3rem;
      font-size: 2rem;
    }

    &-message {
      text-align: center;
      color: red;
    }

    &-buttons {
      outline: none;

      &-button {
        margin-top: 1rem;
      }
    }
  }

  &_pin {
    .w-prompt__box {
      width: 16rem;
    }
    .w-prompt__box-input {
      width: 9rem;
      letter-spacing: 1rem;
      padding-left: 1rem;
    }
  }
}

</style>
