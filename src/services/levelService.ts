import BaseService from './baseService';

import LevelType from '../types/level';
import envConfig from '@/config';

class LevelService extends BaseService {
  private apiBaseUrl = `${envConfig.NEXT_PUBLIC_API_URL}/api/levels`;

  async getLevels(props?: { search?: string }) {
    const params = new URLSearchParams();
    props?.search && params.append('search', props.search);

    const url = params.toString().length
      ? `${this.apiBaseUrl}?${params.toString()}`
      : this.apiBaseUrl;

    const res = await fetch(url);

    this.checkResponseNotOk(res);
    return this.getResponseData<LevelType[]>(res);
  }

  async createLevel(req: object, accessToken: string) {
    const res = await fetch(this.apiBaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(req),
    });

    this.checkResponseNotOk(res);
    return this.getResponseData<LevelType>(res);
  }

  async updateLevel(id: string, req: object, accessToken: string) {
    const res = await fetch(`${this.apiBaseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(req),
    });

    this.checkResponseNotOk(res);
    return this.getResponseData<LevelType>(res);
  }

  async deleteLevelById(id: string, accessToken: string) {
    const res = await fetch(`${this.apiBaseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    this.checkResponseNotOk(res);
  }
}

const levelService = new LevelService();
export default levelService;
