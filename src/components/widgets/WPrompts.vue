<template>
  <div>
    <w-prompt
        v-if="promptData"
        v-bind="promptData"
        :id="id"
        @return="returnHandler"
        @close="cancelHandler"
        @change="changeHandler"
    ></w-prompt>
  </div>
</template>

<script>

  import WPrompt from '@/components/widgets/WPrompt';

  export default {
    name: 'w-prompts',
    components: {
      WPrompt,
    },
    data() {
      return {
        promptData: null,
        id: null,
      };
    },
    created() {
      this.$root.$on('prompt', (params) => {
        this.promptData = params;
        if (!params) {
          this.id = Math.random();
        }
      });
    },
    methods: {
      returnHandler(value) {
        this.promptData.returnHandler(value);
      },
      cancelHandler() {
        this.promptData.cancelHandler();
      },
      changeHandler(value) {
        if (this.promptData.changeHandler) {
          this.promptData.changeHandler(value);
        }
      },
    },
  };
</script>

<style lang='scss'>
  

</style>
