import { BraillerPage } from './app.po';

describe('brailler App', function() {
  let page: BraillerPage;

  beforeEach(() => {
    page = new BraillerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
