import { delay, Observable, of } from "rxjs";

export interface IStorageProvider {
  getItem(key: string): Observable<string | null>;
  setItem(key: string, value: unknown): Observable<unknown>;
}

export class LocalStorageProvider implements IStorageProvider {
  get storage(): Storage {
    return window.localStorage;
  }

  getItem(key: string): Observable<string | null> {
    return of(this.storage.getItem(key)).pipe(delay(800));
  }

  setItem(key: string, value: unknown): Observable<unknown> {
    const jsonAsText = JSON.stringify(value);
    this.storage.setItem(key, jsonAsText);
    return of({});
  }
} 

export const pagingLocalStorageKey = 'todo-paging';
export const sortingLocalStorageKey = 'todo-sort';

export default new LocalStorageProvider();

// export class BackendStorageProvider implements IStorageProvider {
//   getItem(key: string): Observable<string | null> {
//     // TODO: read from backend API by using http request
//     return of("");
//   }

//   setItem(key: string, value: any): Observable<any> {
//     // TODO: save to backend API by using http request
//     return of({});
//   }
// }