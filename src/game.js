const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export class Game {
  #score;
  #level;
  #numberOfQuestions;
  #correctAnswers;
  #userAnswers;
  #questionsToReview;
  #publishNewQuestionEvent;
  #publishGameEndEvent;

  constructor(publishNewQuestionEvent, publishGameEndEvent) {
    this.#score = 0;
    this.#level = 'Easy';
    this.#numberOfQuestions = 10;
    this.#correctAnswers = [];
    this.#userAnswers = [];
    this.#questionsToReview = [];
    this.#publishNewQuestionEvent = publishNewQuestionEvent;
    this.#publishGameEndEvent = publishGameEndEvent;
  }

  #getRandomIndex(notes) {
    return Math.floor(Math.random() * notes.length);
  }

  getNewQuiz() {
    if (this.#userAnswers.length === this.#numberOfQuestions) {
      this.#publishGameEndEvent(this.#score);
    }

    // Create a new quiz and add the answer to the correct answer array.
    let index1 = this.#getRandomIndex(notes);
    let index2 = this.#getRandomIndex(notes);
    while (index1 == index2) {
      index2 = this.#getRandomIndex(notes);
    }

    const note1 = notes[index1];
    const note2 = notes[index2];
    const interval = this.#calculateInterval(index1, index2);
    const octave = this.#getOctave();

    const quizObject = {
      note1,
      note2,
      interval,
      octave,
    };

    this.#correctAnswers.push(quizObject);
    this.#publishNewQuestionEvent({
      note1: quizObject.note1,
      note2: quizObject.note2,
      octave: quizObject.octave,
      score: this.#score,
      questionNumber: this.#userAnswers.length + 1,
    });
  }

  #getOctave() {
    // Add octave to chosen notes.
    return Math.floor(Math.random() * 7 + 1);
  }

  #calculateInterval(index1, index2) {
    // Compare two notes' index and calculate the interval.
    return Math.abs(index1 - index2) + 1;
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

  saveUserAnswer(userInput) {
    this.#userAnswers.push(userInput);
    this.#compareAnswers();
  }
}
