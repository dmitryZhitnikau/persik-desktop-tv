<template>
  <div v-if="products" :class="b()">
    <div :class="b('info')" v-if="paySystems.length===0">
       {{ $lang.messages.account.pay_info }}<br>persik.by/info/tariffs
    </div>
    <template v-else>
      <div :class="b('block')">
        <h3 :class="b('block-header')">{{ $lang.messages.account.select_package }}</h3>
        <div :class="b('block-package')">
          <div v-for="product in products"
               :key="product.product_id"
               :class="b('block-package-item', {active: product.product_id === selectedProductId})"
               @click="showOptions(product.product_id)"
               scroll-margin="0 15 0 0" scroll-threshold="0 15 0 0"
          >
            {{ product.name }}
            <div :class="b('block-package-item-add')">
              <i class="fa fa-plus"></i>
            </div>
          </div>
        </div>
      </div>

      <div :class="b('block')" v-if="productOptions">
        <h3 :class="b('block-header')"> {{ $lang.messages.account.select_option }}</h3>
        <div :class="b('block-tariffs')">
          <div v-for="productOption in productOptions"
               :key="productOption.product_option_id"
               ref="options"
               :class="b('block-tariffs-option', {active: productOption.product_option_id === selectedProductOptionId})"
               @click="showPayWays(productOption.product_option_id)"
               scroll-margin="0 0 0 20" scroll-threshold="0 0 0 10"
          >
            {{ productOption.name }} &ndash; {{productOption.price_formatted}}
            <i :class="b('block-tariffs-option-add', 'fa fa-plus')"></i>
          </div>
        </div>
      </div>

      <div :class="b('block')" v-if="selectedProductOptionId">
        <h3 :class="b('block-header', {paysys: true})">{{ $lang.messages.account.select_pay_sys }}</h3>
        <div :class="b('block-paysys')">
          <div v-for="paySystem in paySystems"
               :key="paySystem"
               :class="b('block-paysys-item')"
               ref="pay_sys"
               @click="createPayment(paySystem)"
          >
            {{ $lang.messages.account.pay_sys[paySystem] }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

  import Metric from '@/persik/platform/Metric';
  import QRCode from 'qrcode-svg';

  export default {
    name: 'p-purchases',
    data() {
      return {
        options: null,
        products: null,
        paySystems: null,
        selectedProductId: null,
        selectedProductOptionId: null,
      };
    },
    computed: {
      productOptions() {
        if (this.selectedProductId) {
          return this.products.find(x => x.product_id === this.selectedProductId).options;
        }
        return null;
      },
    },
    watch: {
      selectedProductId() {
        this.selectedProductOptionId = null;
      },
    },
    async created() {
      await this.load();
    },
    mounted() {
      Metric.getInstance().screenView('account/purchases');
    },
    methods: {
      showOptions(id) {
        this.selectedProductId = id;
        this.scrollToBottom();
      },
      showPayWays(id) {
        this.selectedProductOptionId = id;
        this.scrollToBottom();
      },
      scrollToBottom() {
        setTimeout(() => {
          const block = document.getElementsByClassName('p-account__page')[0];
          block.scrollTo(0, 5000);
        }, 300);
      },
      async createPayment(paySys) {
        try {
          const res = await this.$backend.billing.createPayment(
            [this.selectedProductOptionId],
            paySys,
          );
          if (res.description) {
            this.$nm.showModal('simple', `<span style="white-space: pre-line">${res.description}</span>`);
          } else {
            const svg = new QRCode(res.payment_page_url).svg();
            this.$nm.showModal('simple', `<div style="margin-bottom: 1rem;">Для продолжения оплаты, пожалуйста просканируйте QR-код:</div>${svg}<div style="margin-top: 1rem;">Это можно сделать с помощью приложения камеры в iPhone или приложения QR Code Reader для Android.</div>`);
          }
        } catch (e) {
          this.$nm.showError(e, 0);
        }
      },
      async load() {
        try {
          const res = await this.$backend.billing.getProducts();
          this.products = res.products;
          this.paySystems = res.pay_sys;
        } catch (e) {
          this.$nm.showError(e, 0);
        }
      },
    },
  };
</script>

<style scoped lang="scss">

  .p-purchases {
  -webkit-transition: .4s;
  transition: .4s;

  &__info {
    margin-top: 10rem;
    text-align: center;
    padding: 4rem;
    line-height: 1.5rem;
    color: $color-text-simple;
  }

  &__block {

    &-header {
      color: $color-text-simple;
      text-align: center;
      font-weight: 300;
      text-transform: uppercase;

      &_paysys {
        color: $color-text-simple;
        text-align: center;
        font-weight: 300;
        text-transform: uppercase;
      }
    }

    &-package {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
          -ms-flex-direction: row;
              flex-direction: row;
      -ms-flex-wrap: wrap;
          flex-wrap: wrap;
      -webkit-box-pack: justify;
          -ms-flex-pack: justify;
              justify-content: space-between;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -ms-flex-line-pack: center;
          align-content: center;
      width: 65rem;
      padding: 0 4.5rem;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;

      &-item {
        background-color: $color-gray-dark;
        border: 1px solid $color-gray-light;
        color: $color-text-simple;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        margin-bottom: 2rem;
        width: 26.5rem;
        height: 9rem;
        outline: .5rem solid $color-gray-dark;
        position: relative;

        &_active {
          font-weight: bold;
          color: $color-hover;
          border-color: $color-hover;
        }

        &-add {
          width: 2.08rem;
          height: 2.08rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          border: 1px solid $color-gray-light;
          position: absolute;
          left: -1px;
          bottom: -1px;
          color: $color-hover;
        }

        &:hover {
          background-color: $color-hover;
          border: 1px solid $color-text-simple;
          color: $color-text-simple;
          outline-color: $color-hover;
        }

        &:hover &-add {
          border-color: $color-text-simple;
          color: $color-text-simple;
        }
      }
    }

    &-tariffs {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      -webkit-box-pack: start;
          -ms-flex-pack: start;
              justify-content: flex-start;
      -webkit-box-align: stretch;
          -ms-flex-align: stretch;
              align-items: stretch;
      -ms-flex-line-pack: stretch;
          align-content: stretch;
      width: 65rem;
      padding: 0 4rem;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;

      &-option {
        height: 3.33rem;
        background-color: $color-gray-medium;
        -webkit-box-shadow: $shadow-dark;
                box-shadow: $shadow-dark;
        margin: .63rem 0;
        line-height: 3.33rem;
        padding: 0 1.33rem 0 1.67rem;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        color: $color-text-simple;

        &_active {
          font-weight: bold;
          color: $color-hover;
        }

        &-add {
          color: $color-hover;
          float: right;
          margin-top: 1.1rem;
        }

        &:hover {
          background-color: $color-hover;
          color: $color-text-simple;
        }

        &:hover &-add {
          color: $color-text-simple;
        }
      }
    }

    &-paysys {
      width: 65rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
          -ms-flex-pack: justify;
              justify-content: space-between;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
          -ms-flex-direction: row;
              flex-direction: row;
      -webkit-box-align: stretch;
          -ms-flex-align: stretch;
              align-items: stretch;
      -ms-flex-line-pack: stretch;
          align-content: stretch;
      padding: 0 4rem;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;

      &-header {
        color: $color-text-simple;
        text-align: center;
        font-weight: 300;
        text-transform: uppercase;
        margin-left: 15rem;
      }

      &-item {
        height: 10rem;
        background-color: $color-gray-medium;
        -webkit-box-shadow: $shadow-dark;
                box-shadow: $shadow-dark;
        color: $color-text-simple;
        -webkit-box-flex: 1;
            -ms-flex: 1;
                flex: 1;
        margin: 0 .625rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;

        &:first-child {
          margin-left: 0;
        }

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          background-color: $color-hover;
        }
      }
    }
  }
}

</style>
