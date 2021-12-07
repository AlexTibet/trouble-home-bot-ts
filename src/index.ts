import * as main from './bot';

try {
  main.init().then(() => console.log('Init'));
} catch (e) {
  console.error(e);
}
