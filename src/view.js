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

  #createElement(elementType, elementText = '') {
    const element = document.createElement(elementType);
    element.textContent = elementText;
    return element;
  }

  renderStartPage() {
    this.resetPreviousGameData();

    const gameTitle = document.createElement('h1');
    gameTitle.textContent = 'Cool name for music app';

    const gameRuleParagraph = document.createElement('p');
    gameRuleParagraph.textContent = 'Guess the interval between the 2 tones.';

    const gameStartButton = this.#createButton('Start');

    this.appContainer.append(gameTitle, gameRuleParagraph, gameStartButton);
    gameStartButton.addEventListener('click', this.renderQuestionPage);
  }

  renderQuestionPage() {
    const currentQuestionNumberDisplay = document.createElement('div');
    currentQuestionNumberDisplay.textContent = 'Question: ';

    const currentQuestionNumberSpan = document.createElement('span');
    currentQuestionNumberSpan.textContent = this.questionNumberCounter;
    currentQuestionNumberDisplay.append(currentQuestionNumberSpan);

    const playTonesButton = this.#createButton('Play tones');

    const gameRuleParagraph = document.createElement('p');
    gameRuleParagraph.textContent = 'Guess the interval between the 2 tones.';

    const buttonsGridContainer = document.createElement('div');

    const submitAndMoveToNextQuestionButton =
      this.#createButton('Move to next');
    const skipQuestionButton = this.#createButton('Skip');

    const currentScoreDisplay = document.createElement('div');
    currentScoreDisplay.textContent = 'Score: ';
    const currentScoreSpan = document.createElement('span');
    currentScoreSpan.textContent = this.userScoreCounter;
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
    finalUserScoreDisplay.append(finalUserScore);

    const playGameAgainButton = this.#createButton('Play again!');

    this.appContainer.append(finalUserScoreDisplay, playGameAgainButton);

    playGameAgainButton.addEventListener('click', this.renderStartPage);
  }

  resetPreviousGameData() {
    this.userScoreCounter = 0;
    this.playTonesButtonClickCounter = 0;
    this.questionNumberCounter = 1;
  }
}
