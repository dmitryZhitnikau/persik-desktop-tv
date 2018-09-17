import TargetMetric from './modules/APP_TARGET_TYPE/Metric';

let instance;

class Metric extends TargetMetric {
  constructor() {
    super();
    if (instance) {
      throw new Error('The instance of Metric must be obtained by Metric.getInstance() method');
    }
    instance = this;
  }

  static getInstance() {
    if (!instance) {
      instance = new Metric();
    }
    return instance;
  }
}

export default Metric;
