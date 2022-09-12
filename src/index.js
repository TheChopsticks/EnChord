import { Controller } from './controller';

const musicApp = document.getElementById('musicApp');

const controller = new Controller(musicApp);
controller.init();
