import { setupWorker } from 'msw';
import handlers from './handlers';

export const worker = setupWorker(...handlers); // eslint-disable-line
