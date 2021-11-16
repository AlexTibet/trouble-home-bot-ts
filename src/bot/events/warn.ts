import { IEvent } from '../interfaces';

const event: IEvent = {
  name: 'warn',
  once: false,
  async execute(warn) {
    console.warn(`WARNING info: ${warn}`);
  }
};
export = event;
