class ContextMenu {
  constructor() {
    this.counter = 0;
    this.visible = false;
    this.buttons = [];
  }
  setButton(nameButton, func) {
    this.buttons.push({
      id: this.idIncrement(),
      btName: nameButton,
      func,
    });
  }
  setVisible(mode) {
    this.visible = mode;
  }
  getButtons() {
    return this.buttons;
  }
  getVisible() {
    return this.visible;
  }
  idIncrement() {
    this.counter += 1;
    return this.counter;
  }
  close() {
    this.visible = false;
    this.buttons = [];
  }
  callFunc(id) {
    for (let i = 0; i < this.buttons.length; i += 1) {
      if (this.buttons[i].id === id) {
        this.buttons[i].func.apply();
      }
    }
    this.close();
  }
}
export default ContextMenu;
