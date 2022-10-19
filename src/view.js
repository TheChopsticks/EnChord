import * as Tone from 'tone';
import { toSentenceCase } from './utils';

const levels = ['Easy', 'Intermediate', 'Hard'];

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

const classNames = {
  flow: 'flow',
  flowSpaceLarge: 'flow-space--large',
  centerVertically: 'center-vertically',
  animateJump: 'animate--jump',
  highlight: 'highlight',
  primaryButton: 'button--primary',
  secondaryButton: 'button--secondary',
  tertiaryButton: 'button--tertiary',
  secondaryButtonActive: 'button--secondary-active',
  header: 'header',
  buttonsContainer: 'buttons-container',
};

export class View {
  #level;
  #publishGameStartEvent;
  #publishNewAnswerEvent;
  #publishPlayGameAgainEvent;
  #currentSelectedIntervalSemitones;
  #sampler;
  #toneLength;
  #currentNote1;
  #currentNote2;
  #allNotesInCurrentScale;

  constructor(
    musicApp,
    publishGameStartEvent,
    publishNewAnswerEvent,
    publishPlayGameAgainEvent
  ) {
    this.#level;
    this.appContainer = musicApp;
    this.isPlayTonesButtonClicked = false;
    this.hintButtonCounter = 0;
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
    this.#toneLength = '8n';
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
    this.appContainer.classList.add(
      classNames.centerVertically,
      classNames.flow
    );
    if (this.appContainer.hasChildNodes()) this.appContainer.replaceChildren();

    const gameTitle = this.#createElement('h1', 'Cool name for music app');
    const gameDescription = this.#createElement('h3');

    gameDescription.append(
      'Guess the interval ',
      this.#createElement('wbr'),
      'between the two tones.'
    );

    // Different level buttons and a game start button.
    const gameStartButton = this.#createButton('Start');
    gameStartButton.classList.add(classNames.primaryButton);
    gameStartButton.disabled = true;

    const levelButtons = levels.map((level) => {
      const button = this.#createButton(level);
      button.addEventListener('click', () => {
        this.#level = level;
        gameStartButton.disabled = false;
      });
      return button;
    });

    this.appContainer.append(
      gameTitle,
      gameDescription,
      ...levelButtons,
      gameStartButton
    );
    gameStartButton.addEventListener('click', () =>
      this.#publishGameStartEvent(this.#level)
    );
  }

  renderQuestionPage() {
    this.appContainer.classList.remove(classNames.centerVertically);
    this.appContainer.classList.add(classNames.flowSpaceLarge);
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
    headerContainer.classList.add(classNames.header);
    headerContainer.append(currentQuestionNumberDisplay, currentScoreDisplay);

    // Question: button to (re)play tones, game instruction
    const playTonesButton = this.#createButton('Play tones');
    playTonesButton.id = 'playTonesBtn';
    playTonesButton.classList.add(classNames.primaryButton);
    const gameRuleParagraph = this.#createElement(
      'p',
      'Guess the interval between the 2 tones.'
    );

    const getHintButton = this.#createButton('Get a hint');
    getHintButton.classList.add(classNames.primaryButton);

    // Answer: interval buttons, guess button, skip button
    const intervalButtons = Object.entries(intervals).map(
      ([intervalName, semitones]) => {
        const button = this.#createButton(intervalName);
        button.classList.add(classNames.secondaryButton);
        button.dataset.semitones = semitones;
        button.addEventListener('click', () => {
          this.#resetSelectedInterval();
          this.#currentSelectedIntervalSemitones = semitones;
          this.#toggleIntervalButtonState(semitones);
          submitAndMoveToNextQuestionButton.disabled = false;
        });
        return button;
      }
    );

    const submitAndMoveToNextQuestionButton = this.#createButton('Guess');
    submitAndMoveToNextQuestionButton.classList.add(classNames.primaryButton);
    submitAndMoveToNextQuestionButton.disabled = true;

    const skipQuestionButton = this.#createButton('Skip');
    skipQuestionButton.classList.add(classNames.tertiaryButton);

    const buttonsGridContainer = this.#createElement('div');
    buttonsGridContainer.classList.add(classNames.buttonsContainer);
    buttonsGridContainer.append(
      ...intervalButtons,
      submitAndMoveToNextQuestionButton,
      skipQuestionButton
    );

