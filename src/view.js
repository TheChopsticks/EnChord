import * as Tone from 'tone';
import { toSentenceCase } from './utils';

const levels = ['Easy', 'Intermediate', 'hard'];

const intervals = {
  'minor 2nd': 1,
  'major 2nd': 2,
  'minor 3rd': 3,
  'major 3rd': 4,
  'perfect 4th': 5,
  tritone: 6,
  'perfect 5th': 7,
  'minor 6th': 8,
  'major 6th': 9,
  'minor 7th': 10,
  'major 7th': 11,
};

export class View {
  #publishGameStartEvent;
  #publishNewAnswerEvent;
  #publishPlayGameAgainEvent;
  #currentSelectedIntervalSemitones;
  #sampler;
  #currentNote1;
  #currentNote2;

  constructor(
    musicApp,
    publishGameStartEvent,
    publishNewAnswerEvent,
    publishPlayGameAgainEvent
  ) {
    this.level;
    this.appContainer = musicApp;
    this.isPlayTonesButtonClicked = false;
    this.#publishGameStartEvent = publishGameStartEvent;
    this.#publishNewAnswerEvent = publishNewAnswerEvent;
    this.#publishPlayGameAgainEvent = publishPlayGameAgainEvent;
    this.#sampler = new Tone.Sampler({
      urls: {
        C4: 'C4.mp3',
        'D#4': 'Ds4.mp3',
        'F#4': 'Fs4.mp3',
        A4: 'A4.mp3',
      },
      release: 2,
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
    }).toDestination();
  }

  #createButton(buttonText) {
    return this.#createElement('button', toSentenceCase(buttonText));
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

    // Different level buttons and a game start button.

    const gameStartButton = this.#createButton('Start');
    gameStartButton.disabled = true;

    const levelButtons = levels.map((level) => {
      const button = this.#createButton(level);
      button.addEventListener('click', () => {
        this.level = level;
        gameStartButton.disabled = false;
      });
      return button;
    });

    this.appContainer.append(
      gameTitle,
      gameRuleParagraph,
      ...levelButtons,
      gameStartButton
    );
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
    playTonesButton.id = 'playTonesBtn';
    const gameRuleParagraph = this.#createElement(
      'p',
      'Guess the interval between the 2 tones.'
    );

    const buttonsGridContainer = this.#createElement('div');

    const submitAndMoveToNextQuestionButton =
      this.#createButton('Move to next');
    submitAndMoveToNextQuestionButton.disabled = true;
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

    const intervalButtons = Object.entries(intervals).map(
      ([intervalName, semitones]) => {
        const button = this.#createButton(intervalName);
        button.addEventListener('click', () => {
          this.#currentSelectedIntervalSemitones = semitones;
          submitAndMoveToNextQuestionButton.disabled = false;
        });
        return button;
      }
    );

    buttonsGridContainer.append(...intervalButtons);

    playTonesButton.addEventListener('click', () => {
      const now = Tone.now();
      this.#sampler.triggerAttackRelease(this.#currentNote1, '8n', now);
      this.#sampler.triggerAttackRelease(this.#currentNote2, '8n', now + 1);
      this.isPlayTonesButtonClicked = true;
      this.#changePlayTonesButtonText(playTonesButton);
    });

    skipQuestionButton.addEventListener('click', () => {
      this.#publishNewAnswerEvent(undefined);
    });

    submitAndMoveToNextQuestionButton.addEventListener('click', () => {
      this.#publishNewAnswerEvent(this.#currentSelectedIntervalSemitones);
      submitAndMoveToNextQuestionButton.disabled = true;
    });
  }

  updateQuestionPage(questionData) {
    const playTonesButton = document.getElementById('playTonesBtn');
    playTonesButton.textContent = 'Play tones';
    this.isPlayTonesButtonClicked = false;
    this.#currentNote1 = questionData.note1;
    this.#currentNote2 = questionData.note2;
    this.#currentSelectedIntervalSemitones = undefined;

    const currentQuestionNumberSpan = document.getElementById('questionNumber');
    currentQuestionNumberSpan.textContent = questionData.questionNumber;
    const currentScoreSpan = document.getElementById('currentScore');
    currentScoreSpan.textContent = questionData.score;
  }

  #changePlayTonesButtonText(playTonesButton) {
    if (this.isPlayTonesButtonClicked) {
      playTonesButton.textContent = 'Replay tones';
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
      'click',
      this.#publishPlayGameAgainEvent
    );
  }
}
