import { View } from './view';

const musicApp = document.getElementById('musicApp');

// Temporarily export view to avoid error msg.
export const view = new View(musicApp);
