import type { Category, Note } from '@/types/entities'

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', title: 'Tecnologia' },
  { id: '2', title: 'Ciência' },
  { id: '3', title: 'Negócios' },
  { id: '4', title: 'Saúde' },
  { id: '5', title: 'Educação' },
  { id: '6', title: 'Esportes' },
  { id: '7', title: 'Entretenimento' },
  { id: '8', title: 'Música' },
  { id: '9', title: 'Viagem' },
  { id: '10', title: 'Gastronomia' },
]

export const MOCK_NOTES: Note[] = [
  {
    id: '1',
    content: 'Explorar novas tendências em IA.',
    category: 'Tecnologia',
    color: '#f4f4d0',
    createdAt: new Date(),
  },
  {
    id: '2',
    content: 'Estudar sobre gestão de projetos.',
    category: 'Negócios',
    color: '#c0d7b7',
    createdAt: new Date(),
  },
  {
    id: '3',
    content: 'Praticar meditação diariamente.',
    category: 'Saúde',
    color: '#e8c4c6',
    createdAt: new Date(),
  },
  {
    id: '4',
    content: 'Revisar conceitos básicos de álgebra.',
    category: 'Educação',
    color: '#ebcfb9',
    createdAt: new Date(),
  },
  {
    id: '5',
    content: 'Planejar a próxima viagem de férias.',
    category: 'Viagem',
    color: '#e4eee9',
    createdAt: new Date(),
  },
  {
    id: '6',
    content: 'Assistir a um documentário sobre esportes.',
    category: 'Esportes',
    color: '#f2f2f2',
    createdAt: new Date(),
  },
  {
    id: '7',
    content: 'Aprender uma nova música no violão.',
    category: 'Música',
    color: '#bdb0d9',
    createdAt: new Date(),
  },
  {
    id: '8',
    content: 'Experimentar uma nova receita de culinária.',
    color: '#a9c9d4',
    createdAt: new Date(),
  },
  {
    id: '9',
    content: 'Participar de uma conferência de tecnologia.',
    category: 'Tecnologia',
    color: '#fbf2ed',
    createdAt: new Date(),
  },
  {
    id: '10',
    content: 'Fazer uma pausa e relaxar ao ar livre.',
    color: '#f4f4d0',
    createdAt: new Date(),
  },
  {
    id: '11',
    content: 'Pesquisar sobre startups inovadoras.',
    category: 'Negócios',
    color: '#c0d7b7',
    createdAt: new Date(),
  },
  {
    id: '12',
    content: 'Estudar anatomia para aprimorar conhecimentos.',
    category: 'Saúde',
    color: '#e8c4c6',
    createdAt: new Date(),
  },
  {
    id: '13',
    content: 'Revisar planejamento de estudos para o semestre.',
    category: 'Educação',
    color: '#ebcfb9',
    createdAt: new Date(),
  },
  {
    id: '14',
    content: 'Montar um novo itinerário de viagem.',
    category: 'Viagem',
    color: '#e4eee9',
    createdAt: new Date(),
  },
  {
    id: '15',
    content: 'Comprar equipamentos de ginástica.',
    category: 'Esportes',
    color: '#f2f2f2',
    createdAt: new Date(),
  },
  {
    id: '16',
    content: 'Explorar novas playlists de jazz.',
    category: 'Música',
    color: '#bdb0d9',
    createdAt: new Date(),
  },
  {
    id: '17',
    content: 'Anotar ideias para futuros projetos de software.',
    color: '#a9c9d4',
    createdAt: new Date(),
  },
  {
    id: '18',
    content: 'Definir metas de curto prazo para a carreira.',
    category: 'Negócios',
    color: '#fbf2ed',
    createdAt: new Date(),
  },
  {
    id: '19',
    content: 'Aprimorar habilidades de comunicação.',
    color: '#f4f4d0',
    createdAt: new Date(),
  },
  {
    id: '20',
    content: 'Estudar a evolução da internet.',
    category: 'Tecnologia',
    color: '#c0d7b7',
    createdAt: new Date(),
  },
]
