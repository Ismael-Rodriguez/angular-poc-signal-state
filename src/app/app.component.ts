import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiCtx } from './app.service'
import {toObservable} from '@angular/core/rxjs-interop'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [ApiCtx],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'prueba-signal-state';
  mySignal = signal('hola dola')
  hero$ = toObservable(this.apiCtx.hero)

  constructor(private apiCtx:ApiCtx){
    effect(()=>{
      console.log('hero has changed!!')
      console.log(this.apiCtx.hero())
      console.log('******************')
    })

    effect(()=>{
      console.log('state has changed!!')
      console.log(this.apiCtx.state())
      console.log('******************')
    })

    effect(()=>{
      console.log('mySignal has changed!!')
      console.log(this.mySignal())
      console.log('******************')
    })

    this.hero$.subscribe((result)=>{
      console.log('******subscription*********')
      console.log(result)
      console.log('******subscription*********')
    })
  }

  poc(){
    this.mySignal.set('propicios días')

    this.apiCtx.setHero({
      name: 'Hulk',
      powers: ['smash']
    })

    console.log(this.apiCtx.hero())

    console.log(`state: `, this.apiCtx.state())

    this.apiCtx.increment()

    console.log(`state: `, this.apiCtx.state())

    this.apiCtx.increment()

    console.log(`state: `, this.apiCtx.state())

    this.apiCtx.setHero({
      name: 'Iron man',
      powers: ['super smart']
    })

    this.mySignal.set('saludos cordiales')

    debugger
    console.log(this.apiCtx.myComputed())

    // setInterval(()=>{
    //   this.mySignal.update(prev => prev+1)
    // }, 1000)

    // setInterval(()=>{
    //   this.apiCtx.setHero({
    //     name: 'Hulk' + Math.random()*5,
    //     powers: ['smash']
    //   })
    // }, 1000)
  }

  /*
    https://www.divotion.com/blog/how-do-angular-signals-work-under-the-hood

    An effect watch is not directly run when a dependency changes.
    Instead, it's scheduled to be rerun in the EffectManager.
    The EffectManager tracks all effects registered within a given
    application and runs them with the flush method. The flush method
    is used in the refreshView and detectChangesInternal methods in
    Angular's Render3's change_detection.ts
  */


}
