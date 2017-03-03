import { Component } 						from '@angular/core'
import { OnInit } 							from '@angular/core'

import { Play, Track }						from '../models/Play'

import { PlaylistSvc }						from '../services/playlist/playlist.service'
import { WikiSvc }							from '../services/wiki/wiki.service'

import { Observable }						from 'rxjs/Rx'

import * as _								from 'lodash'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: []
})

export class AppComponent  implements OnInit {
	title = 'BBC Playlist!'
	public error
	public playList: Array<Observable<Track>> = []
	public searchableList: Array<Observable<Track>>
	public selected: Observable<Track>

	private sortFields: Object = { title: 'asc', artist: 'asc' }

	constructor(private playlistSvc: PlaylistSvc, private wikiSvc: WikiSvc) {}

	setSelected(track) {
		track.is_selected = !track.is_selected

		if(track.is_selected == true) {
			this.selected = track
		} else {
			this.selected = null
		}
		_.each(this.searchableList, (t) => {if(t != track) { t['is_selected'] = false } } )
		this.getWiki(track['artist'])
		return
	}

	getWiki(artistName) {
		this.wikiSvc.getArtist(artistName)
			.subscribe(
				res => {
					this.selected['snippet'] = res
					// this.selected['snippet'] = res.snippet
				},
				err => this.error = err
			)
	}

	// normally sort and search would be done through api calls, but since you asked for non-ready made solutions
	// I thought this method might be pertinent
	sortBy(att) {
		if(this.sortFields[att] == 'asc') {
			this.sortFields[att] = 'desc'
		} else {
			this.sortFields[att] = 'asc'
		}

		this.searchableList = _.orderBy(this.searchableList, att, this.sortFields[att])
		return
	}

	search(term: string) {
		this.searchableList = this.playList.filter(t => { return t['title'].toLowerCase().includes(term) || t['artist'].toLowerCase().includes(term) })
	}

	ngOnInit() {
		this.playlistSvc.getPlaylist()
			.subscribe(
				res => {
					this.playList.push(res)
					this.searchableList = _.orderBy(this.playList, 'title')
				},
				err => { this.error = err }
			)
		return
	}

}
