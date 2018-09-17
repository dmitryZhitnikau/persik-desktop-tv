class StatusManager {
  constructor() {
    this.progress = 0;
    this.count = 0;
  }
  // Принимает прогресс
  setProgress(value) {
    this.progress = value;
  }
  // Возвращает прогресс
  getProgress() {
    return this.progress;
  }
  // Контроль за количеством обращений к тробберу. Троббер будет включен пока count > 0
  listManager() {
    let status = false;
    if (this.count !== 0) {
      status = true;
    } else {
      status = false;
    }
    return status;
  }
  // Регистрация на отображение тробера.
  // countManager(true) прибавляет +1 к count
  // countManager(false) отнимает -1 от count
  countManager(value) {
    if (value === true) {
      this.count += 1;
    } else {
      this.count -= 1;
    }
  }
}
export default StatusManager;

