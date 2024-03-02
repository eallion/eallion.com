# Contributing to Mastodon embed timeline

Thanks for your interest in contributing. Any feature and improvement from the community to make this project better is always welcome.

## 🤝 How to contribute

### Reporting issues

If you find any bugs, issues, or have suggestions, please [create a new issue](https://gitlab.com/idotj/mastodon-embed-timeline/-/issues/new) and provide detailed information about the problem or feature.

### Code contributions

1. Fork the repository on GitLab.
2. Create a new branch from the `main` branch for your changes.
3. Make your modifications and ensure that your code follows the coding standards.
4. Compile and test your changes thoroughly.
5. Submit a pull request to the `main` branch with a clear title and description.

## 🛠️ Getting started

### Setup your environment

- Choose your favorite IDE and check that the configuration matches the `.editorconfig` setup to respect the same coding styles.  
  By default, this project is developed using [VScode](https://code.visualstudio.com/) with the plugins [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode).

- Get [Git](https://git-scm.com/downloads) if you don't have it in your computer and after installation clone the repository by typing:
  
  ```terminal
  git clone https://gitlab.com/idotj/mastodon-embed-timeline.git
  ```

- Install [Node.js](https://nodejs.org/en) if you don't have it and then go into the project folder `mastodon-embed-timeline/` and enter:
  
  ```terminal
  npm i
  ```

- After all the packages are installed, do a check to see that it compiles as expected typing the following script to run a build:

  ```terminal
  npm run build
  ```

- All set, time to code!

### Testing

Ensure that your changes do not break existing functionality. If applicable, provide tests for new features or bug fixes.  

The example pages located in the folder `examples/` can be a good reference to test the changes made.  

If you need to emulate a server for your local development/testing, here are some options:

- Install a static HTTP server via npm:

  ```terminal
  npm install --global http-server
  ```

  After installation, run the command:

  ```terminal
  http-server ./
  ```

  Now you can open your browser and navigate to any of the HTML examples. For example to open a Local timeline, your default url will be:  
  [http://localhost:8080/examples/local-timeline.html](http://localhost:8080/examples/local-timeline.html)

- Install [Docker compose](https://docs.docker.com/compose/install/) in your computer and run the following command:
  
  ```terminal
  docker compose up
  ```

  Now open your browser and entering the following url you will land in the Local timeline page:  
  [http://localhost:8080/examples/local-timeline.html](http://localhost:8080/examples/local-timeline.html)

## 🔍 Code review process

All contributions will go through a code review process. Be prepared to address feedback and make necessary changes to your code.

## ⚖️ License

By contributing to this project, you agree that your contributions will be licensed under the GNU Affero General Public License v3.0.
