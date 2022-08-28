import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Card, CardChange, CardCreate, CardDto } from '@bunch/cards/common';
import { ApiService } from '@bunch/core/api';

export const CARD_API_ROUTES = {
  load: '/cards',
  loadOne: (uuid: string) => `/cards/${uuid}`,
  create: '/cards',
  change: (uuid: string) => `/cards/${uuid}`,
  delete: (uuid: string) => `/cards/${uuid}`,
  sync: '/cards',
};

@Injectable()
export class CardApiService {
  constructor(private readonly apiService: ApiService) {}

  load(): Observable<Card[]> {
    return this.apiService.get<CardDto[]>(CARD_API_ROUTES.load);
  }

  loadOne(uuid: string): Observable<Card | null> {
    return this.apiService.get<CardDto | null>(CARD_API_ROUTES.loadOne(uuid));
  }

  create(payload: CardCreate): Observable<Card> {
    return this.apiService.post<CardDto>(CARD_API_ROUTES.create, payload);
  }

  change(uuid: string, payload: CardChange): Observable<Card> {
    return this.apiService.patch<CardDto>(CARD_API_ROUTES.change(uuid), payload);
  }

  remove(uuid: string): Observable<void> {
    return this.apiService.delete(CARD_API_ROUTES.change(uuid));
  }

  sync(cards: Card[]): Observable<Card[]> {
    return this.apiService.put<CardDto[]>(CARD_API_ROUTES.sync, cards);
  }
}
