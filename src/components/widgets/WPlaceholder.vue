<template>
  <div class="placeholder" data-xy-focusable tabindex="-1">
    <looping-rhombuses-spinner
            :animation-duration="2500"
            :rhombus-size="15"
    />
  </div>
</template>

<script>
  import { LoopingRhombusesSpinner } from 'epic-spinners';

  export default {
    name: 'w-placeholder',
    components: {
      LoopingRhombusesSpinner,
    },
    data() {
      return {
      };
    },
  };
</script>

<style lang="scss">

  .placeholder{
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: $color-gray-dark;
  z-index: 98;
  text-align: center;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  font-size: 3rem;
}

</style>
