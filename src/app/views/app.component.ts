import { Component } 		from '@angular/core'
import { OnInit } 			from '@angular/core'

import { Play }				from '../models/Play'
import { Track }			from '../models/Play'

import { PlaylistSvc }		from '../services/playlist/playlist.service'

import { Observable }						from 'rxjs/Rx'

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
	public list
	constructor(private playlistSvc: PlaylistSvc) {}


	ngOnInit() {
		this.playlistSvc.getPlaylist()
			.subscribe(
				res => { this.playList = res.playlist['a'] },
				err => { this.error = err }
			)
	}
}
