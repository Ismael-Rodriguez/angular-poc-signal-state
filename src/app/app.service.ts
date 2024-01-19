import { Injectable, computed } from '@angular/core'
import { signalState, patchState } from '@ngrx/signals';

interface Hero {
  name: string
  powers: string[]
}

@Injectable({providedIn: 'root'})
class ApiCtx {
  private _state = signalState({ count: 0 });
  private _hero = signalState<Hero>({
    name: '',
    powers: []
  });

  state = this._state
  hero = this._hero
  powers = this._hero.powers

  myComputed = computed(()=>{
    // return Object.assign({}, this._state(), {name: this._hero().name})
    return Object.assign({}, this._state(), {name: this._hero.name()})
  })

  setHero(hero: Hero){
    patchState(this._hero, () => hero);
  }

  increment() {
    patchState(this._state, (state) => ({ count: state.count + 1 }));
  }

  decrement() {
    patchState(this._state, (state) => ({ count: state.count - 1 }));
  }

  reset() {
    patchState(this._state, { count: 0 });
  }


}

export { ApiCtx }
