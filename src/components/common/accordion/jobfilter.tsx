import { useFilterStore } from '~/stores/use-filter-store';

import { useFormContext } from 'react-hook-form';
import { FormValues } from '~/components/match/one-to-one';
import { jobCategories } from '~/constants/create-group';

const JobFilter = () => {
  const { jobs, setFilter } = useFilterStore();
  const { setValue } = useFormContext<FormValues>();

  const handleJobFilterChange = (job: string) => {
    const updatedJobs = jobs.includes(job)
      ? jobs.filter((item) => item !== job)
      : [...jobs, job];

    // Zustand 스토어 업데이트
    setFilter('jobs', updatedJobs);

    // React Hook Form 동기화
    setValue('jobs', updatedJobs, { shouldValidate: true });

    console.log('Updated Jobs:', updatedJobs); // 디버깅용
  };

  return (
    <div className="space-y-4">
      {jobCategories.map((category) => (
        <div key={category.category} className="mb-4">
          <h4 className="text-white font-semibold mb-2">{category.category}</h4>
          <div className="flex flex-wrap gap-2">
            {category.subcategories.map((job) => (
              <button
                key={job}
                onClick={() => handleJobFilterChange(job)}
                className={`px-3 py-1 rounded-full transition-all ${
                  jobs.includes(job)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                }`}
              >
                {job}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobFilter;
