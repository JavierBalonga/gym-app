import { Store } from '../store';
import { upgradeV1, V0Store, V1Store } from './1';
import { upgradeV2, V2Store } from './2';
import { upgradeV3, V3Store } from './3';
import { upgradeV4, V4Store } from './4';
import { upgradeV5, V5Store } from './5';
import { upgradeV6, V6Store } from './6';
import { upgradeV7 } from './7';

export default function migrate(state: unknown, version: number) {
  let newState = state;
  if (version < 1) {
    newState = upgradeV1(newState as V0Store);
  }
  if (version < 2) {
    newState = upgradeV2(newState as V1Store);
  }
  if (version < 3) {
    newState = upgradeV3(newState as V2Store);
  }
  if (version < 4) {
    newState = upgradeV4(newState as V3Store);
  }
  if (version < 5) {
    newState = upgradeV5(newState as V4Store);
  }
  if (version < 6) {
    newState = upgradeV6(newState as V5Store);
  }
  if (version < 7) {
    newState = upgradeV7(newState as V6Store);
  }
  return newState as Store;
}
