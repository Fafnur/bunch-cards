import { Injectable } from '@angular/core';

import { AbstractAsyncStorage } from '../storages/abstract-async.storage';
import { LocalSyncStorage } from './local-sync.storage';

@Injectable({
  providedIn: 'root',
})
export class LocalAsyncStorage extends AbstractAsyncStorage {
  constructor(private readonly localSyncStorage: LocalSyncStorage) {
    super(localSyncStorage);
  }
}
