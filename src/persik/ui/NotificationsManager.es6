import EventDispatcher from '@danehansen/event-dispatcher';

class NotificationsManager extends EventDispatcher {

  static get MESSAGE() {
    return 'message';
  }
  static get ERROR() {
    return 'error';
  }
  static get WARNING() {
    return 'warning';
  }

  constructor() {
    super();
    this.Ncounter = 0;
    this.Mcounter = 0;
    this.notifications = [];
    this.modals = [];
    this.lifetimeIntervalId = null;
  }

  setNotification(textMsg, lifeMsg, nameButton, func, category) {
    if (!this.notifications.some(notif => notif.message === textMsg)) {
      const id = this.idIncNotif();
      this.notifications.push({
        id,
        methodName: category,
        message: textMsg,
        btName: nameButton,
        func,
        lifetime: lifeMsg,
        passed: 0,
      });
      if (!this.lifetimeIntervalId) {
        this.lifetimeNotification();
      }
      this.dispatchEvent('notificationEvent', this.notifications);
      return id;
    }
    return null;
  }

  setModal(contentType, message, progress, contentId, contentMode) {
    this.modals.push({
      id: this.idIncModals(),
      contentType,
      message,
      progress,
      contentId,
      contentMode,
    });
    this.dispatchEvent('modalEvent', this.modals);
  }

  showMessage(message, lifetime, nameButton, func) {
    return this.setNotification(
      message,
      lifetime,
      nameButton,
      func,
      NotificationsManager.MESSAGE);
  }

  showError(message, lifetime, nameButton, func) {
    return this.setNotification(message, lifetime, nameButton, func, NotificationsManager.ERROR);
  }

  showWarning(message, lifetime, nameButton, func) {
    return this.setNotification(
      message,
      lifetime,
      nameButton,
      func,
      NotificationsManager.WARNING);
  }

  showModal(contentType, message = '', progress = 0, contentId = 0, contentMode = null) {
    this.setModal(contentType, message, progress, contentId, contentMode);
  }

  getNotifications() {
    return this.notifications;
  }

  getModals() {
    return this.modals;
  }

  deleteNotif(id) {
    for (let j = 0; j < this.notifications.length; j += 1) {
      if (this.notifications[j].id === id) {
        this.notifications.splice(j, 1);
      }
    }
    if (!this.notifications.length) {
      clearInterval(this.lifetimeIntervalId);
      this.lifetimeIntervalId = null;
    }
  }

  deleteModal(id) {
    for (let j = 0; j < this.modals.length; j += 1) {
      if (this.modals[j].id === id) {
        this.modals.splice(j, 1);
      }
    }
  }

  lifetimeNotification() {
    this.lifetimeIntervalId = setInterval(() => {
      for (let i = 0; i < this.notifications.length; i += 1) {
        if (this.notifications[i].lifetime) {
          if (this.notifications[i].passed < this.notifications[i].lifetime) {
            this.notifications[i].passed += 100;
          } else {
            this.deleteNotif(this.notifications[i].id);
          }
        }
      }
    }, 100);
  }

  idIncNotif() {
    this.Ncounter += 1;
    return this.Ncounter;
  }

  idIncModals() {
    this.Mcounter += 1;
    return this.Mcounter;
  }

  callFunc(id) {
    for (let i = 0; i < this.notifications.length; i += 1) {
      if (this.notifications[i].id === id) {
        this.notifications[i].func();
      }
    }
    this.deleteNotif(id);
  }
}
export default NotificationsManager;
