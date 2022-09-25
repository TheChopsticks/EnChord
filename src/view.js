import * as Tone from 'tone';
import { toSentenceCase } from './utils';

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
    const button = this.#createElement('button', toSentenceCase(buttonText));
    button.type = 'button';
    return button;
  }

  #createElement(elementType, elementText = '') {
    const element = document.createElement(elementType);
    element.textContent = elementText;
    return element;
  }

  renderStartPage() {
    if (this.appContainer.hasChildNodes()) this.appContainer.replaceChildren();

    const gameTitle = this.#createElement('h1', 'Cool name for music app');
    const gameDescription = this.#createElement(
      'h3',
      'Guess the interval between the 2 tones.'
    );
    const gameStartButton = this.#createButton('Start');

    this.appContainer.append(gameTitle, gameDescription, gameStartButton);
    gameStartButton.addEventListener('click', this.#publishGameStartEvent);
  }

  renderQuestionPage() {
    this.appContainer.replaceChildren();

    // Header: current question number, score
    const currentQuestionNumberDisplay = this.#createElement(
      'h3',
      'Question: '
    );
    const currentQuestionNumberSpan = this.#createElement('span');
    currentQuestionNumberSpan.id = 'questionNumber';
    currentQuestionNumberDisplay.append(currentQuestionNumberSpan);

    const currentScoreDisplay = this.#createElement('h3', 'Score: ');
    const currentScoreSpan = this.#createElement('span');
    currentScoreSpan.id = 'currentScore';
    currentScoreDisplay.append(currentScoreSpan);

    const headerContainer = this.#createElement('div');
    headerContainer.append(currentQuestionNumberDisplay, currentScoreDisplay);

    // Question: button to (re)play tones, game instruction
    const playTonesButton = this.#createButton('Play tones');
    playTonesButton.id = 'playTonesBtn';
    const gameRuleParagraph = this.#createElement(
      'p',
      'Guess the interval between the 2 tones.'
    );

    // Answer: interval buttons, guess button, skip button
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

    const submitAndMoveToNextQuestionButton = this.#createButton('Guess');
    submitAndMoveToNextQuestionButton.disabled = true;
    const buttonsGridContainer = this.#createElement('div');
    buttonsGridContainer.append(...intervalButtons);
    buttonsGridContainer.append(submitAndMoveToNextQuestionButton);

    const skipQuestionButton = this.#createButton('Skip');

    // Update app
    this.appContainer.append(
      headerContainer,
      playTonesButton,
      gameRuleParagraph,
      buttonsGridContainer,
      skipQuestionButton
    );

    // Event listeners
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

    const finalUserScoreDisplay = this.#createElement('h3', 'Score: ');
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
