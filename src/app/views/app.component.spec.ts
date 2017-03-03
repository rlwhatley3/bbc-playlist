
import { TestBed, async } 			from '@angular/core/testing'
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

import { BrowserModule } 			from '@angular/platform-browser'
import { NgModule } 				from '@angular/core'
import { FormsModule } 			from '@angular/forms'
import { HttpModule } 				from '@angular/http'


import { AppComponent } 			from './app.component'
import { TopNavComponent }		from '../blocks/top-nav/top-nav.component'

import { PlaylistSvc }				from '../services/playlist/playlist.service'
import { WikiSvc }					from '../services/wiki/wiki.service'

import * as _ from 'lodash'

describe('AppComponent', () => {
	var app, fixture, compiled
	var header_fields = ['title', 'artist']

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				BrowserModule,
				FormsModule,
				HttpModule
			],
			declarations: [
				AppComponent,
				TopNavComponent
			],
			providers: [
				PlaylistSvc,
				WikiSvc,
				{ provide: ComponentFixtureAutoDetect, useValue: true }
			]
		})

		TestBed.compileComponents()
		fixture = TestBed.createComponent(AppComponent)
		app = fixture.debugElement.componentInstance
		// fixture.detectChanges()
		compiled = fixture.debugElement.nativeElement
		
	})

	it('should create the app', async(() => {
		expect(app).toBeTruthy()
	}))

	it(`should have as title 'BBC Playlist!'`, async(() => {
		expect(app.title).toEqual('BBC Playlist!')
	}))

	it('should render the title in the primary nav bar', async(() => {
		expect(compiled.querySelector('#primary-nav h1').textContent).toEqual('BBC Playlist')
	}))

	it('should render title and artist table headers', async(() => {
		let ele = compiled.querySelectorAll('.card-table-header-field')
		_.each(ele, (e, i) => { expect(e.textContent.toLowerCase()).toEqual(header_fields[i]) })
	}))

	it("should have a sort field setting of 'asc' for each of the header fields", async(() => {
		_.each(header_fields, (f) => { expect(app.sort_fields[f]).toEqual('asc') })
	}))

	it(`should change the 'title' sort field to 'desc'`, async(() => {
		app.sortBy('title')
		expect(app.sort_fields['title']).toEqual('desc')
	}))

	it(`should change the 'title' sort field back to asc`, async(() => {
		app.sortBy('title')
		app.sortBy('title')
		expect(app.sort_fields['title']).toEqual('asc')
	}))

	it(`should change the 'artist' sort field to 'desc'`, async(() => {
		app.sortBy('artist')
		expect(app.sort_fields['artist']).toEqual('desc')
	}))

	it(`should change the 'title' sort field back to asc`, async(() => {
		app.sortBy('artist')
		app.sortBy('artist')
		expect(app.sort_fields['artist']).toEqual('asc')
	}))
})
