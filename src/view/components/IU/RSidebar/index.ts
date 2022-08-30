import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import {Template} from '@/view/Template';
import style from './index.module.scss';

class RSidebar extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'div', style.sidebar);

    const calendar = new Template(this.element, 'div', null, null, {id: 'calendar'});

    document.addEventListener('DOMContentLoaded', () => {
      const call = new Calendar(calendar.element, {
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
