import {ISprintCard} from './models/sprint-card.model';
import './sprint-card.scss';

export const getCardSprintTemplate = (options: ISprintCard) => `

<figure class="sprint-audio-figure">
<figcaption class="sprint-audio-figcaption">Прослушивание аудио</figcaption>
<audio class="sprint-audio" src="https://rslang-bc.herokuapp.com/${options.audio}"></audio>
<button class="sprint-audio-play"></button>
</figure>

<div class="sprint__word-container">
  <p class="sprint__original-word">${options.word}</p>
  <p class="sprint__translated-word">${options.wordTranslate}</p>
</div>
    `;
