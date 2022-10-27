const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export class Game {
  #score;
  #level;
  #numberOfHintsAvailable;
  #numberOfQuestions;
  #correctAnswers;
  #userAnswers;
  #questionsToReview;
  #publishNewQuestionEvent;
  #publishNoHintAvailableEvent;
  #publishGameEndEvent;

  constructor(
    publishNewQuestionEvent,
    publishNoHintAvailableEvent,
    publishGameEndEvent
  ) {
    this.#score = 0;
    this.#numberOfQuestions = 10;
    this.#correctAnswers = [];
    this.#userAnswers = [];
    this.#questionsToReview = [];
    this.#publishNewQuestionEvent = publishNewQuestionEvent;
    this.#publishNoHintAvailableEvent = publishNoHintAvailableEvent;
    this.#publishGameEndEvent = publishGameEndEvent;
  }

  #getRandomIndex(notes) {
    return Math.floor(Math.random() * notes.length);
  }

  getNewQuiz(gameLevel) {
    if (gameLevel) {
      this.#level = gameLevel;
      if (gameLevel === 'Intermediate') {
        this.#numberOfHintsAvailable = 3;
      } else if (gameLevel === 'Hard') {
        this.#publishNoHintAvailableEvent();
      }
    }

    if (this.#userAnswers.length === this.#numberOfQuestions) {
      this.#publishGameEndEvent(this.#score);
      return;
    }

    // Create a new quiz and add the answer to the correct answer array.
    const octave = this.#getOctave();
    let index1 = this.#getRandomIndex(notes);
    let index2 = this.#getRandomIndex(notes);

    while (index1 === index2) {
      index2 = this.#getRandomIndex(notes);
    }

    if (this.#level == 'Easy' && index1 > index2) {
      const higherTone = index1;
      index1 = index2;
      index2 = higherTone;
    }
    const note1 = notes[index1] + octave;
    const note2 = notes[index2] + octave;
    const interval = this.#calculateInterval(index1, index2);

    const allNotesInScale = this.#getAllNotesWithinScale(
      index1,
      index2,
      octave
    );

    const quizObject = {
      note1,
      note2,
      interval,
      allNotesInScale,
    };

    this.#correctAnswers.push(quizObject);
    this.#publishNewQuestionEvent({
      note1: quizObject.note1,
      note2: quizObject.note2,
      score: this.#score,
      questionNumber: this.#userAnswers.length + 1,
      allNotesInScale,
    });
  }

  #getAllNotesWithinScale(index1, index2, octave) {
    const allNotesInScale = [];

    if (index1 < index2) {
      for (let i = index1; i < index2 + 1; i++) {
        allNotesInScale.push(notes[i] + octave);
      }
    } else {
      for (let i = index1; i > index2 - 1; i--) {
        allNotesInScale.push(notes[i] + octave);
      }
    }
    return allNotesInScale;
  }

  #getOctave() {
    // Add octave to chosen notes, limiting to octaves 3 - 5 for normal human hearing range.
    const octaves = [3, 4, 5];
    return octaves[Math.floor(Math.random() * octaves.length)];
  }

  #calculateInterval(index1, index2) {
    // Compare two notes' index and calculate the interval.
    return Math.abs(index1 - index2);
  }

  #compareAnswers() {
    const lastCorrectAnswerIndex = this.#correctAnswers.length - 1;
    const lastUserAnswerIndex = this.#userAnswers.length - 1;
    if (
      this.#correctAnswers[lastCorrectAnswerIndex].interval ===
      this.#userAnswers[lastUserAnswerIndex]
    ) {
      this.#score++;
    }
  }

  updateNumberOfHintsAvailable() {
    this.#numberOfHintsAvailable = this.#numberOfHintsAvailable - 1;
    if (this.#numberOfHintsAvailable === 0) {
      this.#publishNoHintAvailableEvent();
    }
  }

  saveUserAnswer(userInput) {
    this.#userAnswers.push(userInput);
    this.#compareAnswers();
  }
}
