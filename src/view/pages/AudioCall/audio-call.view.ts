import './audio-call.scss';

export const initialAudioCallTemplate = () => `

<div class="audio-call-options">
<div class="audio-call-about-container">
  <h2 class="audio-call-title">Спринт</h2>
  <p class="audio-call-about">Данная игра позволит вам повторить изученные ранее слова</p>
  <div class="audio-call-instruction">
      <p class="audio-call-mouse-instruction">Для игры можно использовать мышь</p>
    <p class="audio-call-keyboard-instruction">
    Можно играть с помощью стрелок <b>"влево"</b> или <b>"вправо"</b> на клавиатуре</p>
  </div>
</div>
<div class="game-difficulty">
  <h4 class="game-difficulty-title">Выберите уровень сложности игры</h4>
  <div class="game-levels">
    <input type="radio" name="select-audio-call-level" value="1" class="audio-call-radio-btn" id="option-1">
    <input type="radio" name="select-audio-call-level" value="2" class="audio-call-radio-btn" id="option-2">
    <input type="radio" name="select-audio-call-level" value="3" class="audio-call-radio-btn" id="option-3">
    <input type="radio" name="select-audio-call-level" value="4" class="audio-call-radio-btn" id="option-4">
    <input type="radio" name="select-audio-call-level" value="5" class="audio-call-radio-btn" id="option-5">
    <input type="radio" name="select-audio-call-level" value="6" class="audio-call-radio-btn" id="option-6">
    <label for="option-1" class="option option-1 audio-call-radio-btn-text" >
    <div class="dot"></div>
      <span>1</span>
    </label><br>
    
    <label for="option-2" class="option option-2 audio-call-radio-btn-text">
    <div class="dot"></div>
      <span>2</span>
    </label><br>
    <label for="option-3" class="option option-3 audio-call-radio-btn-text">
    <div class="dot"></div>
      <span>3</span>
    </label><br>
    
    <label for="option-4" class="option option-4 audio-call-radio-btn-text">
    <div class="dot"></div>
      <span>4</span>
    </label><br>
   
    <label for="option-5" class="option option-5 audio-call-radio-btn-text">
    <div class="dot"></div>
      <span>5</span>
    </label><br>
    
    <label for="option-6" class="option option-6 audio-call-radio-btn-text">
    <div class="dot"></div>
      <span>6</span></label><br>
  </div>
</div>
</div>`;

export const gameAudioCallScreenTemplate = () => `
<div class="game-points-mute">
    <p class="scoring-points">0</p>
    <button class="mute-btn"></button>
</div>
`;
