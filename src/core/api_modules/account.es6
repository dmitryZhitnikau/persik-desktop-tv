export default {
  init() {

  },
  checkEmail(email) {
    const version = 2;
    const method = 'POST';
    const action = 'check';
    const module = 'auth';
    const params = {
      email,
    };
    return this.exec(method, version, module, action, params, true);
  },

  checkPassword(password) {
    const version = 2;
    const method = 'POST';
    const action = 'check-password';
    const module = 'auth';
    const params = {
      password,
    };
    return this.exec(method, version, module, action, params, true);
  },

  async login(email, password, nocookie) {
    const version = 1;
    const method = 'POST';
    const action = 'login';
    const module = 'account';
    const params = {
      email,
      password,
      nocookie,
      newsite: true,
    };
    return this.exec(method, version, module, action, params, true);
  },

  changePassword(oldPassword, newPassword) {
    const version = 1;
    const method = 'POST';
    const action = 'password';
    const module = 'account';
    const params = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    return this.exec(method, version, module, action, params);
  },

  rememberPassword(email) {
    const version = 1;
    const method = 'POST';
    const action = 'forgot';
    const module = 'account';
    const params = {
      email,
    };
    return this.exec(method, version, module, action, params);
  },

  register(email, password) {
    const version = 1;
    const method = 'POST';
    const action = 'registration';
    const module = 'account';
    const params = {
      email,
      password,
    };
    return this.exec(method, version, module, action, params);
  },

  getInfo() {
    const version = 1;
    const method = 'GET';
    const action = 'info';
    const module = 'account';
    const params = {};
    return this.exec(method, version, module, action, params, true);
  },

  setInfo(info) {
    const version = 1;
    const method = 'POST';
    const action = 'info';
    const module = 'account';
    return this.exec(method, version, module, action, info);
  },

  isTestPeriodAvailable(uuid) {
    const version = 1;
    const method = 'GET';
    const action = 'trial';
    const module = 'purchases';
    const params = {
      uuid,
    };
    return this.exec(method, version, module, action, params);
  },

  activateTrial(uuid) {
    const version = 1;
    const method = 'POST';
    const action = `trial?uuid=${uuid}`;
    const module = 'purchases';
    const params = {
      uuid,
    };
    return this.exec(method, version, module, action, params);
  },

};
