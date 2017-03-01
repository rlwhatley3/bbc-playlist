
import { TestBed, async } from '@angular/core/testing'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  var app, fixture, compiled

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    })

    TestBed.compileComponents()
       fixture = TestBed.createComponent(AppComponent)
       app = fixture.debugElement.componentInstance
  })

  it('should create the app', async(() => {
    expect(app).toBeTruthy()
  }))

  it(`should have as title 'app wha!'`, async(() => {
    expect(app.title).toEqual('app wha!')
  }))

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges()
    compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('h1').textContent == 'app wha!').toBe(true)
  }))
})
