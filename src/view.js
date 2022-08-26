export class View {
  constructor(musicApp) {
    this.appContainer = musicApp;
  }

  renderStartPage() {
    // Create elements
    const gameTitle = document.createElement('h1');
    const gameRuleParagraph = document.createElement('p');
    const startButton = document.createElement('button');

    // Append Elements to the main app container.
    this.appContainer.append(gameTitle, gameRuleParagraph, startButton);

    gameTitle.textContent = 'Cool name for music app';
    gameRuleParagraph.textContent = 'Guess the interval between the 2 tones.';
    startButton.textContent = 'Start';
  }

  // renderQuestion()

  // updateScore()

  // renderResults()
}
