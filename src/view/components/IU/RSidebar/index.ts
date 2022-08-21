import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import {Template} from '@/view/Template';
import style from './index.module.scss';
import {get} from '@/data/utils/_storage';

class RSidebar extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'div', style.sidebar);

    new Template(this.element, 'h2', style.title, `${get('userName') ? get('userName') : ''}`);

    new Template(this.element, 'div', null, null, {id: 'calendar'});

    document.addEventListener('DOMContentLoaded', () => {
      const calendar: HTMLElement = <HTMLElement>document.getElementById('calendar');

      const call = new Calendar(calendar, {
        plugins: [dayGridPlugin, interaction],
        height: 450,
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'today',
        },
        dateClick: (info) => {
          info.dayEl.style.backgroundColor
            ? (info.dayEl.style.backgroundColor = '')
            : (info.dayEl.style.backgroundColor = '#7f00ff');
        },
      });

      call.render();
    });
  }
}

export {RSidebar};
