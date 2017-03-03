import { Injectable } 						from '@angular/core'
import { Response, Http, Headers }			from '@angular/http'

import { Observable }						from 'rxjs/Rx'
import { ReplaySubject } 					from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Play, Track }								from '../../models/Play'

@Injectable()
export class PlaylistSvc {
	private play_list_url
	private hackey_headers

	constructor(private http: Http) {
		// gross hackey work around for hitting public api's w/o hosting anything myself
		this.play_list_url = 'https://cors-anywhere.herokuapp.com/http://www.bbc.co.uk/radio1/playlist.json'
		this.hackey_headers = new Headers({'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, Authoriziation', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'})
	}

	getPlaylist(): Observable<any> {
		return this.http.get(this.play_list_url, {headers: this.hackey_headers })
			.flatMap(res =>  {
				let pl = <Track>res.json().playlist
				return pl = pl['a'].concat(pl['b']).concat(pl['c'])
			} )
			.catch(err => Observable.throw(err.json() || 'Server Error'))
	}
}