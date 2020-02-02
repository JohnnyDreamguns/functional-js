import { IO, Maybe } from '../fp/functors';
import { maybe, id, safeProp } from '../fp/functions';
import { compose, map } from 'ramda';

const document = {
  querySelector: key => {
    if (key === '.site-search__controls__input') return { value: 'Value 1' };
    if (key === '.search-input-group__field input') return { value: 'Value 2' };
  }
};

const querySelector = selector =>
  new IO(() => document.querySelector(selector));

const myQuerySelection = compose(
  map(maybe('', id)),
  map(safeProp('value')),
  map(maybe({}, id)),
  map(Maybe.of),
  querySelector
);

var selection = myQuerySelection('.site-search__controls__input').chain(val1 =>
  myQuerySelection('.search-input-group__field input').map(
    val2 => `The first value is ${val1}, the second value is ${val2}`
  )
);

console.log(selection.unsafePerformIO());
