import CheckBoxChecked from '~/assets/svgs/checkbox-checked.svg';
import CheckBoxUnchecked from '~/assets/svgs/checkbox-unchecked.svg';

interface CheckboxItemProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({
  label,
  isChecked,
  onChange,
}) => {
  return (
    <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="hidden"
        id={`checkbox-${label}`}
      />
      <label
        htmlFor={`checkbox-${label}`}
        className="flex items-center cursor-pointer"
      >
        {isChecked ? (
          <CheckBoxChecked width={21} height={20} />
        ) : (
          <CheckBoxUnchecked width={21} height={20} />
        )}
        <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#dedede] ml-2">
          {label}
        </p>
      </label>
    </div>
  );
};

export default CheckboxItem;
