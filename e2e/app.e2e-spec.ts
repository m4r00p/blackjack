import { BlackjackPage } from './app.po';

describe('blackjack App', function() {
  let page: BlackjackPage;

  beforeEach(() => {
    page = new BlackjackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
