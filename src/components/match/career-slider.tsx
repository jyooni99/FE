import React from 'react';
import { Controller, Control } from 'react-hook-form';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface CareerFormValues {
  [key: string]: number[] | string;
}

interface SliderCareerProps {
  control?: Control<CareerFormValues>;
  name: string;
  label?: string;
}

const SliderCareer: React.FC<SliderCareerProps> = ({
  control,
  name,
  label,
}) => {
  const labels = ['학생', '신입', '주니어', '미드레벨', '시니어'];
  const descriptions = ['-', '1년 이하', '1~3년', '4~9년', '10년 이상'];

  const marks = {
    0: { style: { color: '#a6a6a6', fontSize: '10px' }, label: '|' },
    1: { style: { color: '#a6a6a6', fontSize: '10px' }, label: '|' },
    2: { style: { color: '#a6a6a6', fontSize: '10px' }, label: '|' },
    3: { style: { color: '#a6a6a6', fontSize: '10px' }, label: '|' },
    4: { style: { color: '#a6a6a6', fontSize: '10px' }, label: '|' },
  };

  return (
    <div className="w-100% ">
      {/* ✅ 라벨 추가 */}
      {label && (
        <div className="flex gap-3 content-center mb-4 ">
          <div className="w-6 h-6 border border-dashed border-[#02e473]" />
          <div>
            <p className="font-bold text-body-lg text-gray-neutral-50">
              {label}
            </p>
          </div>
        </div>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={[2, 3]}
        render={({ field: { value, onChange } }) => (
          <>
            <Slider
              range
              min={0}
              max={4}
              step={1}
              value={value as number[]}
              onChange={(newValue) => onChange(newValue as number[])}
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
              dotStyle={{
                backgroundColor: '#a6a6a6',
                borderRadius: '50%',
                width: '8px',
                height: '8px',
                marginTop: '-2px',
              }}
              activeDotStyle={{
                backgroundColor: '#07ca7f',
                borderRadius: '50%',
                width: '10px',
                height: '10px',
                marginTop: '-3px',
              }}
              marks={marks}
            />
            <div className="flex justify-between mt-2">
              {labels.map((label, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-[66px]"
                >
                  <span
                    className={`text-sm font-semibold ${
                      Number(value[0]) <= index && index <= Number(value[1])
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
        )}
      />
    </div>
  );
};

export default SliderCareer;
