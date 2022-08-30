import './audio-call-card.scss';
import {IAudioCallCard} from './models';

export const getAudioCallTemplate = (options: IAudioCallCard) => `
<figure class="audio-call-audio-figure">
<figcaption class="audio-call-audio-figcaption">Прослушивание аудио</figcaption>
<audio class="audio-call-audio" src="https://rslang-bc.herokuapp.com/${options.audio}"></audio>
<button class="audio-call-audio-play"></button>
</figure>
<div class="audio-call__word-container">
  <img class="audio-call__word-img" src="https://rslang-bc.herokuapp.com/${options.image}">
  <p class="audio-call__original-word">${options.word}</p>
  <p class="audio-call__translated-word">${options.wordTranslate}</p>
</div>
`;
