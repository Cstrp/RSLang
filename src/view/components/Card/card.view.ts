import './card.scss';
import {ICard} from './models/card.model';

export const getCardTemplate = (options: ICard) => `
    <img class="card-image" src="https://rslang-bc.herokuapp.com/${options.image}">
    <div class="card-top">
      <button class="play-btn play-btn_play" id="play-btn-${options.id}"></button>
      <p class="word-container">
        <span class="word">${options.word}</span> -
        <span class="transcription">${options.transcription}</span> -
        <span class="translate">${options.wordTranslate}</span>
      </p>   
    </div>
    <div class="card-bottom">
    <p class="word-desc-eng">${options.textMeaning}</p>
    <p class="word-desc-ru">${options.textMeaningTranslate}</p>
    <p class="word-desc-eng">${options.textExample}</p>
    <p class="word-desc-ru">${options.textExampleTranslate}</p>
    </div>
    <div class="btn-container-authorized">
      <button class="add-difficult-words">Добавить в сложные слова</button>
      <button class="mark-studied">Пометить как изученное</button>
    </div>
    `;
