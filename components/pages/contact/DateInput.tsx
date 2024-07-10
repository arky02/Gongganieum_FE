import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { parseDateToString, parseStringToDate } from 'utils/parseDate';

const DateInput = (props: {
  label: string;
  startDate: string | undefined;
  endDate: string | undefined;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}) => {
  const {
    label,
    startDate: startDateValue,
    endDate: endDateValue,
    setStartDate: setStartDateValue,
    setEndDate: setEndDateValue,
  } = props;

  const parsedStartDateValue = parseStringToDate(startDateValue);
  const parsedStartDate = parsedStartDateValue
    ? new Date(
        parsedStartDateValue.year,
        parsedStartDateValue.month - 1,
        parsedStartDateValue.day,
      )
    : undefined;
  const parsedEndDateValue = parseStringToDate(endDateValue);
  const parsedEndDate = parsedEndDateValue
    ? new Date(
        parsedEndDateValue.year,
        parsedEndDateValue.month - 1,
        parsedEndDateValue.day,
      )
    : undefined;

  const [startDate, setStartDate] = useState<Date | undefined>(parsedStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(parsedEndDate);

  useEffect(() => {
    if (!startDate) {
      return;
    }
    setStartDateValue(parseDateToString(startDate));
  }, [startDate]);

  useEffect(() => {
    if (!endDate) {
      return;
    }
    setEndDateValue(parseDateToString(endDate));
  }, [endDate]);

  return (
    <div className='w-full'>
      <div className='text-16 font-700'>{label}</div>
      <div className='relative mt-8 flex rounded-8 border border-gray-200 bg-gray-100'>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date as Date | undefined)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          locale={ko}
          dateFormat='yyyy년 MM월 dd일'
          placeholderText='시작일을 선택해주세요.'
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date as Date | undefined)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          locale={ko}
          minDate={startDate}
          dateFormat='yyyy년 MM월 dd일'
          placeholderText='종료일을 선택해주세요.'
        />
        <div className='absolute left-1/2 top-0 h-full w-[1px] bg-gray-200' />
      </div>
    </div>
  );
};

export default DateInput;
