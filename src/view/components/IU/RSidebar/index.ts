import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Template} from '@/view/Template';
import style from './index.module.scss';

class RSidebar extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'div', style.sidebar);

    new Template(this.element, 'div', null, null, {id: 'calendar'});

    document.addEventListener('DOMContentLoaded', () => {
      const calendar: HTMLElement = <HTMLElement>document.getElementById('calendar');

      const call = new Calendar(calendar, {
        plugins: [dayGridPlugin],
        height: 500,
      });

      call.render();
    });
  }
}

export {RSidebar};
