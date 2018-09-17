<template>
  <div
      class="w-button" @click="$emit('click')">{{ caption }}</div>
</template>

<script>
  export default {
    name: 'w-button',
    props: ['caption', 'active', 'width'],
  };
</script>

<style scoped lang="scss">
  .w-button {
  outline: none;
  border: 1px solid $color-gray-light;
  color: $color-text-simple;
  text-align: center;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  line-height: 3rem;
  width: 10rem;
  height: 3rem;
  cursor: pointer;

  &_active,
  &:hover {
    background-color: $color-hover;
  }
}
</style>

