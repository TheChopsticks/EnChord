# EnChord

**EnChord** is a perfect tool to develop your music dictation skills. Challenge yourself with different levels of quizzes and follow your progress by checking your highest score and average test results. You can also review what are the frequently mistaken interval types.

## Table of contents

1. [How it works](https://github.com/TheChopsticks/EnChord/edit/main/README.md#how-it-works)
2. [Future feature](https://github.com/TheChopsticks/EnChord/edit/main/README.md#future-features)
3. [How EnChord was built](https://github.com/TheChopsticks/EnChord/edit/main/README.md#how-enchord-was-built)
4. [Installation](https://github.com/TheChopsticks/EnChord/edit/main/README.md#installation)
5. [Credits](https://github.com/TheChopsticks/EnChord/edit/main/README.md#credits)
6. [License](https://github.com/TheChopsticks/EnChord/edit/main/README.md#license)
7. [Badges](https://github.com/TheChopsticks/EnChord/edit/main/README.md#badges)

## How it works

#### Try 3 different levels

- **EnChord** has 3 different levels, Easy, Intermediate, and Hard.

#### What are the differences

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

#### Review and follow your progress:

- After each quiz set, you can review which questions you got wrong and listen to them again!
- Check your highest score and the average score of previously played games.
- Check your weakness by reviewing the most wrong interval types.

#### Language support:

- Mandarin(普通话), Korean(한국어), Hungarian(Magyar)

## How EnChord was built

The `EnChord` is the very first project of `The Forks`. There are important points we particularly focused on while developing `EnChord`.

First is that `EnChord` is written in plain JS and CSS. This allowed us to improve our `VanilaJS` and `VanilaCSS` skills and take a deep dive into code organization.

To keep the program neat without using any frameworks, we implemented the [MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC#:~:text=MVC%20(Model%2DView%2DController,of%20labor%20and%20improved%20maintenance.) architecture pattern. We separated the pure game logic(Models) and the UI(Views) and created the controller class to manage communication between the logic and display. This "separation of concerns" made the maintenance of the application and introduction of new futures easy.

## Installation

### Development

1. Run `npm install` to install project dependencies.
2. Run `npm start` to start the development server. The project files will be served at port `8080`, and can be viewed by navigating to `localhost:8080` in your web browser.

A pre-commit hook will automatically lint and format staged `.js` files in the `/src` directory.

### Production

To build the project, run:
`npm run build`

## Credits

## License

## Badges

## Scripts
