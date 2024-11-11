import HomeView from '@/views/HomeView.vue'

export const routes = [
  { path: '/', component: HomeView },
  { path: '/create', component: () => import('@/views/CreateNoteView.vue') },
  {
    path: '/edit/',
    redirect: '/',
    children: [{ path: ':id', component: () => import('@/views/EditNoteView.vue') }],
  },
  {
    path: '/notes/',
    redirect: '/',
    children: [{ path: ':id', component: () => import('@/views/SingleNoteView.vue') }],
  },
  { path: '/categories', component: () => import('@/views/CategoriesView.vue') },
]
