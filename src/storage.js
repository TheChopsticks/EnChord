export class Storage {
  #storageMethod;
  #publishDataLoaded;

  constructor(publishDataLoaded) {
    this.#storageMethod = window.localStorage;
    this.#publishDataLoaded = publishDataLoaded;
  }

  getItem(key) {
    const rawData = this.#storageMethod.getItem(key);
    const parsedData = JSON.parse(rawData);
    this.#publishDataLoaded(parsedData);
    return parsedData;
  }

  setItem(key, data) {
    const stringifiedData = JSON.stringify(data);
    this.#storageMethod.setItem(key, stringifiedData);
  }
}
