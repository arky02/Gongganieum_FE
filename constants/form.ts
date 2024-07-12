export const ERROR_MESSAGES = {
  required: {
    name: '이름을 입력해주세요.',
    phone: '휴대폰 번호를 입력해주세요.',
    email: '이메일을 입력해주세요.',
    date: '일정을 선택해주세요.',
    budget: '예산을 입력해주세요.',
    purpose: '사용 목적을 입력해주세요.',
    agreed: '개인정보수집에 동의해주세요.',
  },
  pattern: {
    phone: "'-' 을 제외한 번호를 입력해주세요.",
    email: '유효한 이메일을 입력해주세요.',
  },
  maxLength: {
    purpose: '1000자 이하로 작성해주세요.',
    etc: '4000자 이하로 작성해주세요.',
  },
};

export const REG_EXP = {
  email: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone: /^01(0|1|[6-9])[0-9]{3,4}[0-9]{4}$/,
};
