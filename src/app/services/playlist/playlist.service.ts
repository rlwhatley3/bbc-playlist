import { Injectable } 						from '@angular/core'
import { Response, Http, Headers }			from '@angular/http'

import { Observable }						from 'rxjs/Rx'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Play }								from '../../models/Play'

@Injectable()
export class PlaylistSvc {
	private playListUrl
	private playListHeaders

	constructor(private http: Http) {
		// gross hackey work around for hitting public api's w/o hosting anything myself
		this.playListUrl = 'https://cors-anywhere.herokuapp.com/http://www.bbc.co.uk/radio1/playlist.json'
		this.playListHeaders = new Headers({'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, Authoriziation', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'})
	}

	getPlaylist(): Observable<Play> {
		let headers = new Headers({'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, Authoriziation', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'})
		return this.http.get(this.playListUrl, {headers: this.playListHeaders })
			.map(res => <Play>res.json() )
			.catch(err => Observable.throw(err.json() || 'Server Error'))
	}
}