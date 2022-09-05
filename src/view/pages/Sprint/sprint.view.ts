import './sprint.scss';

export const initialSprintTemplate = () => `

<div class="sprint-options">
<div class="sprint-about-container">
  <h2 class="sprint-title">Спринт</h2>
  <p class="sprint-about">Данная игра позволит вам повторить изученные ранее слова</p>
  <div class="sprint-instruction">
      <p class=" sprint-mouse-instruction">Для управления игрой можно использовать мышь</p>
    <p class="sprint-keyboard-instruction">
    Также можно играть с помощью стрелок "влево" или "вправо" на клавиатуре</p>
  </div>
</div>

<div class="game-difficulty">
  <h4 class="game-difficulty-title">Выберите уровень сложности игры:</h4>
  <div class="game-levels">
    <input type="radio" name="select-sprint-level" value="1" class="sprint-radio-btn" id="option-1">
    <input type="radio" name="select-sprint-level" value="2" class="sprint-radio-btn" id="option-2">
    <input type="radio" name="select-sprint-level" value="3" class="sprint-radio-btn" id="option-3">
    <input type="radio" name="select-sprint-level" value="4" class="sprint-radio-btn" id="option-4">
    <input type="radio" name="select-sprint-level" value="5" class="sprint-radio-btn" id="option-5">
    <input type="radio" name="select-sprint-level" value="6" class="sprint-radio-btn" id="option-6">

    <label for="option-1" class="option option-1 sprint-radio-btn-text" >
    <div class="dot"></div>
      <span>1</span>
    </label><br>

    
    <label for="option-2" class="option option-2 sprint-radio-btn-text">
    <div class="dot"></div>
      <span>2</span>
    </label><br>

    <label for="option-3" class="option option-3 sprint-radio-btn-text">
    <div class="dot"></div>
      <span>3</span>
    </label><br>
    
    <label for="option-4" class="option option-4 sprint-radio-btn-text">
    <div class="dot"></div>
      <span>4</span>
    </label><br>
   
    <label for="option-5" class="option option-5 sprint-radio-btn-text">
    <div class="dot"></div>
      <span>5</span>
    </label><br>
    
    <label for="option-6" class="option option-6 sprint-radio-btn-text">
    <div class="dot"></div>
      <span>6</span></label><br>
  </div>
</div>
</div>

`;

export const gameSprintScreenTemplate = () => `
<div class="game-points-mute">
    <p class="scoring-points">0</p>
    <p class="default-points">+ 10</p>
    <button class="mute-btn"></button>
</div>

<div class="sprint__check-container">
    <span class="check-container__item check-container__item1"></span>
    <span class="check-container__item check-container__item2"></span>
    <span class="check-container__item check-container__item3"></span>
</div>

<div class="sprint__img-container">
    <div class="sprint__img-items">
      <span class="sprint__img-item sprint__img-item1 star-default"></span>
      <span class="sprint__img-item sprint__img-item2 star-active star-inactive"></span>
      <span class="sprint__img-item sprint__img-item3 star-active star-inactive"></span>
      <span class="sprint__img-item sprint__img-item4 star-active star-inactive"></span>
    </div>
</div>
`;
