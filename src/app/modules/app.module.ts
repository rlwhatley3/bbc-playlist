import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { AppComponent } from '../views/app.component'

import { PlaylistSvc }			from '../services/playlist/playlist.service'

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [PlaylistSvc],
	bootstrap: [AppComponent]
})
export class AppModule { }
