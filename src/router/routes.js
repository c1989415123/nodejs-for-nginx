export default [
  {
    name: "film",
    path: "/",
    component: resolve => require(['@/views/film'], resolve)
  },
  {
    name: "org",
    path: "/org",
    component: resolve => require(['@/views/org'], resolve)
  },
  {
    name: "vue-org",
    path: "/vue-org",
    component: resolve => require(['@/views/vue-org'], resolve)
  },
  {
    name: "org-index",
    path: "/org-index",
    component: resolve => require(['@/views/org-index'], resolve)
  },
  {
    name: "calendar",
    path: "/calendar",
    component: resolve => require(['@/views/calendar'], resolve)
  },
  {
    name: "input",
    path: "/input",
    component: resolve => require(['@/views/input'], resolve)
  }

]
