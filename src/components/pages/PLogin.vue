<template>

    <div class="p-login">

      <!-- <div class="p-login__welcome" v-if="!isMain && isTrialAvailable">
        <div class="p-login__welcome-button" @click="showMain">Авторизация</div>
        <div class="p-login__welcome-button" v-if="isTrialAvailable && !trialInfo" @click="activateTrial">Активировать пробный период</div>
        <div class="p-login__welcome-info" v-if="trialInfo">Активирован тестовый период. Осталось {{ trialInfo }} дней.</div>
      </div> -->

      <div class="p-login__main">
        <div class="p-login__auth">{{ actionTitle }}<span v-if="username">, <span class="p-login__username">{{ username }}</span></span></div>
      
      <div class="p-login__input">
        <span class="p-login__input-step">{{ $lang.messages.auth.step }} {{ step }}/{{ countSteps }}:</span>
        <!-- <span class="p-login__input-text" :class="{'p-login__input-text_empty': inputIsEmpty}">{{ visibleText }}</span> -->
        <input :type="inputType" class="p-login__input-field" :placeholder="visibleText" ref="inputField" v-on:keypress="checkKey">
      </div>

      <div class="p-login__notification">
        <span v-if="message">{{ message }}</span>
      </div>

      <div class="p-login__quickenter" v-show="step == 1">
        <div class="p-login__quickenter-item" v-for="(item, index) in quickenter" :key="index" v-on:click="addText(item)">{{ item }}</div>
      </div>

        <div class="p-login__button-group" ref="buttons">
          <w-button class="p-login__button" @click="nextStep" :caption="nextStepName"></w-button>
          <w-button class="p-login__button" v-if="showPrevStep" @click="prevStep" :caption="$lang.messages.auth.prev_step"></w-button>
        </div>

      <div style="display: none" class="p-login__qrcode"></div>

      </div>      
      
    </div>

</template>

<script>
  import moment from 'moment';
  import WButton from '@/components/widgets/WButton';
  import WProgressBarThrobber from '@/components/widgets/WProgressBarThrobber';
  import DeviceInfo from '@/persik/platform/DeviceInfo';
  import Metric from '@/persik/platform/Metric';

