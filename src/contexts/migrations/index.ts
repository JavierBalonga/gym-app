import { Store } from '../store';
import { upgradeV1, V0Store } from './1';

export default function migrate(state: unknown, version: number) {
  let newState = state;
  if (version < 1) {
    newState = upgradeV1(state as V0Store);
  }
  return newState as Store;
}
