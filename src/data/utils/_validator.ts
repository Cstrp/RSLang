const validEmail = (value: string) => {
  const reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  return reg.test(value);
};

const validPass = (value: string) => {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  return reg.test(value);
};

export {validPass, validEmail};
