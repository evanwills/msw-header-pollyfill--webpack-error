import { setupWorker } from 'msw';
import handlers from './handlers';

const worker = setupWorker(...handlers);

/**
 * Define which target environment the development build should
 * built for.
 *
 * `targetStatic` is intended to be modified by an external shell
 * scripts (that automates build and deployment steps) to quickly
 * switch between target build environments, then revert the change
 * after the build has finished.
 *
 * @var {boolean} targetStatic
 */
const targetStatic = false;

if (targetStatic === false) {
  // For local dev server environment
  worker.start();
} else {
  // For static site build (hosted on tsf-sit-fe.azurewebsites.net)
  worker.start({
    serviceWorker: {
      // Points to the custom location of the Service Worker file.
      url: '/FamilyPortal/mockServiceWorker.js',
    },
  });
}