    // Update app
    this.appContainer.append(
      headerContainer,
      playTonesButton,
      gameRuleParagraph,
      buttonsGridContainer
    );

    // Event listeners
    playTonesButton.addEventListener('click', () => {
      const now = Tone.now();
      this.#sampler.triggerAttackRelease(
        this.#currentNote1,
        this.#toneLength,
        now
      );
      this.#sampler.triggerAttackRelease(
        this.#currentNote2,
        this.#toneLength,
        now + 1
      );
      this.isPlayTonesButtonClicked = true;
      playTonesButton.disabled = true;
      setTimeout(
        () => (playTonesButton.disabled = false),
        Tone.Time(this.#toneLength).toMilliseconds() * 2 + 1000
      );
      this.#changePlayTonesButtonText(playTonesButton);
    });

    skipQuestionButton.addEventListener('click', () => {
      this.#publishNewAnswerEvent(undefined);
      this.#resetSelectedInterval();
      submitAndMoveToNextQuestionButton.disabled = true;

      getHintButton.addEventListener('click', () => {
        const now = Tone.now();

        for (let i = 0; i < this.#allNotesInCurrentScale.length; i++) {
          this.#sampler.triggerAttackRelease(
            this.#allNotesInCurrentScale[i],
            '8n',
            now + i
          );
        }
      });

      submitAndMoveToNextQuestionButton.addEventListener('click', () => {
        this.#publishNewAnswerEvent(this.#currentSelectedIntervalSemitones);
        this.#resetSelectedInterval();
        submitAndMoveToNextQuestionButton.disabled = true;
      });
    });
  }

  updateQuestionPage(questionData) {
    const playTonesButton = document.getElementById('playTonesBtn');
    playTonesButton.textContent = 'Play tones';

    this.isPlayTonesButtonClicked = false;
    this.#currentNote1 = questionData.note1;
    this.#currentNote2 = questionData.note2;
    this.#allNotesInCurrentScale = questionData.allNotesInScale;
    this.#currentSelectedIntervalSemitones = undefined;

    const currentQuestionNumberSpan = document.getElementById('questionNumber');
    currentQuestionNumberSpan.textContent = questionData.questionNumber;
    const currentScoreSpan = document.getElementById('currentScore');
    const oldScore = Number(currentScoreSpan.textContent);
    currentScoreSpan.textContent = questionData.score;
    if (questionData.score && oldScore !== questionData.score) {
      currentScoreSpan.classList.add(
        classNames.animateJump,
        classNames.highlight
      );
      setTimeout(
        () => currentScoreSpan.classList.remove(classNames.animateJump),
        100
      );
    }
  }

  #changePlayTonesButtonText(playTonesButton) {
    if (this.isPlayTonesButtonClicked) {
      playTonesButton.textContent = 'Replay tones';
    }
  }

  #toggleIntervalButtonState(semitonesDataValue) {
    const button = document.querySelector(
      `[data-semitones="${semitonesDataValue}"]`
    );
    if (button) {
      button.classList.toggle(classNames.secondaryButtonActive);
    }
  }

  #resetSelectedInterval() {
    const previousSelectedSemitones = this.#currentSelectedIntervalSemitones;
    this.#toggleIntervalButtonState(previousSelectedSemitones);
    this.#currentSelectedIntervalSemitones = undefined;
  }

  renderResults(data) {
    this.appContainer.classList.add(classNames.centerVertically);
    this.appContainer.classList.remove(classNames.flowSpaceLarge);
    this.appContainer.replaceChildren();

    const finalUserScoreDisplay = this.#createElement('h3', 'Score: ');
    const finalUserScore = this.#createElement('span');
    finalUserScore.textContent = `${data.userScore} / ${data.totalScore}`;
    finalUserScoreDisplay.append(finalUserScore);

    const playGameAgainButton = this.#createButton('Play again!');
    playGameAgainButton.classList.add(classNames.primaryButton);

    this.appContainer.append(finalUserScoreDisplay, playGameAgainButton);

    playGameAgainButton.addEventListener(
      'click',
      this.#publishPlayGameAgainEvent
    );
  }
}
