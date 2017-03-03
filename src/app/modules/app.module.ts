import { BrowserModule } 			from '@angular/platform-browser'
import { NgModule } 				from '@angular/core'
import { FormsModule } 			from '@angular/forms'
import { HttpModule } 				from '@angular/http'

import { AppComponent }		 	from '../views/app.component'

import { PlaylistSvc }				from '../services/playlist/playlist.service'
import { WikiSvc }					from '../services/wiki/wiki.service'

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [PlaylistSvc, WikiSvc],
	bootstrap: [AppComponent]
})
export class AppModule { }
