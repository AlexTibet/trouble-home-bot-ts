import { IEvent } from '../interfaces';

const event: IEvent = {
  name: 'error',
  once: false,
  async execute(err) {
    console.error(`ERROR info: ${ err }`);
  }
};
export = event;
