import type { JobListing } from '../hooks/types';

// Filters from url params
export function filterJobs(jobs: JobListing[], params: URLSearchParams): JobListing[] {
  let result = jobs;

  const search = params.get('search');
  if (search) {
    const query = search.toLowerCase();
    result = result.filter((job) => {
      return job.title.toLowerCase().includes(query) || job.description.toLowerCase().includes(query);
    });
  }

  const region = params.get('region');
  if (region) {
    result = result.filter((job) => job.regionId === Number(region));
  }

  const category = params.get('category');
  if (category) {
    result = result.filter((job) => job.jobCategoryId === Number(category));
  }

  const workType = params.get('workType');
  if (workType) {
    result = result.filter((job) => job.workTypeId === Number(workType));
  }

  const workHome = params.get('workHome');
  if (workHome) {
    result = result.filter((job) => job.workHome === workHome);
  }

  const period = params.get('period');
  if (period) {
    const cutoff = new Date();

    if (period === 'week') cutoff.setDate(cutoff.getDate() - 7);
    if (period === 'month') cutoff.setMonth(cutoff.getMonth() - 1);
    if (period === 'year') cutoff.setFullYear(cutoff.getFullYear() - 1);

    result = result.filter((job) => new Date(job.createdAt) >= cutoff);
  }

  return result;
}
