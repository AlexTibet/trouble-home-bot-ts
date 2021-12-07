import { Handler } from './Handler';

export class OtherHandler extends Handler {
  async execute(): Promise<void> {
    console.log('OtherHandler');
    console.log(this.message.content, 'in', this.message.channelId);
  }
}
