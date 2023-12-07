# Watch Wagon

Watch-Wagon é uma plataforma web de streaming de filmes onde você aluga todos os filmes que quiser, utilizando de endpoints de outros serviços de streaming para fornecer o conteúdo, cada filme tendo seu valor de aluguél e não por meio de mensalidade.

Existem muitos serviços de streaming hoje em dia e com um grande problema onde você apenas vê o que os catálogos dos mesmos possuem. Esse projeto tem como objetivo ter uma grande quantidade de filmes disponíveis para alugar, acessando os outros serviços de streaming para a visualização desses filmes. Isso é realizado com um acordo com os outros streamings em que parte do valor do aluguél irá para o determinado serviço de streaming que possui o filme no catálogo. Neste projeto foi utilizado o YouTube com filmes de graça. Quando o usuário realiza o pagamento do filme ele é direcionado para o link do filme no YouTube para ele assistir.

## Problema

Hoje é muito complicado pois existem diversos catálogos e diversos serviços de streaming. Os espectadores estão cansados de ter de assinar inúmeras plataformas para assistir seus filmes favoritos. A relevância do problema deve-se a grande demanda e de como hoje é distribuido os "royalties" dentro da industria cinematrográfica. Visando resolver isso, a solução proposta é de um lugar onde possui diversos filmes para poder alugar e parte do preço do aluguél cobrindo os royalties.
## Tecnologias utilizadas:
Front-End: ReactJS e Material UI

Back-End: ExpressJS

Servidor: Docker

Banco de dados: PostreSQL

### Documentos e informações
Os diagramas do projeto estão na pasta diagrams. Aqui também está o link do JIRA: https://watchwagon.atlassian.net/jira/software/projects/WW/boards/1. Na tarefa de criar diagrama de arquitetura está presente o documento de arquitetura.

## Contribuição

Pull requests são bem vindos contanto que seja aberto issue.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
## Requisitos funcionais:​

Cadastro de Usuário:​

Os usuários devem ser capazes de criar contas com informações básicas.​
Opção de registro por e-mail, número de telefone ou login social (por exemplo, Facebook ou Google).​

Autenticação e Segurança:​

Autenticação segura para proteger as contas dos usuários.​

Pesquisa e Navegação:​

Os usuários devem poder pesquisar filmes por título e gênero.​
Opção de explorar filmes por categorias.​

Aluguel de Filmes:​

Os usuários podem alugar filmes individualmente.​
Pagamento seguro e opções de pagamento flexíveis (cartão de crédito e Pix).​
Exibição de informações sobre o período de aluguel, preço e disponibilidade.​

Streaming de Filmes:​

Informações de plataformas de streaming para o aluguel.​
Utilização apenas da plataforma YouTube.​

Gerenciamento de Conta:​

Os usuários podem editar informações pessoais, como nome, endereço, etc.​
Opção de adicionar e gerenciar métodos de pagamento.​

Watchlist:​

Capacidade de adicionar e remover filmes da WatchList.

## Requisitos não funcionais:​

Desempenho:​

Tempo de carregamento rápido do streaming de vídeos sem interrupções.​
Escalabilidade para lidar com um grande número de usuários e filmes.​

Segurança:​

Proteção senha do usuário criptografada em banco.

Usabilidade:​

Interface de usuário intuitiva e amigável.​
Suporte a navegadores(Google Chrome e Brave) nos dispositivos desktops.

## Restrições

- O sistema não vai permitir alugar filmes
- O sistma não vai salvar historico de pesquisa
- O sistema não vai utilizar plataformas de streamings a não ser o YouTube.

## Metodologia

Foi utilizado o Scrum e para arquitetura de software foi utilizado o C4 Model.

## Trade-offs

- O sistema não vai permitir alugar filmes de outras plataformas de streaming por conta dos direitos autorais e de propriedade.
- O sistema não terá aplicativo mobile.
- O sistema terá apenas 15 filmes no catálogo por conta de direitos autorais.

## Casos de uso
- Os casos de uso encontram-se dentro da pasta diagrams.


## Utilização

Execute os script start.sh para subir a aplicação. Para parar a aplicação utilize o comando docker compose down, ou docker-compose down dependendo da sua versão docker.
Caso a sua versão docker seja mais antiga, altere os comandos do script start.sh para utilizar o comando docker do seu ambiente.
 
A aplicação está homologada somente para ambientes linux.
