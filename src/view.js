export class View {
  constructor(musicApp) {
    this.appContainer = musicApp;
    this.playTonesButtonClickCount = 0;
    this.userScoreCounter = 0;
    this.questionNumberCounter = 1;
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
    skipQuestionButton.textContent = 'Skip';
    submitAndMoveToNextQuestionButton.textContent = 'Move to next';
    currentScoreDisplay.textContent = 'Score: ';
    currentScoreSpan.textContent = this.userScoreCounter;

    playTonesButton.addEventListener(
      'click',
      this.increasePlayTonesButtonClickCount
    );

    skipQuestionButton.addEventListener('click', this.saveUserAnswer);

    submitAndMoveToNextQuestionButton.addEventListener(
      'click',
      this.saveUserAnswer
    );
  }

  updateQuestionNumberCounter() {
    this.questionNumberCounter += 1;
  }

  updateCurrentUserScoreCounter() {
    this.userScoreCounter += 1;
  }

  increasePlayTonesButtonClickCount() {
    this.playTonesButtonClickCount += 1;
    this.playTonesButton.textContent = 'Replay tones';
  }

  // -------------------------------------------------------

  saveUserAnswer() {
    // If the user clicks 'Skip' button, pass the user answer as undefined or an empty string.

    // If the user answer is not undefined or an empty string => this.updateCurrentUserScoreCounter()
    this.updateQuestionNumberCounter();
    this.loadNextQuestion();
  }

  loadNextQuestion() {
    this.resetPlayTonesButtonClickCountForNewQuestion();
  }

  resetPlayTonesButtonClickCountForNewQuestion() {
    this.playTonesButtonClickCount = 0;
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
    this.playTonesButtonClickCount = 0;
    this.questionNumberCounter = 1;
  }
}
