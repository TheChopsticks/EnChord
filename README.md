# EnChord

[![Netlify Status](https://api.netlify.com/api/v1/badges/61aa5294-7ef4-4d3d-978c-b61c9ac5fe4e/deploy-status)](https://app.netlify.com/sites/enchord/deploys)

**EnChord** is a perfect tool to develop your aural skills. Challenge yourself with different levels of quizzes and follow your progress by checking your highest score and average test results. You can also review what are the frequently mistaken interval types.

## Table of contents

1. [How it works](#how-it-works)
2. [Future features](#future-features)
3. [How EnChord was built](#how-enchord-was-built)
4. [Development](#development)
5. [Credits](#credits)
6. [License](#license)
7. [Badges](#badges)

## How it works

### Try 3 different levels

- **EnChord** has 3 different levels, Easy, Intermediate, and Hard.

### What are the differences

- **For enthusiastic beginners:**

  - 2 random notes will be played only upwards to help you guess the answer.
  - There is an unlimited number of getting hints for you to listen to full scale between 2 notes

- **For intermediate-level players with basic skills:**

  - 2 random notes will be played either upwards or downwards
  - There is a limited number of hints

- **For skilled musicians:**
  - 2 random notes will be played TOGETHER
  - There is no hint available.

## Future features

### Review and follow your progress:

- After each quiz set, you can review which questions you got wrong and listen to them again!
- Check your highest score and the average score of previously played games.
- Check your weakness by reviewing the most wrong interval types.

### Language support:

- Hungarian (Magyar), Korean (한국어), Traditional Chinese (繁體中文)

## How EnChord was built

`EnChord` is the very first project of `The Pokeu`. This app is written in plain JS and CSS to improve our `Vanilla JS` and `Vanilla CSS` skills and to take a deep dive into code organization. To write clean and organized code without any help of frameworks, we introduced some design patterns.

- First was the [MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC) architecture. We separated the pure game logic(Models) and the UI(Views), and created the `controller` class to manage the communication between other modules.

- To achieve this "separation of concerns", we implemented another design pattern, [Publish/Subscribe](https://ably.com/topic/pub-sub). Sharing common knowledge through a data pipe, the `controller` class, other modules can solely focus on performing their tasks and do not need to worry about whereabouts of inputs and outputs.

The benefits of such patterns helped us to avoid spaghetti code and made it easy to maintain the app and expand game features.

As our aim was to develop an app that is more than just a one-time use, we also felt the need of having a database system. Therefore, we utilized the [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to store scores of users and have stored data available for [future features](#future-features) . Considering future scalability of the application, `storage` module is written in a way that the change of storage method is possible.

## Development

### Development

1. Run `npm install` to install project dependencies.
2. Run `npm start` to start the development server. The project files will be served at port `8080`, and can be viewed by navigating to `localhost:8080` in your web browser.

A pre-commit hook will automatically lint and format staged `.js` files in the `/src` directory.

### Production

To build the project, run:
`npm run build`

## Credits

- [Utopia](https://utopia.fyi/)

## License

_EnChord_ is available under the MIT license. See the LICENSE file for more information.
