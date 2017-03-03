import { Injectable } 						from '@angular/core'
import { Response, Http, Headers }			from '@angular/http'

import { Observable }						from 'rxjs/Rx'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Play, Track }						from '../../models/Play'

import * as _								from 'lodash'
import * as Fuzzy 							from 'fuzzy'

@Injectable()
export class WikiSvc {
	private base_url
	private hackey_headers

	constructor(private http: Http) {
		// gross hackey work around for hitting public api's w/o hosting anything myself
		this.base_url = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?"
		this.hackey_headers = new Headers({'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, Authoriziation', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'})
	}

	getArtist(artist_name: string): Observable<any> {
		// &list=search&srsearch=${artist_name}
		let queryString = `action=parse&page=${artist_name}&format=json`
		// only provies a snippet - full article would take 2 more nested calls. 1.) To action=

		// let queryString = `action=query&prop=revisions&list=search&srsearch=intitle:${artist_name}&format=json`
		return this.http.get(this.base_url + queryString, {headers: this.hackey_headers })
			.map(res =>  {
				console.log(res.json())
				let article = res.json().parse
				let text = article.text['*']
				return text
				// let articles = res.json().query.search
				// let article_titles = articles.map(a => a.title)
				// let matches = Fuzzy.filter(artist_name, article_titles)
				// let article_stub = _.find(matches, (m) => m.score == Infinity)
				// if(!article_stub) { article_stub = matches[0] }
				// let article = _.find(articles, (a) => a['title'] == article_stub.original)
				// return article
			})
			.catch(err => Observable.throw(err.json() || 'Server Error'))
	}
}