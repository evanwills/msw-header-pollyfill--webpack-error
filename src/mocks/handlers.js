import { rest } from 'msw';
import {
  getDataForUser, getOneAddress, matchUser, presetUserID, tryToFail,
} from './mock.utils';
// import { slowRes } from './delayedResponse';
const mockUser = {};
const mockDocument = {};
const mockChildData = {};
const mockContactUs = {};
const mockSummary = {};
const mockSSOF = {};
const mockBankAccount = {};
const mockPayment = {};
const mockDYD = {};
const mockToyAndBook = {};
const languages = {};
const addressSearch = {};

export default [
  // ======================================================
  // START: Children

  rest.get(
    '/tsfapi/services/Children/Children/:childID',
    (req, res, ctx) => res(ctx.json(matchUser(mockChildData, req.params.childID))),
  ),

  rest.post(
    '/tsfapi/services/Children/Children/',
    (req, res, ctx) => tryToFail(req, res, ctx),
  ),

  rest.get(
    '/tsfapi/services/Children/Children',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),

  //  END:  Children
  // ======================================================
  // START: Contact us

  rest.get(
    '/tsfapi/services/Contactus/Contactus',
    (req, res, ctx) => res(ctx.json(matchUser(mockContactUs, presetUserID()))),
  ),

  //  END:  Contact us
  // ======================================================
  // START: Documents

  rest.get(
    '/tsfapi/services/Documents/MyDocuments',
    (req, res, ctx) => res(ctx.json(matchUser(mockDocument, presetUserID()))),
  ),
  rest.get(
    '/tsfapi/services/Documents/GetOutstandingChildrenDocuments',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),
  rest.get(
    '/tsfapi/services/Documents/uploadDoc',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),
  rest.get(
    '/tsfapi/services/Documents/UploadComplete',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),
  rest.get(
    '/tsfapi/services/Documents/documentuploadfailure',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),

  //  END:  Documents
  // ======================================================
  // START: Address

  rest.get(
    '/api/addressverification/docansearchasync',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),
  rest.get(
    '/api/emailverification/verify',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),
  rest.get(
    '/api/addressverification/getaddress',
    (req, res, ctx) => res(ctx.json(getOneAddress(addressSearch, req))),
  ),
  rest.get(
    '/api/addressverification/searchget',
    (req, res, ctx) => res(ctx.json(addressSearch)),
  ),

  //  END:  Address
  // ======================================================
  // START: Payments

  rest.get(
    '/tsfapi/services/Payments/Payments',
    (req, res, ctx) => res(ctx.json(matchUser(mockPayment, presetUserID()))),
  ),
  rest.get(
    '/tsfapi/services/Payments/BankAccount',
    (req, res, ctx) => res(ctx.json(matchUser(mockBankAccount, presetUserID()))),
  ),
  rest.get(
    '/tsfapi/services/Payments/Pause',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),

  //  END:  Payments
  // ======================================================
  // START: SSOF

  rest.get(
    '/tsfapi/services/User/SSOF',
    (req, res, ctx) => res(ctx.json(matchUser(mockSSOF, presetUserID()))),
  ),

  //  END:  SSOF
  // ======================================================
  // START: Summary

  rest.get(
    '/tsfapi/services/Welcome/Summary',
    (req, res, ctx) => res(ctx.json(matchUser(mockSummary, presetUserID()))),
  ),
  rest.get(
    '/tsfapi/services/Welcome/DydOffer',
    (req, res, ctx) => res(ctx.json(matchUser(mockDYD, presetUserID()))),
  ),
  rest.get(
    '/tsfapi/services/Welcome/DonateYourData',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),

  //  END:  Summary
  // ======================================================
  // START: Toy and book

  rest.get(
    '/tsfapi/services/xmastoyandbook/GetToyAndPortalInitialData',
    (req, res, ctx) => res(ctx.json(matchUser(mockToyAndBook, presetUserID()))),
  ),
  rest.get(
    '/tsfapi/services/xmastoyandbook/GetRegisterFormData',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),
  rest.get(
    '/tsfapi/services/xmastoyandbook/GetOrderSummaryData',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),
  rest.post(
    '/tsfapi/services/xmastoyandbook/saveChildInfo',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),
  rest.post(
    '/tsfapi/services/xmastoyandbook/savePostInfo',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),
  rest.post(
    '/tsfapi/services/xmastoyandbook/PausePreference',
    (req, res, ctx) => tryToFail(req, res, ctx),
  ),

  rest.post(
    '/tsfapi/services/xmastoyandbook/ConfirmDetails',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),

  //  END:  Toy and book
  // ======================================================
  // START: User

  rest.get(
    '/tsfapi/services/User/Profile',
    (req, res, ctx) => getDataForUser(mockUser, res, ctx),
  ),

  rest.post(
    '/tsfapi/services/User/Profile',
    (req, res, ctx) => tryToFail(req, res, ctx),
  ),
  rest.get(
    '/tsfapi/services/welcome/GetEligibleChildren',
    (req, res, ctx) => res(ctx.json({ message: 'it works :)' })),
  ),

  //  END:  User
  // ======================================================
  // START: Languages

  rest.get(
    '/tsfapi/services/Lookups/Languages',
    (req, res, ctx) => res(ctx.json(languages)),
  ),

  //  END:  Languages
  // ======================================================
  // START: Other

  rest.get(
    'http://192.168.1.100:8080/sockjs-node/info',
    (req) => req.passthrough(),
  ),

  // Hide icon request
  rest.get('/favicon.ico', (req) => req.passthrough()),

  // Hide image and font requests.
  rest.get('/-/*', (req) => req.passthrough()),

  // Hide dev hot-module-reloading requests
  rest.get(/\/([a-z0-9]+\.)+hot-update\.js/i, (req) => req.passthrough()),

  //  END:  Other
];
