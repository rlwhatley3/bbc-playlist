import { browser, element, by, $, $$ } from 'protractor';

export class TestAppPage {

  navigateTo(url: string) {
    return browser.get(url);
  }

  getParagraphText() {
	return $('app-root h1').getText()
  }

  getTableHeaderFields() {
  	return $$('.card-table-header-field')
  }

  getCardTable() {
  	return $$('.card-table')
  }

  getTracks() {
  	return this.getCardTable().$$('.card')
  }

}
