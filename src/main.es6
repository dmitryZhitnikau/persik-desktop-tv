import 'babel-polyfill';
import Vue from 'vue';
import Lang from 'vuejs-localization';
import VueAsyncComputed from 'vue-async-computed';
import Vue2Filters from 'vue2-filters';
import moment from 'moment';
import { JL } from 'jsnlog';
import start from './persik/start';

JL.setOptions({
  defaultAjaxUrl: 'http://api.persik.by:8080/v2/utils/report-error',
});

Vue.use(VueAsyncComputed);
Vue.use(Vue2Filters);

Lang.requireAll(require.context('./lang', true, /\.js$/));
Vue.use(Lang);
Vue.config.productionTip = false;

moment.locale('ru');
start();
