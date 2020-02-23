import * as sample from './sample/index';

require('./index.scss');

const a = () => {
  console.log([1, 2, 3, 4].map((n) => n + 1));
};
a();
console.log(sample);
// eslint-disable-next-line no-undef
console.log(process.env.DB_HOST, path);
// eslint-disable-next-line no-unused-vars
const { x, y, ...z } = {
  x: 1, y: 2, a: 3, b: 4,
};


async function* genAnswers() {
  const stream = [Promise.resolve(4), Promise.resolve(9), Promise.resolve(12)];
  let total = 0;
  // eslint-disable-next-line no-restricted-syntax
  for await (const val of stream) {
    total += await val;
    yield total;
  }
}

function forEach(ai, fn) {
  return ai.next().then((r) => {
    if (!r.done) {
      fn(r);
      return forEach(ai, fn);
    }
    return '1';
  });
}

let output = 0;
forEach(genAnswers(), (val) => {
  output += val.value;
}).then(() => {
  console.log(output); // 42
});

export default class Header {
  constructor() {
    console.log('This is header constructor');
  }
}
