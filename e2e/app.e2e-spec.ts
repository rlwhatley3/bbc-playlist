import { TestAppPage } from './app.po';

import * as _ from 'lodash'

describe('test-app App', function() {
  let page: TestAppPage;
  let header_fields = ['Title', 'Artist']

  beforeEach(() => {
    page = new TestAppPage();
    page.navigateTo('/');
  });

  it(`should display 'BBC Playlist' as the nav title`, () => {
    expect(page.getParagraphText()).toEqual('BBC Playlist');
  });

  it('should display a table header with title and artist fields', () => {
  	let page_header_fields = page.getTableHeaderFields()
  	_.each(header_fields, (hf, i) => { expect(page_header_fields.get(i).getText()).toEqual(hf) })
  })

  it(`should fetch some data and display it on cards within a table`, () => {
  	let tracks = page.getTracks()
  	expect(tracks.count()).toBeGreaterThan(0)
  })

  it(`should sort the list by title ascending on load`, () => {
  	let tracks = page.getTracks()
  })

  it(`should sort by title descending on first 'title' header click`, () => {

  })

  it(`should sort by artist ascending on first 'artist' header click`, () => {

  })

  it(`should sort by artist descending on second 'artist' header click`, () => {

  })

  it(`should show sidebar data when a track is clicked`, () => {

  })

  it(`should show cards as selected when clicked`, () => {
  	
  })

  it(`should cancel sidebar data display when a selected track is re-clicked`, () => {

  })

  it('should limit tracks based on title and artist when searching', () => {

  })

});
