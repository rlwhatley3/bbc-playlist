import { Component } 						from '@angular/core'
import { OnInit } 							from '@angular/core'

import { Play }								from '../models/Play'
import { Track }							from '../models/Play'

import { PlaylistSvc }						from '../services/playlist/playlist.service'

import { Observable }						from 'rxjs/Rx'
import * as _								from 'lodash'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [PlaylistSvc]
})

export class AppComponent  implements OnInit {
	title = 'BBC Playlist!'
	public error
	public playList: Observable<Array<Track>>
	public selected: Observable<Track>

	constructor(private playlistSvc: PlaylistSvc) {}

	setSelected(track) {
		_.each(this.playList, (t) => { t.is_selected = false })
		track.is_selected = true
		this.selected = track
		return
	}

	sortTitle() {
		// console.log(this.playList)
		// let hold = this.playList.sort()
		// this.playList = _.sortBy(this.playList.toArray(), (t) => { t.title })
		// _.each(this.playList, (t) => {})

	}


	ngOnInit() {
		this.playlistSvc.getPlaylist()
			.subscribe(
				res => { console.log(res); this.playList = res.playlist['a'].concat(res.playlist['b']) },
				err => { this.error = err }
			)

	}
}
