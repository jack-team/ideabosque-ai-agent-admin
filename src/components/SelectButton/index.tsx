import type { FC } from 'react';
import { Dropdown, Space } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import Button from '@/components/Button';

type OptionType = {
  key: string;
  label: string;
}

type SelectButtonProps = {
  value?: string;
  onChange?: (value: string) => void;
  options?: OptionType[];
  placeholder?: string;
}

const SelectButton: FC<SelectButtonProps> = (props) => {
  const {
    value,
    options,
    onChange,
    placeholder = 'Please select'
  } = props;

  const selectdItem = options?.find(e => e.key === value);
  
  return (
    <Dropdown
      menu={{
        activeKey: value,
        items: options,
        onClick: e => onChange?.(e.key)
      }}
    >
      <Button size="small" >
        <Space>
          <span>{selectdItem?.label || placeholder}</span>
          <CaretDownOutlined />
        </Space>
      </Button>
    </Dropdown>
  )
}

export default SelectButton;