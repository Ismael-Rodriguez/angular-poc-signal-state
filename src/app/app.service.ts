import { Injectable } from '@angular/core'
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
