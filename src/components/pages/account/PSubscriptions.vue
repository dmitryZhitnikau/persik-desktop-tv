<template>
  <div :class="b()">
    <table :class="b('table')">
      <tr :class="b('table-head')">
        <td :class="b('table-head-col', {date: true })">
          {{ $lang.messages.account.date }}
        </td>
        <td :class="b('table-head-col', {service: true })">
          {{ $lang.messages.account.service }}
        </td>
        <td :class="b('table-head-col', {amount: true })">
          {{ $lang.messages.account.amount }}
        </td>
        <td :class="b('table-head-col', {left: true })">
          {{ $lang.messages.account.days_left }}
        </td>
      </tr>

      <tr v-for="(subscription, index) in subscriptions"
          :key="index"
          :class="b('table-row')"
          @click="$emit('purchase', subscription.product_id)"
      >
        <td :class="b('table-col')">
          <span :class="b('table-col-date')">{{ subscription.created_at | momentFormat('DD.MM.YYYY') }}</span>
        </td>
        <td :class="b('table-col')">
          <span :class="b('table-col-package')">{{ $lang.messages.account.package }} <b>"{{ subscription.product_name }}"</b></span><br>
          {{subscription.product_option_name}} (с {{ subscription.created_at | momentFormat('DD.MM.YYYY') }} по {{ subscription.expired_at | momentFormat('DD.MM.YYYY') }})
        </td>
        <td :class="b('table-col')">
          <span :class="b('table-col-cost')"><b>{{ subscription.cost }}</b></span> бел.руб
        </td>
        <td :class="b('table-col')">
          <span v-if="getDayLeft(subscription.expired_at)" :class="b('table-col-left')" >{{ getDayLeft(subscription.expired_at) }}</span>
          <div v-else :class="b('table-col-buy')">{{ $lang.messages.account.buy }}</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

  import moment from 'moment';
  import datetime from '@/mixins/datetime';
  import Metric from '@/persik/platform/Metric';

  export default {
    name: 'p-subscriptions',
    mixins: [datetime],
    data() {
      return {
        subscriptions: null,
      };
    },
    async created() {
      await this.getSubscriptions();
    },
    mounted() {
      Metric.getInstance().screenView('account/subscriptions');
    },
    methods: {
      getDayLeft(expiredDatetime) {
        const expiredMoment = moment(expiredDatetime);
        if (expiredMoment.unix() < moment().unix()) {
          return false;
        }
        return expiredMoment.fromNow(true);
      },
      async getSubscriptions() {
        try {
          this.subscriptions = await this.$backend.billing.getSubscriptions();
        } catch (e) {
          this.$nm.showError(e, 0);
        }
      },
    },
  };
</script>

<style scoped lang="scss">

  .p-subscriptions {
  height: 100%;
  -webkit-transition: .4s;
  transition: .4s;

  &__table {
    border-collapse: collapse;
    text-align: center;
    vertical-align: middle;
    width: 65rem;
    font-size: 1rem;
    color: $color-text-muted;

    &-head {
      height: 3.38rem;
      text-transform: uppercase;

      &-col {
        border: 1px solid $color-gray-light;
        &:first-child {
          border-left: none;
        }
        &:last-child {
          border-right: none;
        }

        &_date {
          width: 10rem;
        }

        &_service {
          width: 25rem;
        }

        &_amount {
          width: 11.5rem;
        }

        &_left {
          width: 10rem;
        }
      }
    }

    &-row {
      height: 4.58rem;
      cursor: pointer;

      &:hover {
        background-color: $color-black;
      }

      &:hover .p-subscriptions__table-col-buy {
        background-color: $color-hover;
      }
    }
    &-col {
      border: 1px solid $color-gray-light;
      line-height: 1.5rem;

      &:first-child {
        border-left: none;
      }

      &:last-child {
        border-right: none;
      }

      &-date {
        color: $color-text-simple;
        font-size: 1rem;
      }

      &-package {
        color: $color-text-simple;
        font-size: 1rem;
      }

      &-cost {
        font-weight: bold;
        color: $color-text-simple;
      }

      &-left {
        color: $color-hover;
      }

      &-buy {
        background-color: $color-black;
        color: $color-text-simple;
        text-transform: uppercase;
        width: 10rem;
        height: 2.5rem;
        line-height: 2.5rem;
        margin: 0 auto;
        cursor: pointer;
      }
    }
  }
}

</style>
