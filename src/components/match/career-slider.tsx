import React from 'react';
import { Controller, Control } from 'react-hook-form';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useFilterStore } from '~/stores/use-filter-store';

interface FilterState {
  jobs: string[];
  interests: string[];
  participationPurpose: string[];
  career: number[];
}

interface SliderCareerProps {
  control?: Control<FilterState>;
  name: keyof FilterState;
  label?: string;
}

const SliderCareer = ({ name, control, label }: SliderCareerProps) => {
  const setFilter = useFilterStore((state) => state.setFilter);
  const labels = ['학생', '신입', '주니어', '미드레벨', '시니어'];
  const descriptions = ['-', '1년 이하', '1~3년', '4~9년', '10년 이상'];

  return (
    <div className="w-full">
      {label && (
        <div className="flex gap-3 items-center mb-4">
          <p className="font-bold text-body-lg text-gray-50">{label}</p>
        </div>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={[0, 4]}
        render={({ field }) => {
          const value = field.value as number[]; // ✅ 타입 단언

          return (
            <>
              <Slider
                range
                min={0}
                max={4}
                step={1}
                value={value}
                onChange={(newValue) => {
                  const updatedValue = newValue as number[];
                  field.onChange(updatedValue);
                  setFilter('career', updatedValue);
                }}
                railStyle={{
                  backgroundColor: '#85858530',
                  height: 4,
                }}
                trackStyle={{ backgroundColor: '#07ca7f', height: 4 }}
                handleStyle={[
                  {
                    borderColor: '#07ca7f',
                    backgroundColor: '#ffffff',
                    width: 16,
                    height: 16,
                    marginTop: -6,
                  },
                  {
                    borderColor: '#07ca7f',
                    backgroundColor: '#ffffff',
                    width: 16,
                    height: 16,
                    marginTop: -6,
                  },
                ]}
              />
              <div className="flex justify-between mt-2">
                {labels.map((label, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center w-[66px]"
                  >
                    <span
                      className={`text-sm font-semibold ${
                        value[0] <= index && index <= value[1]
                          ? 'text-[#07ca7f]'
                          : 'text-gray-400'
                      }`}
                    >
                      {label}
                    </span>
                    <span className="text-[11px] text-[#a6a6a6]">
                      {descriptions[index]}
                    </span>
                  </div>
                ))}
              </div>
            </>
          );
        }}
      />
    </div>
  );
};

export default SliderCareer;
