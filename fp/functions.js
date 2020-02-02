import { Left, Maybe } from './functors';
import { curry, prop, compose } from 'ramda';
import { inspect } from 'util';

// either :: (a -> c) -> (b -> c) -> Either a b -> c
export const either = curry((f, g, e) => {
  if (e.isLeft) {
    return f(e.$value);
  }

  return g(e.$value);
});

// maybe :: b -> (a -> b) -> Maybe a -> b
export const maybe = curry((v, f, m) => {
  if (m.isNothing) {
    return v;
  }

  return f(m.$value);
});

// left :: a -> Either a b
export const left = a => new Left(a);

// head :: [a] -> a
export const head = xs => xs[0];

// eq :: Eq a => a -> a -> Boolean
export const eq = curry((a, b) => a === b);

export const log = tag => thing => {
  console.log(`${tag}: ${inspect(thing)}`);
  return thing;
};

export const id = value => value;

// safeProp :: String -> Object -> Maybe a
export const safeProp = curry((p, obj) => compose(Maybe.of, prop(p))(obj));
