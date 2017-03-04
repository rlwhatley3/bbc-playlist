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
 	let titles = page.getTitles()

 	titles.getText().then((base_titles) => {
 		let base_title_array = _.values(base_titles)
 		let sorted_titles = base_title_array.slice(0).sort()
 		expect(base_title_array).toEqual(sorted_titles)
 	})
  })

  it(`should sort by title descending on first 'title' header click`, () => {
  	let title_header = page.getTitleHeader()
  	let titles = page.getTitles()

  	title_header.click()

	titles.getText().then((title_obj) => {
  		let titles_array = _.values(title_obj)
  		let sorted_array = titles_array.slice(0).sort().reverse()
  		expect(sorted_array).toEqual(titles_array)
  	})
  })

  it(`should sort by artist descending on first 'artist' header click`, () => {
  	let artist_header = page.getArtistHeader()
  	let artists = page.getArtists()

	artist_header.click()

  	artists.getText().then((artist_obj) => {
  		let artists_array = _.values(artist_obj)
  		let sorted_array = artists_array.slice(0).sort().reverse()
  		expect(sorted_array).toEqual(artists_array)
  	})
  })

  it(`should sort by artist ascending on second 'artist' header click`, () => {
  	let artist_header = page.getArtistHeader()
  	let artists = page.getArtists()

	artist_header.click()
	artist_header.click()

  	artists.getText().then((artist_obj) => {
  		let artists_array = _.values(artist_obj)
  		let sorted_array = artists_array.slice(0).sort()
  		expect(artists_array).toEqual(sorted_array)
  	})
  })

  it('should have no sidebar before a track is clicked', () => {
  	let sidebar = page.getSideBar()
  	expect(sidebar.isPresent()).toBe(false)
  })

  it(`should show sidebar data when a track is clicked`, () => {
  	let track = page.getTracks().first()
  	track.click()
  	let sidebar = page.getSideBar()
  	expect(sidebar.isPresent()).toBe(true)

  })

  it(`should show cards as selected when clicked`, () => {
  	let track = page.getTracks().first()
  	track.click()
  	track.getAttribute('class').then((classes) => {
  		expect(_.includes(classes, 'selected')).toBe(true)
  	})
  })

  it(`should cancel sidebar data display when a selected track is re-clicked`, () => {
  	let track = page.getTracks().first()
  	track.click()
  	track.click()
  	track.getAttribute('class').then((classes) => {
  		expect(_.includes(classes, 'selected')).toBe(false)
  	})
  })

  it('should limit tracks based on title and artist when searching', () => {
  	let search_bar = page.getSearchBar()
  	let search = 'cha'
  	let titles, artists, search_titles, search_artists
	page.getTitles().getText().then((titles_obj) => {
		titles = _.values(titles_obj)
		page.getArtists().getText().then((artists_obj) => {
			artists = _.values(artists_obj)
			search_bar.sendKeys(search).then(() => {
				page.getTitles().getText().then((s_t_obj) => {
					search_titles = _.values(s_t_obj)
					page.getArtists().getText().then((s_a_obj) => {
						search_artists = _.values(s_a_obj)
						let whole = _.zip(search_titles, search_artists)
						_.each(whole, (t) => { expect(t.toString().toLowerCase().includes(search)).toBe(true) })
					})

				})
			})
		})
	})
  })

});
