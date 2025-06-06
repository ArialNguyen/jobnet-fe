import BaseService from './baseService';

import ApplicationType, { ApplicationStatus } from '@/types/application';
import PaginationType from '../types/pagination';
import envConfig from '@/config';
import { getSession, useSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import { auth } from '@/auth';

class ApplicationService extends BaseService {
  private apiBaseUrl = `${envConfig.NEXT_PUBLIC_API_URL}/api/applications`;

  async getApplications(props: {
    jobSeekerId?: string | undefined;
    page?: number;
    pageSize?: number;
    status?: ApplicationStatus;
    accessToken: string;
  }) {
    const params = new URLSearchParams();
    props?.jobSeekerId && params.append('jobSeekerId', props.jobSeekerId);
    props?.page && params.append('page', props.page.toString());
    props?.pageSize && params.append('pageSize', props.pageSize.toString());
    props?.status && params.append('status', props.status);

    const url = params.toString().length
      ? `${this.apiBaseUrl}?${params.toString()}`
      : this.apiBaseUrl;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.accessToken}`,
      },
    });

    this.checkResponseNotOk(res);
    return this.getResponseData<PaginationType<ApplicationType>>(res);
  }

  async getApplicationsByRecruiterId(props: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    applicationStatuses?: Array<ApplicationStatus>;
    fromDate?: string;
    toDate?: string;
    accessToken: string;
  }) {
    const params = new URLSearchParams();
    props?.page && params.append('page', props.page.toString());
    props?.pageSize && params.append('pageSize', props.pageSize.toString());
    props?.sortBy && params.append('sortBy', props.sortBy.toString());
    props?.applicationStatuses &&
      props.applicationStatuses.forEach((applicationStatus) =>
        params.append('applicationStatuses', applicationStatus)
      );
    props?.fromDate && params.append('fromDate', props.fromDate.toString());
    props?.toDate && params.append('toDate', props.toDate.toString());

    const url = params.toString().length
      ? `${this.apiBaseUrl}?${params.toString()}`
      : `${this.apiBaseUrl}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    });

    this.checkResponseNotOk(res);
    return this.getResponseData<PaginationType<ApplicationType>>(res);
  }

  async createApplication(data: object, accessToken: string) {
    const res = await fetch(this.apiBaseUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    this.checkResponseNotOk(res);
    return this.getResponseData<ApplicationType>(res);
  }

  async updateApplicationStatus(
    id: string,
    applicationStatus: ApplicationStatus,
    accessToken: string
  ) {
    const url = `${this.apiBaseUrl}/${id}/applicationStatus`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ applicationStatus }),
    });

    this.checkResponseNotOk(res);
    return this.getResponseData<ApplicationType>(res);
  }

  async isSubmitted(postId: string, accessToken: string) {
    const params = new URLSearchParams({ postId });
    const url = `${this.apiBaseUrl}/isSubmitted?${params.toString()}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    this.checkResponseNotOk(res);
    return this.getResponseData<boolean>(res);
  }
}

const applicationService = new ApplicationService();
export default applicationService;
