import { Component, Input, Output, EventEmitter } 				from '@angular/core'

@Component({
	selector: 'top-nav',
	templateUrl: './top-nav.component.html',
	styleUrls: ['./top-nav.component.css'],
	providers: []
})

export class TopNavComponent {
	@Input() term: string
	@Output() termUpdated = new EventEmitter()
	title = 'BBC Playlist'
	constructor() {
	}

	search(term: string) {
		this.termUpdated.emit(term)
	}
}
