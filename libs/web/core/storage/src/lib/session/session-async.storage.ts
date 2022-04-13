import { Injectable } from '@angular/core';

import { AbstractAsyncStorage } from '../storages/abstract-async.storage';
import { SessionSyncStorage } from './session-sync.storage';

@Injectable({
  providedIn: 'root',
})
export class SessionAsyncStorage extends AbstractAsyncStorage {
  constructor(private readonly localSyncStorage: SessionSyncStorage) {
    super(localSyncStorage);
  }
}
