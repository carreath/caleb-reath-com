import { Injectable } from '@angular/core';

@Injectable()
export class TestService {

  constructor() { }

  test(): string {
    return 'Test Service Works!';
  }

}
