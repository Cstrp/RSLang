import {Template} from '@/view/Template';
import {Button} from '@/view/components/IU/Button';
import {Popup} from '@/view/components/popup';
import {IActivity, IStatistics} from '@/data/interfaces/IStatistics';
import style from './index.module.scss';
import {get} from '@/data/utils/_storage';
import {IDayStatistic} from '@/data/interfaces/IDayStatistic';
import {getStatistics, setStatistics} from '@/data/api/statistics';

class Statistics extends Template {
  private leftBlock: Template = new Template(this.element, 'div', style.wrapper);

  protected audioPopup!: Button;

  protected sprintPopup!: Button;

  constructor(parent: HTMLElement) {
    super(parent, 'main', style.main);

    new Template(this.leftBlock.element, 'p', style.text, '💥 Общая статистика => ');

    const data: Array<IDayStatistic> = get('day-statistics');

    const result: Array<IDayStatistic> = data.map((i) => ({
      date: i.date,
      audioCall: i.audioCall,
      audioCallScore: i.audioCallScore,
      sprint: i.sprint,
      sprintScore: i.sprintScore,
      studiedWords: i.studiedWords,
      difficultWords: i.difficultWords,
    }));

    const statisticsOfDay: IStatistics & IDayStatistic = {
      learnedWords: 1,
      optional: {
        ...result,
      },
    } as unknown as IStatistics & IDayStatistic;

    setStatistics(statisticsOfDay).catch((err) => console.log(err));

    this.init().catch((err) => console.log(err));
  }

  private getGameStat() {
    this.audioPopup = new Button(this.leftBlock.element, style.btn, 'Aудио вызов', false, 'button');
    this.audioPopup.onClick = () => new Popup(this.element).getAudioStat();

    this.sprintPopup = new Button(this.leftBlock.element, style.btn, 'Спринт', false, 'button');
    this.sprintPopup.onClick = () => new Popup(this.element).getSpringStat();
  }

  private async getTotalAudioStat() {
    if (get('userID')) {
      const data = await getStatistics();

      const total = [data.optional[0].audioCallScore].reduce((acc: number, i: number) => acc + i, 0);

      new Template(this.leftBlock.element, 'p', style.text, `📝 Всего баллов (${IActivity.audioCall}): ${total}`);
      new Template(
        this.leftBlock.element,
        'p',
        style.text,
        `📳 Количество попыток: ${data.optional[0].audioCall ? data.optional[0].audioCall : 0}`,
      );

      this.dayStat({
        audioCall: data.optional[0].audioCall,
        audioCallScore: total,
      });

      return data;
    }

    new Template(this.leftBlock.element, 'p', style.text, '📝 Всего баллов (Аудио вызов): 0');
    new Template(this.leftBlock.element, 'p', style.text, '📳 Количество попыток: 0');
  }

  private async getTotalSprintStat() {
    if (get('userID')) {
      const data = await getStatistics();

      const total = [data.optional[0].sprintScore].reduce((acc: number, i: number) => acc + i, 0);

      new Template(this.leftBlock.element, 'p', style.text, `📝 Всего баллов (${IActivity.sprint}): ${total}`);
      new Template(
        this.leftBlock.element,
        'p',
        style.text,
        `📳 Количество попыток: ${data.optional[0].sprint ? data.optional[0].sprint : 0}`,
      );

      this.dayStat({
        sprint: data.optional[0].sprint,
        sprintScore: total,
      });

      return data;
    }

    new Template(this.leftBlock.element, 'p', style.text, '📝 Всего баллов (Спринт): 0');
    new Template(this.leftBlock.element, 'p', style.text, '📳 Количество попыток: 0');
  }

  private async getStudiedWords() {
    if (get('userID')) {
      const data = await getStatistics();

      new Template(
        this.leftBlock.element,
        'p',
        style.text,
        `🌎 Общее количество выученных слов: ${data.optional[0].studiedWords}`,
      );

      this.dayStat({studiedWords: data.optional[0].studiedWords});

      return data;
    }

    new Template(this.leftBlock.element, 'p', style.text, '🌎 Общее количество выученных слов: 0');
  }

  private async getDifficultWords(): Promise<IDayStatistic> {
    const data = await getStatistics();

    new Template(
      this.leftBlock.element,
      'p',
      style.text,
      `🧠 Общее количество слов отмеченных как "сложные": ${data.optional[0].difficultWords + 1}`,
    );

    this.dayStat({difficultWords: data.optional[0].difficultWords});

    return data;
  }

  private dayStat(statistics: object) {
    const date: Date = new Date();
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();

    const data = get('day-statistics') ? get('day-statistics') : [];

    const now = `0${day}.0${month}.${year}`;

    const lastItem = data[data.length - 1];

    if (lastItem && lastItem.date === now) {
      data[data.length - 1] = {...lastItem, ...statistics};
    } else {
      data.push({
        ...statistics,
        date: now,
      });
    }

    localStorage.setItem('day-statistics', JSON.stringify(data));

    return data;
  }

  private async init() {
    await this.getStudiedWords();
    await this.getDifficultWords();
    await this.getTotalAudioStat();
    await this.getTotalSprintStat();
    this.getGameStat();
  }
}

export {Statistics};
