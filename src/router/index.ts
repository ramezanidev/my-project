import { createWebHistory, createRouter } from "vue-router";

// routes
import Index from '@/pages/index.vue'
import Address from '@/pages/address.vue'
import NewAddress from '@/pages/new.vue'

// config
const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/address",
    name: "/address",
    component: Address
  },
  {
    path: "/new",
    name: "/new",
    component: NewAddress
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;