export default {
    components: {
      WProgressBarThrobber,
      WButton,
    },
    name: 'p-login',
    data() {
      return {
        userExists: false,
        step: 1,
        email: '',
        password: '',
        password2: '',
        message: null,
        username: null,
        device: null,
        isTrialAvailable: true,
        isMain: true,
        trialInfo: null,
        quickenter: ['@gmail', '@mail', '@yandex', '@persik.by', '.ru', '.com', '.by'],
        inputType: 'text',
      };
    },
    created() {
      this.device = DeviceInfo.getInstance();
      this.checkTrial();
      // document.addEventListener('keypress', this.checkKey);
    },
    destroyed() {
      // document.removeEventListener('keypress', this.checkKey);
    },
    computed: {
      authorized() {
        return this.$store.getters.getAuthorized;
      },
      showCheckTrobber() {
        return this.$store.getters.getLoadingCount('check') > 0;
      },
      showLoginTrobber() {
        return this.$store.getters.getLoadingCount('login') > 0;
      },
      activeField() {
        if (this.step === 1) {
          return 'email';
        } else if (this.step === 2) {
          return 'password';
        } else if (this.step === 3) {
          return 'password2';
        }
        throw new Error('PLogin.step must be 1, 2 or 3');
      },
      visibleText() {
        if (this[this.activeField].length) {
          if (this.keyboardType === 'password') {
            return this[this.activeField].replace(/./g, '*');
          }
          return this[this.activeField];
        }
        return this.$lang.messages.auth[this.placeholder];
      },
      showPrevStep() {
        return this.step > 1;
      },
      nextStepName() {
        if (this.step > 1) {
          if (this.userExists) {
            return this.$lang.messages.auth.enter;
          } else if (this.step === 3) {
            return this.$lang.messages.auth.register;
          }
        }
        return this.$lang.messages.auth.next_step;
      },
      keyboardType() {
        if (this.step === 1) {
          return 'email';
        }
        return 'password';
      },
      actionTitle() {
        if (this.step > 1) {
          if (this.userExists) {
            return this.$lang.messages.auth.welcome;
          }
          return this.$lang.messages.auth.registration;
        }
        return this.$lang.messages.auth.authorization;
      },
      placeholder() {
        if (this.step === 1) {
          return 'enter_email';
        } else if (this.step === 2) {
          if (this.userExists) {
            return 'enter_password';
          }
          return 'create_password';
        } else if (this.step === 3) {
          return 'confirm_password';
        }
        return '';
      },
      countSteps() {
        return (this.step === 1 || this.userExists) ? 2 : 3;
      },
      inputIsEmpty() {
        return !this[this.activeField].length;
      },
    },
    methods: {
      addText(text) {
        this.$refs.inputField.value += text;
        this.$refs.inputField.focus();
      },
      checkKey(e) {
        this.message = '';
        if (+e.keyCode === 13) {
          this.nextStep();
          this.$refs.inputField.focus();
        }
      },
      showMain() {
        this.isMain = true;
        setTimeout(() => {
          this.$root.$emit('focus', this.$el);
        }, 0);
      },
      async activateTrial() {
        const uuid = this.device.uuid;
        const res = await this.$backend.account.activateTrial(uuid);
        this.trialInfo = Math.round((moment(res.expired_at, 'YYYY-M-D H-mm-ss').unix() - moment().unix()) / 86400);
      },
      async checkTrial() {
        const uuid = this.device.uuid;
        try {
          const res = await this.$backend.account.isTestPeriodAvailable(uuid);
          if (res) {
            this.trialInfo = Math.round((moment(res.expired_at, 'YYYY-M-D H-mm-ss').unix() - moment().unix()) / 86400);
            if (this.trialInfo <= 0) {
              this.isMain = true;
            }
          } else {
            this.isTrialAvailable = false;
            this.isMain = true;
          }
        } catch (e) {
          this.isTrialAvailable = true;
          this.isMain = false;
        }
      },
      gotoFirstStep() {
        this.step = 1;
        this.username = null;
        this.userExists = false;
        this.password = '';
        this.password2 = '';
        this.message = null;
        this.clearField();
        this.inputType = 'text';
      },
      async registration() {
        this.password2 = this.$refs.inputField.value;
        if (!this.password2.length) {
          throw new Error(this.$lang.messages.auth.enter_field);
        }
        if (this.password !== this.password2) {
          throw new Error(this.$lang.messages.auth.passwords_dont_match);
        }
        await this.$backend.account.register(this.email, this.password);
      },
      async login() {
        this.password = this.$refs.inputField.value;
        if (this.email.length > 0 && this.password.length > 0) {
          await this.$backend.account.login(this.email, this.password, 1);
          this.$store.commit('authorized', true);
          this.$backend.clear();
          this.syncVuexWithBackend();
          this.$router.push({ name: 'Start' });
        } else {
          throw new Error(this.$lang.messages.auth.enter_field);
        }
      },
      checkEmail() {
        const pattern = /[\w\S]+@[\w\S]+\.[\w\S]+/g;
        this.email = this.$refs.inputField.value;
        if (pattern.test(this.email)) {
          const res = this.$backend.account.checkEmail(this.email);
          this.clearField();
          return res;
        }
        return false;
      },
      checkPassword() {
        this.password = this.$refs.inputField.value;
        return this.password.length >= 6;
      },
      prevStep() {
        if (this.step === 3) {
          this.step = 2;
          this.password2 = '';
        } else if (this.step === 2) {
          this.gotoFirstStep();
        }
      },
      clearField() {
        this.$refs.inputField.value = '';
      },
      async nextStep() {
        if (this.step === 1) {
          this.inputType = 'text';
          try {
            const res = await this.checkEmail();
            if (res) {
              this.step = 2;
              this.inputType = 'password';
              this.userExists = res.exists;
              if (res.exists) {
                this.username = res.name;
              } else {
                this.username = this.email;
              }
            } else {
              this.message = this.$lang.messages.auth.invalid_email;
            }
          } catch (e) {
            this.message = e.message;
          }
        } else if (this.step === 2) {
          if (this.userExists) {
            try {
              await this.login();
            } catch (e) {
              this.message = e.message;
            }
          } else if (this.checkPassword()) {
            this.step = 3;
            this.clearField();
          } else {
            this.message = this.$lang.messages.messages.invalid_password;
          }
        } else if (this.step === 3) {
          try {
            await this.registration();
            this.step = 2;
            this.userExists = true;
            await this.login();
            this.clearField();
          } catch (e) {
            this.message = e.message;
          }
        }
      },
    },
    mounted() {
      Metric.getInstance().screenView('login');
      this.$refs.inputField.focus();
    },
};
</script>
<style scoped lang="scss">

