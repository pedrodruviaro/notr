import HomeView from '@/views/HomeView.vue'

export const routes = [
  { path: '/', component: HomeView },
  { path: '/note', component: () => import('@/views/NoteView.vue') },
  { path: '/create', component: () => import('@/views/CreateNoteView.vue') },
]
