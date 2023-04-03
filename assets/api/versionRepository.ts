import {BaseApiService} from './baseApiService';

class VersionRepository extends BaseApiService {
  constructor() {
    super('');
  }

  fetchVersion = () =>
    this.get<{description: string; version: string}>('/app-version');
}

export const versionRepository = new VersionRepository();
