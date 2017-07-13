import { CalebReathComPage } from './app.po';

describe('caleb-reath-com App', () => {
  let page: CalebReathComPage;

  beforeEach(() => {
    page = new CalebReathComPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
