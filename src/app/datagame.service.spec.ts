import { TestBed } from '@angular/core/testing';

import { DatagameService } from './datagame.service';

describe('DatagameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatagameService = TestBed.get(DatagameService);
    expect(service).toBeTruthy();
  });
});
