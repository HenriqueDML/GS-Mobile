
# 🌍 EcoDenúncia

## 📖 Descrição
O EcoDenúncia é uma plataforma web desenvolvida para combater o descarte irregular de lixo nas cidades. Seu principal objetivo é permitir que cidadãos denunciem pontos críticos de acúmulo de lixo, entulho e descartes clandestinos, que causam enchentes, entupimento de bueiros e degradação ambiental.

A solução promove a conscientização, fortalece a comunicação entre a população e os órgãos públicos e contribui diretamente para uma cidade mais limpa, organizada e sustentável.

---

## 🎯 Objetivos
- ✅ Promover a conscientização ambiental.
- ✅ Reduzir impactos causados por lixo em locais inadequados.
- ✅ Facilitar a comunicação entre cidadãos e órgãos públicos.
- ✅ Monitorar e acompanhar denúncias em tempo real.
- ✅ Contribuir para a melhoria da qualidade urbana.

---

## 🚀 Funcionalidades
- 🗑️ **Cadastro de denúncias:**
  - Formulário com campos de endereço, descrição e imagem
  - Envio da denúncia para o backend via API REST
  - Armazenamento temporário de dados no dispositivo, se necessário
- 📷 Upload de imagem:
  - Seleção de imagem via galeria ou câmera
  - Envio junto com os dados da denúncia
- 🔍 Consulta e acompanhamento:
  - Listagem de denúncias feitas pelo usuário
  - Visualização de status: *Pendente*, *Em andamento*, *Resolvido*
- 👤 Autenticação de usuários:
  - Tela de login e registro
  - Armazenamento e leitura do token JWT com `AsyncStorage`
  - Redirecionamento baseado no tipo de usuário (cidadão ou administrador)
- 📍 Integração com localidades:
  - Escolha de Estado, Cidade e Bairro no cadastro de denúncia
- 🎛️ Navegação:
  - Menu lateral (Drawer Navigation) com acesso às principais telas
  - Cabeçalho fixo com botão para abrir o menu
- 🌐 Comunicação com backend:
  - Todas as interações com a API realizadas via `Axios`
  - Uso de JWT para autenticação nas requisições
- 🎨 Interface responsiva:
  - Compatível com dispositivos móveis Android e visualização web

---

  ## 🏗️ Arquitetura (Mobile)
- **Screens:** Telas principais do aplicativo, como `Login`, `Home`, `Perfil`, `Denuncia`, `AcompanharDenuncia`, etc.
- **Components:** Componentes reutilizáveis como `Header`, `Footer` e `SideMenu`, responsáveis pela estrutura visual compartilhada entre telas.
- **Services:** Arquivo de configuração do `Axios` para comunicação com a API backend, incluindo token JWT e baseURL.
- **Navegação:** Implementada com `React Navigation` ou `Expo Router`, incluindo navegação por drawer (menu lateral) e stack.
- **Armazenamento local:** Uso de `AsyncStorage` para guardar dados persistentes como o token JWT do usuário autenticado.
- **Estilização:** Utiliza `StyleSheet` do React Native e customizações de cores e fontes com suporte à responsividade.
- **Autenticação:** Manipulação de JWT decodificado para controlar acesso a funcionalidades e telas protegidas.

---

## 🧠 Tecnologias Utilizadas (Mobile)
- **Framework:** React Native com Expo  
- **Linguagem:** JavaScript / TypeScript  
- **Navegação:** React Navigation (Drawer + Stack) / Expo Router  
- **Requisições HTTP:** Axios  
- **Armazenamento local:** AsyncStorage  
- **Gerenciamento de estado:** useState, useEffect  
- **Autenticação:** JWT (armazenado e decodificado no app)  
- **Estilização:** StyleSheet nativo + customizações próprias  
- **Componentes visuais:** Expo Vector Icons + componentes personalizados  
- **Empacotamento e build:** Expo CLI  
- **Teste e execução:** Web browser, emulador Android ou app Expo Go  

---

## 🏗️ Fluxo de Uso

1. 👤 O cidadão realiza seu cadastro.  
2. 🗺️ Informa o local da denúncia.  
3. 🗑️ Descreve o problema e cria a denúncia.  
4. 🏛️ O órgão público responsável recebe, avalia e atualiza o status.  
5. ✅ O cidadão pode acompanhar o andamento até a resolução.  

---

## 🧪 LINK YOUTUBE
Acesse:: youtu.be/r-B_Zs87Nh8

---

## 👥 Grupo - EcoDenuncia
- Henrique F. Garcia RM: 558062
- Larissa M. P. Muniz RM: 557197 
- João V. Michaeli de Bem RM: 555678

---

## 🌎 Impacto Ambiental e Social
- ♻️ Contribuição para uma cidade mais limpa e sustentável.  
- 🌧️ Redução de enchentes causadas por descarte irregular.  
- 🏙️ Melhoria na qualidade de vida urbana.  
- 🤝 Facilita a comunicação entre cidadãos e órgãos públicos.

---

## 🧩 Tecnologias Utilizadas
### 📱 Aplicativo Mobile
- React Native com Expo
- AsyncStorage para persistência local
- Axios para consumo da API
- Expo Router ou React Navigation

## 🛠️ Requisitos para rodar o projeto

### Primeiro para a API Java (Backend)

1. **Instalar o JDK 21**:
   - [https://adoptium.net](https://adoptium.net)

2. **Instalar o Maven** (caso não esteja incluído no projeto):
   - [https://maven.apache.org](https://maven.apache.org)

3. **Abrir o projeto da API em uma IDE como IntelliJ ou VS Code**

4. **Iniciar a API rodando a classe EcoDenunciaApplication.java**

### Para rodar o Mobile em seguida. (EcoDenúncia)

1. **Instalar o Node.js** (versão recomendada: 18+):
   - [https://nodejs.org](https://nodejs.org)

2. **Instalar o Expo CLI**:
   ```bash
   npm install -g expo-cli
   ```

3. **Instalar o Android Studio** (caso queira testar em emulador Android):
   - [https://developer.android.com/studio](https://developer.android.com/studio)

4. **Abrir o projeto no Android Studio ou VS Code**

5. **Instalar as dependências do projeto mobile**:
   No terminal:
   ```bash
   cd EcoDenuncia
   npm install
   ```

6. **Iniciar o app com o Expo**:
   ```bash
   npx expo start
   ```

   - Pressione `A` para abrir no emulador Android (caso esteja com Android Studio em execução)
   - Pressione `W` para abrir no navegador (modo web)

### ⚠️ IMPORTANTE – Configuração da API

No arquivo onde o Axios está configurado (provavelmente em `services/api.js`), altere a `baseURL` para o IP da máquina onde a API Java está rodando:

```js
const api = axios.create({
  baseURL: 'http://SEU_IP_LOCAL:8080',
});
