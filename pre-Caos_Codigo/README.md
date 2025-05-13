# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Direcciones de Solana y su uso (Imagen @SCR-20250511-pazh.png)

## Español

- **Address:** `GuNPXxRBR...tpEEQhseF`
  - Es la dirección de la cuenta de token específica en Solana. Identifica de manera única la cuenta de token SPL donde se almacenan los tokens de un usuario para un mint específico.
- **Mint:** `7v1APBRTFQ...Y61RvLUvB7`
  - Es la dirección del mint del token. Identificador único del tipo de token SPL. Todos los tokens de este tipo comparten este mint.
- **Owner:** `8x99Ffpzm0...JMCUm5bKe`
  - Es la dirección del propietario de la cuenta de token. Indica quién controla la cuenta y puede autorizar transferencias de los tokens almacenados.

## Italiano

- **Address:** `GuNPXxRBR...tpEEQhseF`
  - Indirizzo dell'account token specifico su Solana. Identifica in modo univoco l'account token SPL dove sono conservati i token di un utente per uno specifico mint.
- **Mint:** `7v1APBRTFQ...Y61RvLUvB7`
  - Indirizzo del mint del token. Identificatore unico del tipo di token SPL. Tutti i token di questo tipo condividono questo mint.
- **Owner:** `8x99Ffpzm0...JMCUm5bKe`
  - Indirizzo del proprietario dell'account token. Indica chi controlla l'account e può autorizzare trasferimenti dei token conservati.

## Català

- **Address:** `GuNPXxRBR...tpEEQhseF`
  - Adreça del compte de token específic a Solana. Identifica de manera única el compte de token SPL on s'emmagatzemen els tokens d'un usuari per a un mint concret.
- **Mint:** `7v1APBRTFQ...Y61RvLUvB7`
  - Adreça del mint del token. Identificador únic del tipus de token SPL. Tots els tokens d'aquest tipus comparteixen aquest mint.
- **Owner:** `8x99Ffpzm0...JMCUm5bKe`
  - Adreça del propietari del compte de token. Indica qui controla el compte i pot autoritzar transferències dels tokens emmagatzemats.

# Direcciones de Solana y su uso (Imagen @SCR-20250511-pcme.png)

## Español
- **Address:** `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`
  - Es la dirección del programa de tokens SPL en Solana, conocido como "Token Program". Gestiona la creación, transferencia y manejo de todos los tokens SPL en la red Solana.
- **Assigned Program Id:** `BPF Loader 2`
  - Es el identificador del programa asignado que gestiona la cuenta. Indica que el programa fue cargado usando el cargador BPF, que permite ejecutar programas en Solana.

## Italiano
- **Address:** `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`
  - È l'indirizzo del programma token SPL su Solana, noto come "Token Program". Gestisce la creazione, il trasferimento e la gestione di tutti i token SPL sulla rete Solana.
- **Assigned Program Id:** `BPF Loader 2`
  - È l'identificatore del programma assegnato che gestisce l'account. Indica che il programma è stato caricato usando il caricatore BPF, che permette di eseguire programmi su Solana.

## Català
- **Address:** `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`
  - És l'adreça del programa de tokens SPL a Solana, conegut com a "Token Program". Gestiona la creació, transferència i gestió de tots els tokens SPL a la xarxa Solana.
- **Assigned Program Id:** `BPF Loader 2`
  - És l'identificador del programa assignat que gestiona el compte. Indica que el programa s'ha carregat utilitzant el carregador BPF, que permet executar programes a Solana.

# Uso de la dirección Mint de Solana en .env

## Español
- **Address:** `4MCKxwSEF3M6y9WsLiJtkoKaMtWh7eRhuV1gRUVZMg6w`
  - Es la dirección del mint de un token SPL en Solana.
  - Es correcto guardar la dirección pública del mint en un archivo `.env` para que los scripts o el backend sepan a qué token SPL referirse para mintear, transferir o consultar balances.
  - **Importante:** Nunca pongas la clave privada (secret key) del mint en el `.env` si el archivo se comparte o sube a un repositorio público. Solo la dirección pública es segura para exponer.

## Italiano
- **Address:** `4MCKxwSEF3M6y9WsLiJtkoKaMtWh7eRhuV1gRUVZMg6w`
  - È l'indirizzo del mint di un token SPL su Solana.
  - È corretto salvare l'indirizzo pubblico del mint in un file `.env` per permettere agli script o backend di sapere a quale token SPL riferirsi per mintare, trasferire o consultare i balance.
  - **Importante:** Non mettere la chiave privata (secret key) del mint nel `.env` se il file viene condiviso o pubblicato. Solo l'indirizzo pubblico è sicuro da esporre.

## Català
- **Address:** `4MCKxwSEF3M6y9WsLiJtkoKaMtWh7eRhuV1gRUVZMg6w`
  - És l'adreça del mint d'un token SPL a Solana.
  - És correcte guardar l'adreça pública del mint en un fitxer `.env` perquè els scripts o backend sàpiguen a quin token SPL referir-se per mintejar, transferir o consultar balanços.
  - **Important:** No posis la clau privada (secret key) del mint al `.env` si el fitxer es comparteix o es puja a un repositori públic. Només l'adreça pública és segura d'exposar.
