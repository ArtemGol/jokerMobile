import {BaseApiService} from './baseApiService';
import type {ISports} from './dto/IMeta';

class SportsRepository extends BaseApiService {
  constructor() {
    super('sports/');
  }

  fetchAllSports = () => this.get<ISports[]>('top-menu');
}

export const sportsRepository = new SportsRepository();
