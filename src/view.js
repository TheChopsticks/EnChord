export class View {
  constructor(musicApp) {
    this.appContainer = musicApp;
    this.playTonesButtonClickCounter = 0;
    // this.isPlayTonesButtonClicked = false;
    this.userScoreCounter = 0;
    this.questionNumberCounter = 1;
  }

  #createButton(buttonText) {
    return this.#createElement('button', buttonText);
  }

  #createElement(elementType, elementText = '') {
    const element = document.createElement(elementType);
    element.textContent = elementText;
    return element;
  }

  renderStartPage() {
    this.resetPreviousGameData();

    const gameTitle = this.#createElement('h1', 'Cool name for music app');
    const gameRuleParagraph = this.#createElement(
      'p',
      'Guess the interval between the 2 tones.'
    );
    const gameStartButton = this.#createButton('Start');

    this.appContainer.append(gameTitle, gameRuleParagraph, gameStartButton);
    gameStartButton.addEventListener('click', this.renderQuestionPage);
  }

  renderQuestionPage() {
    const currentQuestionNumberDisplay = this.#createElement(
      'div',
      'Question: '
    );
    const currentQuestionNumberSpan = this.#createElement(
      'span',
      this.questionNumberCounter
    );
    currentQuestionNumberDisplay.append(currentQuestionNumberSpan);
    const playTonesButton = this.#createButton('Play tones');
    const gameRuleParagraph = this.#createElement(
      'p',
      'Guess the interval between the 2 tones.'
    );

    const buttonsGridContainer = this.#createElement('div');

    const submitAndMoveToNextQuestionButton =
      this.#createButton('Move to next');
    const skipQuestionButton = this.#createButton('Skip');

    const currentScoreDisplay = this.#createElement('div', 'Score: ');
    const currentScoreSpan = this.#createElement('span', this.userScoreCounter);
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
      // this.changePlayTonesButtonText
      this.increasePlayTonesButtonClickCount
    );

    skipQuestionButton.addEventListener('click', this.checkUserAnswer);

    submitAndMoveToNextQuestionButton.addEventListener(
      'click',
      this.checkUserAnswer
    );
  }

  // #changePlayTonesButtonText() {
  // this.playTonesButton.textContent = 'Replay tones';
  // }

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
    const finalUserScoreDisplay = this.#createElement('div');
    const finalUserScore = this.#createElement('span');
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
