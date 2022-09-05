export class View {
  constructor(musicApp) {
    this.appContainer = musicApp;
    this.playTonesButtonClickCounter = 0;
    this.userScoreCounter = 0;
    this.questionNumberCounter = 1;
  }

  #createButton(buttonText) {
    const button = document.createElement('button');
    button.textContent = buttonText;
    return button;
  }

  renderStartPage() {
    this.resetPreviousGameData();

    const gameTitle = document.createElement('h1');
    const gameRuleParagraph = document.createElement('p');
    const gameStartButton = document.createElement('button');

    this.appContainer.append(gameTitle, gameRuleParagraph, gameStartButton);

    gameTitle.textContent = 'Cool name for music app';
    gameRuleParagraph.textContent = 'Guess the interval between the 2 tones.';
    gameStartButton.textContent = 'Start';

    gameStartButton.addEventListener('click', this.renderQuestionPage);
  }

  renderQuestionPage() {
    const currentQuestionNumberDisplay = document.createElement('div');
    const currentQuestionNumberSpan = document.createElement('span');
    const playTonesButton = document.createElement('button');
    const gameRuleParagraph = document.createElement('p');
    const buttonsGridContainer = document.createElement('div');
    const submitAndMoveToNextQuestionButton = document.createElement('button');
    const skipQuestionButton = document.createElement('button');
    const currentScoreDisplay = document.createElement('div');
    const currentScoreSpan = document.createElement('span');

    const minor2nd = this.#createButton('Minor 2nd');
    const major2nd = this.#createButton('Major 2nd');
    const minor3rd = this.#createButton('Minor 3rd');
    const major3rd = this.#createButton('Major 3rd');
    const perfect4th = this.#createButton('Perfect 4th');
    const tritone = this.#createButton('Tritone');
    const perfect5th = this.#createButton('Perfect 5th');
    const minor6th = this.#createButton('Minor 6th');
    const major6th = this.#createButton('Major 6th');
    const minor7th = this.#createButton('Minor 7thd');
    const major7th = this.#createButton('Major 7th');

    buttonsGridContainer.append(
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

    currentQuestionNumberDisplay.append(currentQuestionNumberSpan);
    currentScoreDisplay.append(currentScoreSpan);

    this.appContainer.append(
      currentQuestionNumberDisplay,
      playTonesButton,
      gameRuleParagraph,
      buttonsGridContainer,
      skipQuestionButton,
      submitAndMoveToNextQuestionButton,
      currentScoreDisplay
    );

    currentQuestionNumberDisplay.textContent = 'Question: ';
    currentQuestionNumberSpan.textContent = this.questionNumberCounter;
    playTonesButton.textContent = 'Play tones';
    gameRuleParagraph.textContent = 'Guess the interval between the 2 tones.';

    skipQuestionButton.textContent = 'Skip';
    submitAndMoveToNextQuestionButton.textContent = 'Move to next';
    currentScoreDisplay.textContent = 'Score: ';
    currentScoreSpan.textContent = this.userScoreCounter;

    playTonesButton.addEventListener(
      'click',
      this.increasePlayTonesButtonClickCount
    );

    skipQuestionButton.addEventListener('click', this.checkUserAnswer);

    submitAndMoveToNextQuestionButton.addEventListener(
      'click',
      this.checkUserAnswer
    );
  }

  updateQuestionNumberCounter() {
    this.questionNumberCounter += 1;
  }

  updateCurrentUserScoreCounter() {
    this.userScoreCounter += 1;
  }

  increasePlayTonesButtonClickCount() {
    this.playTonesButtonClickCounter += 1;
    this.playTonesButton.textContent = 'Replay tones';
  }

  // -------------------------------------------------------

  checkUserAnswer() {
    // If the user clicks 'Skip' button,
    //       => pass the user answer as undefined or an empty string.

    // If the user answer is not undefined or an empty string but correct,
    //       => this.updateCurrentUserScoreCounter()
    this.updateQuestionNumberCounter();
    this.loadNextQuestion();
  }

  loadNextQuestion() {
    this.resetPlayTonesButtonClickCountForNewQuestion();
  }

  resetPlayTonesButtonClickCountForNewQuestion() {
    this.playTonesButtonClickCounter = 0;
  }
  // -------------------------------------------------------

  renderResults() {
    const finalUserScoreDisplay = document.createElement('div');
    const finalUserScore = document.createElement('span');
    const playGameAgainButton = document.createElement('button');

    finalUserScoreDisplay.append(finalUserScore);

    this.appContainer.append(finalUserScoreDisplay, playGameAgainButton);

    playGameAgainButton.addEventListener('click', this.renderStartPage);
  }

  resetPreviousGameData() {
    this.userScoreCounter = 0;
    this.playTonesButtonClickCounter = 0;
    this.questionNumberCounter = 1;
  }
}
