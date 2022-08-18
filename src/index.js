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
        let index1 = this.getRandomIndex(notes);
        let index2 = this.getRandomIndex(notes);
        while (index1 == index2) { index2 = this.getRandomIndex(notes) };

        const note1 = notes[index1];
        const note2 = notes[index2];
        const interval = this.calculateInterval(index1, index2);
        const octave = this._addOctave();
    }

    addOctave() {
        // Add octave to chosen notes.
    }

    calculateInterval(index1, index2) {
        // Compare two notes and calculate the interval.
    }

    compareAnswers() {
        // compare user answers and correct answers then update score.
    }

}

