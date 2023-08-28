import { response, context } from 'msw';

export const slowRes = (...transformers) => { // eslint-disable-line
  return response(...transformers, context.delay(1500));
};
