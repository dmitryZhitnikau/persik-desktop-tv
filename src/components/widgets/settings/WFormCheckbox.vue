<template>
  <div
      class="w-form-checkbox"
      :class="{'w-form-checkbox_checked': checked}"
  >
    <div class="w-form-checkbox__button"></div>
  </div>
</template>

<script>
  export default {
    name: 'w-form-checkbox',
    props: ['checked'],
  };
</script>

<style lang="scss">
.w-form-checkbox {
  display: inline-block;
  width: 2.5rem;
  height: 1.5rem;
  border: 0.125rem solid $color-text-muted;
  border-radius: 0.75rem;
  position: relative;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  vertical-align: middle;
  margin-left: 1rem;

  &__button {
    position: absolute;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin: 0.125rem;
    background-color: $color-text-muted;
    left: 0;
    -webkit-transition: left 0.5s;
    transition: left 0.5s;
  }
  &_checked {
    .w-form-checkbox__button {
      background-color: $color-glow;
      left: 1rem;
    }
  }
}

</style>
