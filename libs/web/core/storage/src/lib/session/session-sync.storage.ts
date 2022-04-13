import { Injectable } from '@angular/core';

import { MemoryStorage } from '../memory/memory.storage';
import { AbstractSyncStorage } from '../storages/abstract-sync.storage';
import { storageAvailable } from '../utils/storage.util';

@Injectable({
  providedIn: 'root',
})
export class SessionSyncStorage extends AbstractSyncStorage {
  constructor() {
    super(
      storageAvailable('sessionStorage')
        ? window.sessionStorage
        : new MemoryStorage()
    );
  }
}
