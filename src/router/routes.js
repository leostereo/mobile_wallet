
const routes = [
  {
    path: '/',
    pos: 'bottom',
    label : 'Dashboard',
    icon: "dashboard",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name: 'Dashboard', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/accounts',
    pos: 'bottom',
    label : 'Cuentas',
    icon: "savings",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name: 'Cuentas', component: () => import('pages/AccountsPage.vue') }
    ]
  },
  {
    path: '/cards',
    pos: 'bottom',
    label : 'Tarjetas',
    icon: "payment",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Tarjetas', component: () => import('pages/CardsPage.vue') }
    ]
  },
  {
    path: '/login',
    pos: 'none',
    label : 'login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name: 'Login', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/testing',
    pos: 'none',
    label : 'test',
    icon: "build",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Testing', component: () => import('pages/testingPage.vue') }
    ]
  },
  {
    path: '/testing2',
    pos: 'none',
    label : 'testing2',
    icon: "build",
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: '', name: 'Testing2', component: () => import('pages/testingPage.vue') }
    ]
  },
  {
    path: '/layout',
    pos: 'none',
    label : 'Layout',
    icon: "build",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Layout', component: () => import('pages/LayoutPage.vue') }
    ]
  },
  {
    path: '/profile',
    pos: 'top',
    label : 'Perfil',
    icon: "account_circle",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',  name: 'Perfil', component: () => import('pages/ProfilePage.vue') }
    ]
  },
  {
    path: '/notifications',
    pos: 'top',
    label : 'Notificaciones',
    icon: "email",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',  name: 'Notificaciones', component: () => import('pages/ProfilePage.vue') }
    ]
  },
  {
    path: '/settings',
    pos: 'top',
    label : 'Settings',
    icon: "settings",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',  name: 'Settings', component: () => import('pages/SettingsPage.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
