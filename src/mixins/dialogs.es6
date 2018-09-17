export default {
  methods: {
    async prompt(title, type, maxLength, validator = null, extraButtons = []) {
      return new Promise((resolve) => {
        const extraButtonsBinded = extraButtons.map((button) => ({
          title: button.title,
          action: () => {
            this.$root.$emit('prompt', null);
            button.action();
            resolve(false);
          },
        }));
        const promptData = {
          title,
          type,
          maxLength,
          errorMessage: '',
          returnHandler: async (text) => {
            let valid = true;
            if (validator) {
              valid = await validator.validate(text);
            }
            if (valid) {
              this.$root.$emit('prompt', null);
              resolve(text);
            } else {
              promptData.errorMessage = validator.errorMessage;
              if (validator.resetInvalid) {
                this.$root.$emit('prompt', null);
              }
              this.$root.$emit('prompt', promptData);
            }
          },
          cancelHandler: () => {
            this.$root.$emit('prompt', null);
            resolve(false);
          },
          changeHandler: () => {
            promptData.errorMessage = '';
            this.$root.$emit('prompt', promptData);
          },
          extraButtons: extraButtonsBinded,
        };
        this.$root.$emit('prompt', promptData);
      });
    },
    async isValidPin(pin) {
      const currentPin = await this.$backend.account.getPin();
      return pin === currentPin;
    },
    async isValidPassword(password) {
      return this.$backend.account.checkPassword(password);
    },
    async checkPin(title, extraButtons = []) {
      if (!this.$backend.settings.getParentControl()) {
        return true;
      }
      const validator = {
        isValidPin: this.isValidPin.bind(this),
        async validate(value) {
          this.errorMessage = '';
          const valid = await this.isValidPin(value);
          if (valid) {
            return true;
          }
          this.errorMessage = this.$lang.messages.messages.invalid_pin;
          return false;
        },
        resetInvalid: true,
      };
      const result = await this.prompt(title, 'pin', 4, validator, extraButtons); // , [{title: 'Button', action: function(){console.log('Button clicked', this)}}]);
      return !!result;
    },
    async checkPassword() {
      const validator = {
        isValidPassword: this.isValidPassword.bind(this),
        async validate(value) {
          this.errorMessage = '';
          const valid = await this.isValidPassword(value);
          if (valid) {
            return true;
          }
          this.errorMessage = this.$lang.messages.messages.invalid_password;
          return false;
        },
      };
      const result = await this.prompt(this.$lang.messages.parentCtrl.enter_pass, 'password', 32, validator); // , [{title: 'Button', action: function(){console.log('Button clicked', this)}}]);
      return !!result;
    },
    async checkPinOrPassword(title) {
      let forgot = false;
      let result = await this.checkPin(title, [{
        title: this.$lang.messages.buttons.forgot,
        action() {
          forgot = true;
        },
      }]);
      if (forgot) {
        result = await this.checkPassword();
      }
      return result;
    },
  },
};
