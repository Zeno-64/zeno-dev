import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Inicio from './pages/Inicio'

/** Cada página (menos a home) vira um pedaço de JS separado, carregado
 *  na hora de navegar. O roteador espera o pedaço chegar antes de trocar
 *  a página — então a transição não pisca com tela vazia. */
const pagina = (carregar: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await carregar()).default,
})

const rotas = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Inicio /> },
      { path: 'projetos', lazy: pagina(() => import('./pages/Projetos')) },
      { path: 'projetos/:slug', lazy: pagina(() => import('./pages/Projeto')) },
      { path: 'servicos', lazy: pagina(() => import('./pages/Servicos')) },
      { path: 'sobre', lazy: pagina(() => import('./pages/Sobre')) },
      { path: 'stack', lazy: pagina(() => import('./pages/Stack')) },
      { path: 'agora', lazy: pagina(() => import('./pages/Agora')) },
      { path: 'contato', lazy: pagina(() => import('./pages/Contato')) },
      { path: '*', lazy: pagina(() => import('./pages/NaoEncontrado')) },
    ],
  },
])

export default function App() {
  return <RouterProvider router={rotas} />
}
