import { IEvent } from '../interfaces';
import { doc } from '../../config/documentation';

const event: IEvent = {
  name: 'warn',
  once: false,
  async execute(warn) {
    console.warn(`${doc.logging.warning}${warn}`);
  }
};
export = event;
