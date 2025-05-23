# Embedded Inbox Demo

This is a React-based demo application for an embedded inbox, built with TypeScript and Vite.

---

## Table of Contents

- [Embedded Inbox Demo](#embedded-inbox-demo)
  - [Table of Contents](#table-of-contents)
  - [Setup Instructions](#setup-instructions)
  - [Usage Guidelines](#usage-guidelines)
  - [Contributing](#contributing)

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd embedded-inbox-demo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application in development mode:**
   ```bash
   npm run dev
   ```

4. **Build the application for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

6. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

---

## Usage Guidelines

- **Internationalization:**
  - We are using `i18next` and `react-i18next` to provide the component with correct text in English and Arabic languages. Translation JSONs are moved from the `@bcrumbs.net/inbox` library to assets folder, and they are configured to be copied to `dist` folder after bulding the project. You will need to handle them in the way you want inside your project and don't forget to initialize `i18n` module, you can take a look on how we are initializing it in this project.

- **GraphQL:**
  - You will need to wrap your app with `ApolloProvider` and use `dconfigClient` exported by `@bcrumbs.net/bc-api` in order for the inbox component to be able to work with the backend.

- **Azure Blob Storage:**
  - Files uploaded by the chat window is uploaded to a blob storage in our Azure cloud account, because of that you will need to install `@azure/storage-blob` and configure that correctly inside `vite.config` file.
  
- **Inbox Theme Context:**
  - We are using internal theme context to manage the language and other styling things inside the inbox component, you need to wrap the inbox component with our `ThemeProvider` exported by the inbox library itself.
  - ```tsx
    import { Inbox, ThemeProvider } from '@bcrumbs.net/inbox';

    const Component: React.FC = () => {
      return (
        <ThemeProvider>
          <Inbox rtl={false} onConversationChange={(conv) => console.log(`Conversation with id ${conv.id} is selected`)} />
        </ThemeProvider>
      );
    };

    export default App;
    ```
  - For now we are supporting only one custom parameter for the `ThemeProvider` which is logo, you can add the path of your logo to use it inside the chat window as agent avatar.

- **Radix UI Themes:**
  - Import and use Radix UI themes in your app because our Inbox component uses some RadixUI components:
    ```tsx
    import { Theme } from '@radix-ui/themes';

    const App: React.FC = () => {
      return (
        <Theme>
          <div>Your app content here</div>
        </Theme>
      );
    };

    export default App;
    ```
  - Customize themes by overriding CSS variables or using the Radix UI design tokens.

- **Generic styles:**
  - You need to import the next css files:
  ```html
    <link
      rel="stylesheet"
      href="https://cdn.bcrumbs.net/bc-assets/styles/skin.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.bcrumbs.net/bc-assets/styles/skeleton.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.bcrumbs.net/bc-assets/styles/radix-ui.css"
    />
  ```
  - It's recommonded to import the following font file:
  ```html
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:100,300,500,700&display=swap"
      rel="stylesheet"
    />
  ```
  - In skeleton.css we are applying `box-sizing: border-box;` to the body element, in case you don't prefer that just override it for the body, but keep it applied on our inbox component, otherwise styling will not appear correctly


- **Required local storage key-value paris:**
  - In order for the Inbox component to work probably you will need to have some localstroage key-value pairs defined before rendering it:
    - `ContextId`: Which is the workspace id of the account you want the Inbox component to work on.
    - `token`: An API key that can be generated from the dashboard to authorize requests
    - `userInfo`: a JSON that contains two attributes the `username` and `id` of the agent

---


## Contributing

We welcome contributions to this project! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

---

Feel free to reach out with any questions or suggestions!