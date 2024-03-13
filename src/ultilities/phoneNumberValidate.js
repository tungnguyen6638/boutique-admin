// Hàm validate số điện thoại
export function phoneNumberValidate(phoneNumberString) {
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  return re.test(phoneNumberString);
}
