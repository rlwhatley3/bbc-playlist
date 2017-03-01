export interface Track {
	title: string,
	artist: string,
	label: string,
	image: string,
	playlist: string,
	artist_id: string,
	status: string
}

export interface Play {
	playlist: Array<Track>
}
