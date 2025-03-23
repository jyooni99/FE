import { StylesConfig } from 'react-select';

export const customStyles: StylesConfig = {
  control: (base) => ({
    ...base,
    backgroundColor: '#404040',
    borderRadius: '8px',
    color: '#fff',
    borderColor: '#333',
    outline: 'none',
    boxShadow: 'none',
    padding: '3px',
    '&:hover': { borderColor: '#666' },
    '&:focus': { borderColor: '#666' },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#404040',
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? '#222' : isFocused ? '#333' : '#404040',
    color: '#BDBDBD',
    '&:hover': { backgroundColor: '#222' },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#BDBDBD',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#BDBDBD',
  }),
  groupHeading: (base) => ({
    ...base,
    fontSize: '13px',
    paddingBottom: '10px',
    borderBottom: '1px solid #666666',
  }),

  group: (base) => ({
    ...base,
    paddingBottom: '10px',
  }),
};
