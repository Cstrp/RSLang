import './audio-call-card.scss';
import {IAudioCallCard} from './models';

export const getAudioCallTemplate = (options: IAudioCallCard, translationWords: Array<string>) => `
<figure class="audio-call-audio-figure">
<figcaption class="audio-call-audio-figcaption">Прослушивание аудио</figcaption>
<audio class="audio-call-audio" src="https://rslang-bc.herokuapp.com/${options.audio}" autoplay></audio>
<button class="audio-call-audio-play"></button>
</figure>
<div class="audio-call__word-container">
  <img class="audio-call__word-img audio-call-content_hide" src="https://rslang-bc.herokuapp.com/${options.image}">
  <p class="audio-call__original-word">${options.word}</p>
</div>

<div class="audio-call__translate-container">
  <p class="audio-call__translate-item">${translationWords[0]}</p>
  <p class="audio-call__translate-item">${translationWords[1]}</p>
  <p class="audio-call__translate-item">${translationWords[2]}</p>
  <p class="audio-call__translate-item">${translationWords[3]}</p>
  <p class="audio-call__translate-item">${translationWords[4]}</p>
</div>
`;
