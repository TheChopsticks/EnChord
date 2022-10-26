const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export class Game {
  #score;
  #scores;
  #level;
  #numberOfQuestions;
  #correctAnswers;
  #userAnswers;
  #questionsToReview;
  #publishNewQuestionEvent;
  #publishGameEndEvent;
  #publishStoreGameDataEvent;
  #publishGetGameDataEvent;

  constructor(
    publishNewQuestionEvent,
    publishGameEndEvent,
    publishStoreGameDataEvent,
    publishGetGameDataEvent
  ) {
    this.#score = 0;
    this.#level = 'Easy';
    this.#numberOfQuestions = 10;
    this.#correctAnswers = [];
    this.#userAnswers = [];
    this.#questionsToReview = [];
    this.#publishNewQuestionEvent = publishNewQuestionEvent;
    this.#publishGameEndEvent = publishGameEndEvent;
    this.#publishStoreGameDataEvent = publishStoreGameDataEvent;
    this.#publishGetGameDataEvent = publishGetGameDataEvent;
  }

  #getRandomIndex(notes) {
    return Math.floor(Math.random() * notes.length);
  }

  getNewQuiz() {
    if (this.#userAnswers.length === this.#numberOfQuestions) {
      this.#storeScores();
      this.#publishGameEndEvent(this.#score);
      return;
    }

    // Create a new quiz and add the answer to the correct answer array.
    const octave = this.#getOctave();
    let index1 = this.#getRandomIndex(notes);
    let index2 = this.#getRandomIndex(notes);
    while (index1 == index2) {
      index2 = this.#getRandomIndex(notes);
    }

    const note1 = notes[index1] + octave;
    const note2 = notes[index2] + octave;
    const interval = this.#calculateInterval(index1, index2);

    const quizObject = {
      note1,
      note2,
      interval,
    };

    this.#correctAnswers.push(quizObject);
    this.#publishNewQuestionEvent({
      note1: quizObject.note1,
      note2: quizObject.note2,
      score: this.#score,
      questionNumber: this.#userAnswers.length + 1,
    });
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

  #storeScores() {
    this.#publishGetGameDataEvent();
    this.#scores.push(this.#score);
    this.#publishStoreGameDataEvent(this.#scores);
  }

  loadScores(data) {
    this.#scores = data ?? [];
  }

  saveUserAnswer(userInput) {
    this.#userAnswers.push(userInput);
    this.#compareAnswers();
  }
}
