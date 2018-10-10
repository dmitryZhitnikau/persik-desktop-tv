import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import PPlayerLive from '@/components/pages/PPlayerLive';
import PVideoPlayer from '@/components/pages/PPlayerVideo';
import PPlayerTest from '@/components/pages/PPlayerTest';

Vue.use(Router);

const router = new Router({
//  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Main,
    },
    {
      path: '/main/:page',
      name: 'Main',
      props: (route) => (Object.assign({}, route.params, { query: route.query })),
      component: Main,
    },
    {
      path: '/player-video/:type/:id',
      name: 'PlayerVideo',
      props: true,
      component: PVideoPlayer,
      alias: '/mega-player',
    },
    {
      path: '/player-live/:channelId',
      name: 'PlayerLive',
      props: (route) => (Object.assign({}, route.params, { query: route.query })),
      component: PPlayerLive,
    },
    {
      path: '/player-test',
      name: 'PlayerTest',
      component: PPlayerTest,
    },
  ],
});

const stack = [];
router.afterEach((to, from) => {
  stack.push(from);
});

const rules = [
  { pattern: /^\/player-video/, level: 3 },
  { pattern: /^\/player-live/, level: 3 },
  { pattern: /^\/main\/actor-info/, level: 3 },
  { pattern: /^\/main\/video-films/, level: 1 },
  { pattern: /^\/main\/video-cartoons/, level: 1 },
  { pattern: /^\/main\/video-series/, level: 1 },
  { pattern: /^\/main\/video-shows/, level: 1 },
  { pattern: /^\/main\/video/, level: 2 },
  { pattern: /^\//, level: 0 },
];

function getRouteLevel(route) {
  const rule = rules.find((item) => item.pattern.test(route.path));
  return rule ? rule.level : 0;
}

router.getLevelUpRoute = function () {
  const currentRoute = router.currentRoute;
  const currentLevel = getRouteLevel(currentRoute);
  const defaultRoute = { name: 'Start' };
  if (currentLevel > 0) {
    for (let i = stack.length - 1; i > 0; i -= 1) {
      const route = stack[i];
      const level = getRouteLevel(route);
      if (level < currentLevel) {
        return { name: route.name, params: route.params, query: route.query };
      }
    }
    return defaultRoute;
  }
  return null;
};

export default router;