.p-login {
  background-color: $color-gray-dark;
  color: $color-text-simple;
  min-height: calc(100vh - 2.5rem);

  &__quickenter {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    margin-left: 4rem;

    &-item {
      height: 2rem;
      padding: 0 1rem;
      border: 1px solid #393939;
      color: white;
      cursor: pointer;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      margin-left: .5rem;

      &:first-child {
        margin-left: 0;
      }

      &:hover {
        background-color: $color-hover;
      }
    }
  }

  &__welcome {
    width: 60%;
    margin-left: 25%;
    padding-top: 5rem;
    height: 3rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;

    &-button {
      height: 3rem;
      width: 17rem;
      color: white;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      border: 1px solid #393939;
      cursor: pointer;

      &:hover {
        background-color: #e05f20;
      }
    }

    &-info {
      height: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
    }
  }

  &__logo {
    display: block;
    margin: 0 auto;
    max-width: 7rem;
    max-height: 2rem;
    padding-top: 1.67rem;
  }

  &__auth {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.83rem;
    padding-top: 3.33rem;
  }

  &__username {
    color: $color-hover;
  }

  &__input {
    width: 68.75rem;
    height: 3.33rem;
    background-color: $color-gray-medium;
    overflow: hidden;
    -webkit-box-shadow: $shadow-dark;
            box-shadow: $shadow-dark;
    margin-left: 4rem;
    margin-top: 1.96rem;
    font-size: 1.54rem;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    padding-left: .8rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;

    &-field {
      height: 100%;
      width: 100%;
      background-color: transparent;
      border: none;
      color: white;
      font-size: 1.5rem;
    }

    &-text {
      color: $color-text-simple;
      &_empty {
        color: $color-text-muted;
      }
    }

    &-step{
      color: $color-text-simple;
      font-weight: bold;
      margin-right: 1rem;
      white-space: nowrap;
    }
  }

  &__notification {
    margin-top: 1rem;
    margin-left: 4rem;
    height: 1.1rem;
    border-radius: 20px;
    color: $color-hover;
  }

  &__keyboard {
    margin-left: 4rem;
    margin-right: 4rem;
    margin-top: 1.78rem;
    width: 50%;
  }

  &__qrcode{
    float: right;
    margin-right: 6.46rem;
    width: 5rem;
    height: 5rem;
    background-image: url(http://qrcoder.ru/code/?test&8&0);
    background-size: 100%;
  }

  &__button-group {
    clear: both;
    margin-left: 4rem;
    width: 46%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
        -ms-flex-direction: row-reverse;
            flex-direction: row-reverse;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    margin-top: 2rem;
    .p-login__button {
      width: 105rem;
      margin-right: 1rem;
    }
  }
}
  
</style>
