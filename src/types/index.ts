export type Theme = "light" | "dark" | "system";

export interface IJob {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  remote: boolean;
  url: string;
  tags: string[];
  job_types: string[];
  location: string;
  created_at: string;
}

export interface IJobResponse {
  data: IJob[];
  links: {
    first: string;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    current_page_url: string;
    from: number;
    path: string;
    per_page: number;
    to: number;
    terms: string;
    info: string;
  };
}
