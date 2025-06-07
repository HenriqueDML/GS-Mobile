
# 🌱 EcoDenúncia

## 📖 Descrição
EcoDenúncia é um aplicativo mobile integrado a uma API Java que permite ao cidadão denunciar pontos de descarte irregular de lixo em sua cidade. A plataforma busca facilitar a comunicação com órgãos públicos e promover um ambiente urbano mais limpo e consciente.

---

## 🧩 Tecnologias Utilizadas

### 📱 Aplicativo Mobile
- React Native com Expo
- AsyncStorage para persistência local
- Axios para consumo da API
- Expo Router ou React Navigation

### 🌐 API Backend
- Java 21
- Quarkus
- Banco de Dados MariaDB
- REST API

---

## 🛠️ Requisitos para rodar o projeto

### Para o Mobile (EcoDenúncia)

1. **Instalar o Node.js** (versão recomendada: 18+):
   - [https://nodejs.org](https://nodejs.org)

2. **Instalar o Expo CLI**:
   ```bash
   npm install -g expo-cli
   ```

3. **Instalar o Android Studio** (caso queira testar em emulador Android):
   - [https://developer.android.com/studio](https://developer.android.com/studio)

4. **Abrir o projeto no Visual Studio Code**

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

---

### Para a API Java (Backend)

1. **Instalar o JDK 21**:
   - [https://adoptium.net](https://adoptium.net)

2. **Instalar o Maven** (caso não esteja incluído no projeto):
   - [https://maven.apache.org](https://maven.apache.org)

3. **Instalar o Docker** (para o banco de dados):
   - [https://www.docker.com](https://www.docker.com)

4. **Subir o banco de dados MariaDB com Docker**:
   ```bash
   docker run --name mariadb      -e MYSQL_ROOT_PASSWORD=root      -e MYSQL_DATABASE=eco_db      -p 3306:3306      -d mariadb
   ```

5. **Abrir o projeto da API em uma IDE como IntelliJ ou VS Code**

6. **Executar a API com Quarkus**:
   ```bash
   ./mvnw quarkus:dev
   ```

---

## 🔗 Integração entre App e API

No projeto mobile, localize onde o Axios está configurado (normalmente em `services/api.js`) e substitua a baseURL pelo IP da sua máquina local:

```js
const api = axios.create({
  baseURL: 'http://<SEU_IP_LOCAL>:8080',
});
```

> Obs: No Windows, use `ipconfig` no terminal para descobrir seu IP; no Mac/Linux, use `ifconfig`.

---

## 🧪 LINK YOUTUBE

youtu.be/r-B_Zs87Nh8

---

## 👥 Grupo - EcoDenuncia

Henrique F. Garcia RM: 558062
Larissa M. P. Muniz RM: 557197
João V. Michaeli de Bem RM: 555678
