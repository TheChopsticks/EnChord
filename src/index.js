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

    getNewQuiz() {
        // Create a new quiz and add the answer to the correct answer array.
        let index1 = this.getRandomIndex(notes);
        let index2 = this.getRandomIndex(notes);
        while (index1 == index2) { index2 = this.getRandomIndex(notes) };

        const note1 = notes[index1];
        const note2 = notes[index2];
        const interval = this.calculateInterval(index1, index2);
        const octave = this.getOctave();

        this.correct.push(`{note1: ${note1}, note2: ${note2}, interval: ${interval}, octave: ${octave}}`);
    }

    getOctave() {
        // Add octave to chosen notes.
        return Math.floor((Math.random() * 7) + 1);
    }

    calculateInterval(index1, index2) {
        // Compare two notes' index and calculate the interval.
        return Math.abs(index1 - index2) + 1;
    }

    compareAnswers() {
        // compare user answers and correct answers then update score.
        for (let i = 0; i < this.numOfQues; i++) {
            if (this.correct[i][interval] === this.userAnswer[i]) {
                this.score += 1;
            }
        }
    }

}

