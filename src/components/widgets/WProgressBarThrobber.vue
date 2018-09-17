<template>
  <img  v-if="inShow" id="throbber" src="../../assets/Spinner.gif" height="200" width="200"/>
</template>

<script>
  export default {
    name: 'w-progress-bar-throbber',
    props: ['inShow'],
    data() {
      return {
      };
    },
  };
</script>

<style lang="scss">
  #throbber{
    display: inline-block;
    width: 1rem;
    height: 1rem;
    z-index: 200;
    position: absolute;
    top: 0.1rem;
    right: 0.2rem;
  }
</style>
