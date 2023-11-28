import { Store } from '../store';
import { upgradeV1, V0Store, V1Store } from './1';
import { upgradeV2 } from './2';

export default function migrate(state: unknown, version: number) {
  let newState = state;
  if (version < 1) {
    newState = upgradeV1(state as V0Store);
  }
  if (version < 2) {
    newState = upgradeV2(state as V1Store);
  }
  return newState as Store;
}
