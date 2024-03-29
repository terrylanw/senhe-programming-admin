import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/"),
        meta: { title: "首页", icon: "el-icon-s-home" },
      },
    ],
  },

  // banner管理路由
  {
    path: "/banner",
    component: Layout,
    children: [
      {
        path: "",
        name: "Banner",
        component: () => import("@/views/banner/"),
        meta: {
          title: "轮播管理",
          icon: "el-icon-picture-outline",
          noCache: false,
        },
      },
    ],
  },

  // 课程管理路由
  {
    path: "/course",
    component: Layout,
    children: [
      {
        path: "",
        name: "Course",
        component: () => import("@/views/course/"),
        meta: { title: "课程管理", icon: "el-icon-notebook-2", noCache: false },
      },
    ],
  },

  // 阅读管理路由
  {
    path: "/read",
    component: Layout,
    redirect: "/read/article",
    meta: { title: "阅读管理", icon: "el-icon-reading" },
    children: [
      {
        path: "article",
        name: "Article",
        component: () => import("@/views/read/article/"),
        meta: { title: "文章管理", icon: "el-icon-tickets", noCache: true },
      },
      {
        path: "category",
        name: "Category",
        component: () => import("@/views/read/category/"),
        meta: { title: "分类管理", icon: "el-icon-menu", noCache: true },
      },
      {
        path: "label",
        name: "Label",
        component: () => import("@/views/read/label/"),
        meta: {
          title: "标签管理",
          icon: "el-icon-collection-tag",
          noCache: true,
        },
      },
    ],
  },

  // 系统管理路由
  // 阅读管理路由
  {
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: { title: "系统管理", icon: "el-icon-setting" },
    children: [
      {
        path: "user",
        name: "User",
        component: () => import("@/views/system/user/"),
        meta: { title: "用户管理", icon: "el-icon-user" },
      },
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/system/role/"),
        meta: { title: "角色管理", icon: "el-icon-files" },
      },
    ],
  },

  // 跳转外网
  {
    path: "senhe",
    component: Layout,
    children: [
      {
        path: "senhe",
        meta: { title: "森和编程", icon: "el-icon-link" },
      },
    ],
  },

  // tagsView组件刷新重定向路由
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
