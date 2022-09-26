import { View } from './view';
import { Game } from './game';
import { EventsManager } from './eventsManager';

export class Controller {
  #view;
  #model;
  #eventsManager;

  constructor(root) {
    this.#eventsManager = new EventsManager();

    this.#eventsManager.subscribe('gameStart', () => {
      this.#view.renderQuestionPage();
      this.#model.getNewQuiz();
    });

    this.#eventsManager.subscribe('newQuestion', (data) => {
      this.#view.updateQuestionPage(data);
    });

    this.#eventsManager.subscribe('newAnswer', (data) => {
      this.#model.saveUserAnswer(data);
      this.#model.getNewQuiz();
    });

    this.#eventsManager.subscribe('gameEnd', (data) => {
      this.#view.renderResults(data);
    });

    this.#view = new View(
      root,
      () => this.#eventsManager.publish('gameStart'),
      (data) => this.#eventsManager.publish('newAnswer', data),
      () => this.init()
    );
  }

  init() {
    this.#model = new Game(
      (data) => this.#eventsManager.publish('newQuestion', data),
      (data) => this.#eventsManager.publish('gameEnd', data)
    );
    this.#view.renderStartPage();
  }
}
