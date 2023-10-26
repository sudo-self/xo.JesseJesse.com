import { oppositeColor } from '../../src/game/Color';
import test from 'ava';

test('Color: opposite color is correct', (t) => {
  t.is(oppositeColor('red'), 'blue');
  t.is(oppositeColor('blue'), 'red');
});
