import { IEvent } from '../interfaces';
import { doc } from '../../config/documentation';

const event: IEvent = {
  name: 'error',
  once: false,
  async execute(err) {
    console.error(`${doc.logging.error}${ err }`);
  }
};
export = event;
