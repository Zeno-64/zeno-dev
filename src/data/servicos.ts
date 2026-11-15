/** Página Serviços: o que eu faço, para quem, como funciona e as dúvidas
 *  de sempre. Sem preço publicado — orçamento é fechado por escopo. */

export type Servico = {
  id: string
  titulo: string
  para: string
  inclui: string[]
  exemplos: string[] // slugs de projetos
}

export const servicos: Servico[] = [
  {
    id: 'pagina-unica',
    titulo: 'Site de uma página para o seu negócio',
    para: 'Salão, clínica, estúdio, professor, artesão — quem fecha venda pelo WhatsApp.',
    inclui: [
      'Design sob medida, não template',
      'Pensado primeiro para o celular',
      'Botões que abrem o WhatsApp com a mensagem já escrita',
      'Prévia bonita quando o link é compartilhado',
      'Hospedagem sem mensalidade e domínio configurado',
    ],
    exemplos: ['natalie-calegari', 'ste-sunshine', 'studio-rosa-charm', 'sr-espaco-da-beleza'],
  },
  {
    id: 'catalogo',
    titulo: 'Catálogo com página para cada peça',
    para: 'Quem vende peça única, coleção ou produto sob encomenda.',
    inclui: [
      'Uma página por item, com galeria e ficha técnica',
      'Link de cada peça com foto e título próprios no WhatsApp',
      'Peça nova entra num arquivo, sem mexer em código de tela',
    ],
    exemplos: ['narakaito-lab', 'cleduart'],
  },
  {
    id: 'landing',
    titulo: 'Landing page para anúncio',
    para: 'Quem investe em tráfego pago e precisa que cada clique conte.',
    inclui: [
      'Página leve, que abre rápido no 4G',
      'Eventos de conversão por botão (Meta Pixel)',
      'Refaço sobre o texto que já funciona',
    ],
    exemplos: ['metodo-mvp', 'filiposo'],
  },
  {
    id: 'ferramentas',
    titulo: 'Ferramentas e automações',
    para: 'Quem repete a mesma tarefa todo dia no navegador.',
    inclui: ['Extensões do Chrome', 'Fluxos dentro do WhatsApp Web', 'Testes automatizados desde o começo'],
    exemplos: ['zapflow'],
  },
  {
    id: 'apps',
    titulo: 'Apps sob medida',
    para: 'Quando planilha e grupo de WhatsApp não dão mais conta.',
    inclui: [
      'App Android e iOS com React Native',
      'Banco e login no Supabase, com dados isolados por cliente',
      'Funciona offline quando o uso pede',
    ],
    exemplos: ['app-nutricionista', 'app-receitas'],
  },
]

export const processo = [
  {
    titulo: 'Conversa',
    texto: 'Entendo o negócio pelo que já existe — Instagram, WhatsApp, site antigo — e o que precisa mudar.',
  },
  {
    titulo: 'Levantamento',
    texto: 'Fotos, textos, serviços e preços. O que faltar vira uma lista de pendências clara, em português.',
  },
  {
    titulo: 'Protótipo no ar',
    texto: 'Antes do domínio, o site sobe num endereço provisório para você abrir no seu celular.',
  },
  {
    titulo: 'Ajustes',
    texto: 'Mudanças com você olhando. Cada decisão importante fica anotada no projeto.',
  },
  {
    titulo: 'Publicação',
    texto: 'Domínio configurado, prévia de link testada no WhatsApp, e o site é seu.',
  },
]

export const perguntas = [
  {
    pergunta: 'Quanto custa?',
    resposta:
      'Depende do escopo: uma página é diferente de um catálogo ou de um app. O orçamento é fechado antes de começar, e não tem surpresa no meio.',
  },
  {
    pergunta: 'Vou pagar mensalidade de hospedagem?',
    resposta:
      'Não. Os sites são estáticos e ficam na Cloudflare, no plano gratuito. Você paga só o domínio — um .com.br sai por volta de R$ 40 por ano no registro.br.',
  },
  {
    pergunta: 'Consigo trocar texto e foto depois?',
    resposta:
      'Todo o conteúdo fica num arquivo de dados, separado do código das telas. Pequenas mudanças eu faço; se você quiser, mostro como fazer.',
  },
  {
    pergunta: 'Quanto tempo leva?',
    resposta:
      'Um site de uma página costuma ficar pronto em poucos dias depois que o material chega. O que mais atrasa projeto é esperar foto e texto — por isso a lista de pendências vem logo no começo.',
  },
  {
    pergunta: 'Faz loja virtual com carrinho?',
    resposta:
      'Hoje não. Os sites levam o cliente para o WhatsApp, que é onde o negócio pequeno fecha a venda. Se o seu caso pede carrinho, eu te digo isso na primeira conversa.',
  },
  {
    pergunta: 'Já tenho um site em WordPress. Dá para refazer?',
    resposta:
      'Dá — mantendo o texto que já funciona e, se for o caso, no mesmo servidor. Foi assim com a landing do Método M.V.P.',
  },
]
