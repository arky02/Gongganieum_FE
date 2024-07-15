import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { parseDateToString, parseStringToDate } from 'utils/parseDate';
import RequiredStar from 'components/commons/RequiredStar';

const DateInput = (props: {
  label: string;
  startDate: string | undefined;
  endDate: string | undefined;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  required?: boolean;
  errorMessage?: string;
}) => {
  const {
    label,
    startDate: startDateValue,
    endDate: endDateValue,
    setStartDate: setStartDateValue,
    setEndDate: setEndDateValue,
    required = false,
    errorMessage,
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
    <div className='w-full shrink-0'>
      <div className='text-16 font-700'>
        {label}
        {required && <RequiredStar />}
      </div>
      <div
        className={`relative mt-8 flex w-full rounded-8 border bg-gray-100 ${errorMessage ? 'border-red' : 'border-gray-200'}`}
      >
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
      <div className='h-[10px] pt-[2px] text-12 text-red'>{errorMessage}</div>
    </div>
  );
};

export default DateInput;
