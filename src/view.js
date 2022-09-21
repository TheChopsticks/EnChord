export class View {
  #publishGameStartEvent;
  #publishNewAnswerEvent;

  constructor(musicApp, publishGameStartEvent, publishNewAnswerEvent) {
    this.appContainer = musicApp;
    this.isPlayTonesButtonClicked = false;
    this.#publishGameStartEvent = publishGameStartEvent;
    this.#publishNewAnswerEvent = publishNewAnswerEvent;
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
    if (this.appContainer.hasChildNodes()) this.appContainer.replaceChildren();

    const gameTitle = this.#createElement('h1', 'Cool name for music app');
    const gameRuleParagraph = this.#createElement(
      'p',
      'Guess the interval between the 2 tones.'
    );
    const gameStartButton = this.#createButton('Start');

    this.appContainer.append(gameTitle, gameRuleParagraph, gameStartButton);
    gameStartButton.addEventListener('click', this.#publishGameStartEvent);
  }

  renderQuestionPage() {
    this.appContainer.replaceChildren();

    const currentQuestionNumberDisplay = this.#createElement(
      'div',
      'Question: '
    );
    const currentQuestionNumberSpan = this.#createElement('span');
    currentQuestionNumberSpan.id = 'questionNumber';
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
    const currentScoreSpan = this.#createElement('span');
    currentScoreSpan.id = 'currentScore';
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

    playTonesButton.addEventListener('click', () => {
      // playTonesButton clicked event
      this.isPlayTonesButtonClicked = true;
      this.#changePlayTonesButtonText();
    });

    skipQuestionButton.addEventListener('click', () => {
      this.#publishNewAnswerEvent(undefined);
    });

    submitAndMoveToNextQuestionButton.addEventListener('click', (data) => {
      this.#publishNewAnswerEvent(data);
    });
  }

  updateQuestionPage(questionData) {
    this.isPlayTonesButtonClicked = false;
    const currentQuestionNumberSpan = document.getElementById('questionNumber');
    currentQuestionNumberSpan.textContent = questionData.questionNumber;
    const currentScoreSpan = document.getElementById('currentScore');
    currentScoreSpan.textContent = questionData.score;
  }

  #changePlayTonesButtonText() {
    if (this.isPlayTonesButtonClicked) {
      this.playTonesButton.textContent = 'Replay tones';
    }
  }

  renderResults(userScore) {
    this.appContainer.replaceChildren();

    const finalUserScoreDisplay = this.#createElement('div');
    const finalUserScore = this.#createElement('span');
    finalUserScore.textContent = userScore;
    finalUserScoreDisplay.append(finalUserScore);

    const playGameAgainButton = this.#createButton('Play again!');

    this.appContainer.append(finalUserScoreDisplay, playGameAgainButton);

    playGameAgainButton.addEventListener(
      'click'
      // playGameAgainButton clicked event.
    );
  }
}
