import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './common.reducers';
export const selectCounterState = createFeatureSelector<State>('counter');

// Selector to select all counters from the state
export const selectAllCounters = createSelector(
  selectCounterState,
  (state: State) => state.counters
);

