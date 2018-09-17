<template>
  <div
      class="w-settings-item"
      @focus="$emit('focus')"
      @click="$emit('click')"
      data-xy-focusable tabindex="-1"
  >
    <span class="w-settings-item__label">{{ label }}</span>
    <span class="w-settings-item__control">
      <slot></slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'w-settings-item',
    props: ['label'],
  };
</script>

<style scoped lang="scss">
.w-settings-item {
  outline: none;
  border-bottom: 1px solid $color-gray-light;
  color: $color-text-simple;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  padding: 0 1.5rem;

  &__label {
    float: left;
  }
  &__control {
    float: right;
    height: 4rem;
  }

  &_active,
  {
    background-color: $color-hover;
  }
}
</style>

