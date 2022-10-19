import { View } from './view';
import { Game } from './game';
import { EventsManager } from './eventsManager';

export class Controller {
  #view;
  #model;
  #eventsManager;

  constructor(root) {
    this.#eventsManager = new EventsManager();

    this.#eventsManager.subscribe('gameStart', (data) => {
      this.#view.renderQuestionPage();
      this.#model.getNewQuiz(data);
    });

    this.#eventsManager.subscribe('newQuestion', (data) => {
      this.#view.updateQuestionPage(data);
    });

    this.#eventsManager.subscribe('getHint', () =>
      this.#model.updateNumberOfHintsAvailable()
    );

    this.#eventsManager.subscribe('noHintAvailable', () =>
      this.#view.disableGetHintButton()
    );

    this.#eventsManager.subscribe('newAnswer', (data) => {
      this.#model.saveUserAnswer(data);
      this.#model.getNewQuiz();
    });

    this.#eventsManager.subscribe('gameEnd', (data) => {
      this.#view.renderResults(data);
    });

    this.#view = new View(
      root,
      (data) => this.#eventsManager.publish('gameStart', data),
      () => this.#eventsManager.publish('getHint'),
      (data) => this.#eventsManager.publish('newAnswer', data),
      () => this.init()
    );
  }

  init() {
    this.#model = new Game(
      (data) => this.#eventsManager.publish('newQuestion', data),
      () => this.#eventsManager.publish('noHintAvailable'),
      (data) => this.#eventsManager.publish('gameEnd', data)
    );
    this.#view.renderStartPage();
  }
}
