import { Injectable } 						from '@angular/core'
import { Response, Http, Headers }			from '@angular/http'

import { Observable }						from 'rxjs/Rx'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Play }								from '../../models/Play'

@Injectable()
export class PlaylistSvc {
	constructor(private http: Http) {
		console.log('playlist service active')
	}
	getPlaylist(): Observable<Play> {
		// gross hackey fix for hitting public api's w/o hosting anything myself
		let headers = new Headers({'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, Authoriziation', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'})
		return this.http.get('https://cors-anywhere.herokuapp.com/http://www.bbc.co.uk/radio1/playlist.json', {headers: headers})
			.map(res => <Play>res.json() )
			// .catch(err => Observable.throw(err.json() || 'Server Error'))
	}
}