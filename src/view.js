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

    // Texts
    gameTitle.textContent = 'Cool name for music app';
    gameRuleParagraph.textContent = 'Guess the interval between the 2 tones.';
    startButton.textContent = 'Start';
  }

  renderQuestionPage() {
    // Create elements
    const questionNumber = document.createElement('div');
    const playButton = document.createElement('button');
    const gameRuleParagraph = document.createElement('p');
    const buttonsGridContainer = document.createElement('div');
    const skipButton = document.createElement('button');

    // Create answer buttons and append them to buttonsGridContainer
    const minor2nd = document.createElement('button');
    const major2nd = document.createElement('button');
    const minor3rd = document.createElement('button');
    const major3rd = document.createElement('button');
    const perfect4th = document.createElement('button');
    const tritone = document.createElement('button');
    const perfect5th = document.createElement('button');
    const minor6th = document.createElement('button');
    const major6th = document.createElement('button');
    const minor7th = document.createElement('button');
    const major7th = document.createElement('button');

    buttonsGridContainer.appned(
      minor2nd,
      major2nd,
      minor3rd,
      major3rd,
      perfect4th,
      tritone,
      perfect5th,
      minor6th,
      major6th,
      minor7th,
      major7th
    );

    this.appContainer.append(
      questionNumber,
      playButton,
      gameRuleParagraph,
      buttonsGridContainer,
      skipButton
    );

    // Texts
    questionNumber.textContent = 'Question: ';
    gameRuleParagraph.textContent = 'Guess the interval between the 2 tones.';
    minor2nd.textContent = 'Minor 2nd';
    major2nd.textContent = 'Major 2nd';
    minor3rd.textContent = 'Minor 3rd';
    major3rd.textContent = 'Major 3rd';
    perfect4th.textContent = 'Perfect 4th';
    tritone.textContent = 'Tritone';
    perfect5th.textContent = 'Perfect 5th';
    minor6th.textContent = 'Minor 6th';
    major6th.textContent = 'Major 6th';
    minor7th.textContent = 'Minor 7th';
    major7th.textContent = 'Major 7th';
    skipButton.textContent = 'Skip';
  }

  // updateScore()

  // renderResults()
}
