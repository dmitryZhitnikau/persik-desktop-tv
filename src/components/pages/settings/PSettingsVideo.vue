<template>
  <div class="p-settings-video" data-xy-group-vertical data-xy-open-left>
    <w-settings-item :label="$lang.messages.settings.use_hls" @click="toggleUseHls()">
      <w-form-checkbox :checked="useHls"></w-form-checkbox>
    </w-settings-item>
  </div>
</template>

<script>
  import Metric from '@/persik/platform/Metric';
  import WSettingsItem from '@/components/widgets/settings/WSettingsItem';
  import WFormCheckbox from '@/components/widgets/settings/WFormCheckbox';

  export default {
    components: {
      WFormCheckbox,
      WSettingsItem,
    },
    name: 'p-settings-video',
    props: [],
    data() {
      return {
        useHls: this.$backend.settings.getVideoUseHls(),
      };
    },
    methods: {
      async toggleUseHls() {
        this.useHls = !this.useHls;
        this.$backend.settings.setVideoUseHls(this.useHls);
      },
    },
    mounted() {
      Metric.getInstance().screenView('settings/video');
    },
  };
</script>

<style scoped lang="scss">

</style>
