// An array of note and octaves.
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
class Game {
    constructor() {
        this.score = 0;
        this.level = 'Easy';
        this.numOfQues = 10;
        this.correct = [];
        this.userAnswer = [];
    }

    getRandomIndex(notes) {
        // get a random index.
        return Math.floor(Math.random() * notes.length);
    }

    getTwoNotes() {
        // get two random notes from the notes array.
        this._addOctave();
    }

    addOctave() {
        // Add octave to chosen notes.
    }

    calculateInterval() {
        // Compare two notes and calculate the interval.
        // We can use it for the question and user answer both.
    }

    compareAnswers() {
        // compare user answers and correct answers then update score.
    }

}
