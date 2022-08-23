import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mock, when } from 'ts-mockito';

import { ENVIRONMENTS_DEFAULT, EnvironmentService } from '@bunch/core/environments';
import { providerOf } from '@bunch/core/testing';

import { ApiService } from './api.service';
import { API_ERROR_RESPONSE_STUB, API_ERROR_STUB } from './api.stub';

describe('ApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: ApiService;
  let environmentServiceMock: EnvironmentService;
  const path = `${ENVIRONMENTS_DEFAULT.apiHost}/api/path`;

  beforeEach(async () => {
    environmentServiceMock = mock(EnvironmentService);

    when(environmentServiceMock.getEnvironments()).thenReturn(ENVIRONMENTS_DEFAULT);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, providerOf(EnvironmentService, environmentServiceMock)],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('get() should return get response', () => {
    service.get(path).subscribe((data) => expect(data).toBeNull());
    const req = httpTestingController.expectOne(path);
    expect(req.request.method).toEqual('GET');

    req.flush(null);
  });

  it('get() should return get error', () => {
    service.get(path).subscribe({
      error: (data) => expect(data.error).toEqual(API_ERROR_STUB),
    });

    const req = httpTestingController.expectOne(path);
    req.flush(API_ERROR_STUB, API_ERROR_RESPONSE_STUB);
  });

  it('post() should return post response', () => {
    service.post(path).subscribe((data) => expect(data).toBeNull());
    const req = httpTestingController.expectOne(path);
    expect(req.request.method).toEqual('POST');

    req.flush(null);
  });

  it('post() should return post error', () => {
    service.post(path).subscribe({
      error: (data) => expect(data.error).toEqual(API_ERROR_STUB),
    });

    const req = httpTestingController.expectOne(path);
    req.flush(API_ERROR_STUB, API_ERROR_RESPONSE_STUB);
  });

  it('put() should return put response', () => {
    service.put(path, {}).subscribe((data) => expect(data).toBeNull());
    const req = httpTestingController.expectOne(path);
    expect(req.request.method).toEqual('PUT');

    req.flush(null);
  });

  it('put() should return put error', () => {
    service.put(path, {}).subscribe({
      error: (data) => expect(data.error).toEqual(API_ERROR_STUB),
    });

    const req = httpTestingController.expectOne(path);
    req.flush(API_ERROR_STUB, API_ERROR_RESPONSE_STUB);
  });

  it('patch() should return patch response', () => {
    service.patch(path, {}).subscribe((data) => expect(data).toBeNull());
    const req = httpTestingController.expectOne(path);
    expect(req.request.method).toEqual('PATCH');

    req.flush(null);
  });

  it('patch() should return patch error', () => {
    service.patch(path, {}).subscribe({
      error: (data) => expect(data.error).toEqual(API_ERROR_STUB),
    });

    const req = httpTestingController.expectOne(path);
    req.flush(API_ERROR_STUB, API_ERROR_RESPONSE_STUB);
  });

  it('delete() should return delete response', () => {
    service.delete(path).subscribe((data) => expect(data).toBeNull());
    const req = httpTestingController.expectOne(path);
    expect(req.request.method).toEqual('DELETE');

    req.flush(null);
  });

  it('delete() should return delete error', () => {
    service.patch(path, {}).subscribe({
      error: (data) => expect(data.error).toEqual(API_ERROR_STUB),
    });

    const req = httpTestingController.expectOne(path);
    req.flush(API_ERROR_STUB, API_ERROR_RESPONSE_STUB);
  });
});
