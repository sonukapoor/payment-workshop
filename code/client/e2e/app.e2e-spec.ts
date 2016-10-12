import { PaymentIntegrationPage } from './app.po';

describe('payment-integration App', function() {
  let page: PaymentIntegrationPage;

  beforeEach(() => {
    page = new PaymentIntegrationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
