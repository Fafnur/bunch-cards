import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, throwError } from 'rxjs';

import { Card, CardChange, CardCreate } from '@bunch/cards/common';
import { LocalDbKeys, LocalDBService } from '@bunch/core/localdb';
import { User } from '@bunch/users/common';

@Injectable()
export class CardManager {
  static storeName = LocalDbKeys.Cards;

  constructor(private readonly localDBService: LocalDBService) {}

  load(): Observable<Card[]> {
    return this.localDBService.getAll(CardManager.storeName);
  }

  loadOne(uuid: string): Observable<Card | null> {
    return this.localDBService.get(CardManager.storeName, uuid);
  }

  create(payload: CardCreate, user: User): Observable<Card> {
    const currentDate = new Date().toISOString();
    const card: Card = {
      ...payload,
      cover: payload.cover ?? null,
      createdAt: currentDate,
      updatedAt: currentDate,
      owner: user.uuid,
    };

    return this.localDBService.put(CardManager.storeName, card).pipe(map(() => card));
  }

  change(uuid: string, payload: CardChange): Observable<Card> {
    return this.localDBService.get<Card>(CardManager.storeName, uuid).pipe(
      switchMap((record) => {
        if (!record) {
          return throwError(() => of(`Entity #${uuid} not found`));
        }

        const updatedRecord = { ...record, ...payload };

        return this.localDBService.put(CardManager.storeName, updatedRecord).pipe(map(() => updatedRecord));
      })
    );
  }

  remove(uuid: string): Observable<void> {
    return this.localDBService.remove(CardManager.storeName, uuid);
  }

  sync(cards: Card[]): Observable<Card[]> {
    return this.localDBService
      .putAll(CardManager.storeName, cards)
      .pipe(switchMap(() => this.localDBService.getAll<Card>(CardManager.storeName)));
  }
}
