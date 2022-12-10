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
  flowSpaceMedium: 'flow-space--medium',
  centerVertically: 'center-vertically',
  animateJump: 'animate--jump',
  highlight: 'highlight',
  primaryButton: 'button--primary',
  secondaryButton: 'button--secondary',
  tertiaryButton: 'button--tertiary',
  secondaryButtonActive: 'button--secondary-active',
  header: 'header',
  buttonsContainer: 'buttons-container',
  buttonsContainerSingle: 'buttons-container--single',
};

export class View {
  #level;
  #appContainer;
  #isPlayTonesButtonClicked;
  #publishGameStartEvent;
  #publishGetHintButtonClickedEvent;
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
    publishGetHintButtonClickedEvent,
    publishNewAnswerEvent,
    publishPlayGameAgainEvent
  ) {
    this.#level;
    this.#appContainer = musicApp;
    this.#isPlayTonesButtonClicked = false;
    this.#publishGameStartEvent = publishGameStartEvent;
    this.#publishGetHintButtonClickedEvent = publishGetHintButtonClickedEvent;
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
    this.#appContainer.classList.add(
      classNames.centerVertically,
      classNames.flow,
      classNames.flowSpaceMedium
    );
    if (this.#appContainer.hasChildNodes()) {
      this.#appContainer.replaceChildren();
    }

    const gameTitle = this.#createElement('h1', 'EnChord');
    const gameDescription = this.#createElement('h2');

    gameDescription.append(
      'Guess the interval ',
      this.#createElement('br'),
      'between the two tones.'
    );

    // Different level buttons and a game start button.
    const gameStartButton = this.#createButton('Start');
    gameStartButton.classList.add(classNames.primaryButton);
    gameStartButton.disabled = true;

    const levelSelectionText = this.#createElement('h3', 'Select level: ');

    const levelButtonsContainer = this.#createElement('div');
    levelButtonsContainer.classList.add(
      classNames.buttonsContainer,
      classNames.buttonsContainerSingle
    );
    const levelButtons = levels.map((level) => {
      const button = this.#createButton(level);
      button.dataset.level = level;
      button.classList.add(classNames.secondaryButton);
      button.addEventListener('click', () => {
        const prevLevel = this.#level;
        this.#toggleSecondaryButtonState('level', prevLevel);
        this.#level = level;
        button.classList.toggle(classNames.secondaryButtonActive);
        gameStartButton.disabled = false;
      });
      return button;
    });
    levelButtonsContainer.append(...levelButtons);

    this.#appContainer.append(
      gameTitle,
      gameDescription,
      levelSelectionText,
      levelButtonsContainer,
      gameStartButton
    );
    gameStartButton.addEventListener('click', () => {
      this.#toggleSecondaryButtonState('level', this.#level);
      this.#publishGameStartEvent(this.#level);
      // this.#level = undefined;
    });
  }

  renderQuestionPage() {
    this.#appContainer.classList.remove(classNames.centerVertically);
    this.#appContainer.classList.add(classNames.flowSpaceLarge);
    this.#appContainer.replaceChildren();

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

    // Question: button to (re)play tones, hint button, game instruction
    const playTonesButton = this.#createButton('Play tones');
    playTonesButton.id = 'playTonesBtn';
    playTonesButton.classList.add(classNames.primaryButton);
    const gameRuleParagraph = this.#createElement(
      'p',
      'Guess the interval between the 2 tones.'
    );

    const getHintButton = this.#createButton('Get a hint');
    getHintButton.id = 'getHintBtn';
    getHintButton.classList.add(classNames.primaryButton);

    const buttonsContainer = this.#createElement('div');
    buttonsContainer.classList.add(classNames.buttonsContainer);
    buttonsContainer.append(playTonesButton, getHintButton);

    // Answer: interval buttons, guess button, skip button
    const intervalButtons = Object.entries(intervals).map(
      ([intervalName, semitones]) => {
        const button = this.#createButton(intervalName);
        button.classList.add(classNames.secondaryButton);
        button.dataset.semitones = semitones;
        button.addEventListener('click', () => {
          this.#resetSelectedInterval();
          this.#currentSelectedIntervalSemitones = semitones;
          this.#toggleSecondaryButtonState('semitones', semitones);
          const enableSubmitButtonTimer = setInterval(() => {
            if (!playTonesButton.disabled) {
              clearInterval(enableSubmitButtonTimer);
              submitAndMoveToNextQuestionButton.disabled = false;
            }
          }, 250);
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
    this.#appContainer.append(
      headerContainer,
      buttonsContainer,
      gameRuleParagraph,
      buttonsGridContainer
    );

    // Event listeners
    playTonesButton.addEventListener('click', () => {
      this.#playNotesForGameLevel(this.#level);
      this.#isPlayTonesButtonClicked = true;

      // Disable buttons while tones are playing
      const buttonsToDisable = [
        playTonesButton,
        getHintButton,
        submitAndMoveToNextQuestionButton,
        skipQuestionButton,
      ];

      const timeToDisableButtons =
        (this.#level === 'Hard' ? 0 : 1000) +
        Tone.Time(this.#toneLength).toMilliseconds() +
        500;
      this.#disableButtonsForTime(buttonsToDisable, timeToDisableButtons);

      this.#changePlayTonesButtonText(playTonesButton);
    });

    skipQuestionButton.addEventListener('click', () => {
      this.#publishNewAnswerEvent(undefined);
      this.#resetSelectedInterval();
      submitAndMoveToNextQuestionButton.disabled = true;
    });

    getHintButton.addEventListener('click', () => {
      this.#publishGetHintButtonClickedEvent();
      const now = Tone.now();

      const numberOfTonesInScale = this.#allNotesInCurrentScale.length;
      for (let i = 0; i < numberOfTonesInScale; i++) {
        this.#sampler.triggerAttackRelease(
          this.#allNotesInCurrentScale[i],
          this.#toneLength,
          now + i
        );
      }

      // Disable buttons while tones are playing
      const buttonsToDisable = [
        playTonesButton,
        getHintButton,
        submitAndMoveToNextQuestionButton,
        skipQuestionButton,
      ];
      const timeToDisableButtons =
        (numberOfTonesInScale - 1) * 1000 +
        Tone.Time(this.#toneLength).toMilliseconds() +
        500;
      this.#disableButtonsForTime(buttonsToDisable, timeToDisableButtons);
    });

    submitAndMoveToNextQuestionButton.addEventListener('click', () => {
      this.#publishNewAnswerEvent(this.#currentSelectedIntervalSemitones);
      this.#resetSelectedInterval();
      submitAndMoveToNextQuestionButton.disabled = true;
    });
  }

  updateQuestionPage(questionData) {
    const playTonesButton = document.getElementById('playTonesBtn');
    playTonesButton.textContent = 'Play tones';

    this.#isPlayTonesButtonClicked = false;
    this.#currentNote1 = questionData.note1;
    this.#currentNote2 = questionData.note2;
    this.#allNotesInCurrentScale = questionData.allNotesInScale;

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
    if (this.#isPlayTonesButtonClicked) {
      playTonesButton.textContent = 'Replay tones';
    }
  }

  #playNotesForGameLevel(level) {
    const now = Tone.now();
    if (level === 'Hard') {
      this.#sampler.triggerAttackRelease(
        [this.#currentNote1, this.#currentNote2],
        this.#toneLength,
        now
      );
    } else {
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
    }
  }

  disableGetHintButton() {
    const getHintButton = document.getElementById('getHintBtn');
    getHintButton.disabled = true;
  }

  #toggleSecondaryButtonState(dataKey, dataValue) {
    const button = document.querySelector(`[data-${dataKey}="${dataValue}"]`);
    if (button) {
      button.classList.toggle(classNames.secondaryButtonActive);
    }
  }

  #resetSelectedInterval() {
    const previousSelectedSemitones = this.#currentSelectedIntervalSemitones;
    this.#toggleSecondaryButtonState('semitones', previousSelectedSemitones);
    this.#currentSelectedIntervalSemitones = undefined;
  }

  #disableButtonsForTime(buttons, time) {
    const disabledButtons = [];

    for (const button of buttons) {
      if (button.disabled) continue;
      button.disabled = true;
      disabledButtons.push(button);
    }
    setTimeout(() => {
      for (const button of disabledButtons) {
        button.disabled = false;
      }
    }, time);
  }

  renderResults(data) {
    this.#appContainer.classList.add(classNames.centerVertically);
    this.#appContainer.classList.remove(classNames.flowSpaceLarge);
    this.#appContainer.replaceChildren();

    const scoreDisplay = this.#createElement('div');
    scoreDisplay.classList.add(classNames.buttonsContainerSingle);

    const finalUserScoreDisplay = this.#createElement('h3', 'Current score: ');
    finalUserScoreDisplay.classList.add(classNames.highlight);
    const finalUserScore = this.#createElement('span');
    finalUserScore.textContent = `${data.userScore} / ${data.totalScore}`;
    finalUserScoreDisplay.append(finalUserScore);

    const highestUserScoreDisplay = this.#createElement(
      'h3',
      'Highest score: '
    );
    const highestUserScore = this.#createElement('span');
    highestUserScore.textContent = `${data.highestScore} / ${data.totalScore}`;
    highestUserScoreDisplay.append(highestUserScore);

    const averageUserScoreDisplay = this.#createElement(
      'h3',
      'Average score: '
    );
    const averageUserScore = this.#createElement('span');
    averageUserScore.textContent = `${data.averageScore} / ${data.totalScore}`;
    averageUserScoreDisplay.append(averageUserScore);

    const playGameAgainButton = this.#createButton('Play again!');
    playGameAgainButton.classList.add(classNames.primaryButton);

    scoreDisplay.append(
      finalUserScoreDisplay,
      highestUserScoreDisplay,
      averageUserScoreDisplay
    );

    this.#appContainer.append(scoreDisplay, playGameAgainButton);

    playGameAgainButton.addEventListener(
      'click',
      this.#publishPlayGameAgainEvent
    );
  }
}
