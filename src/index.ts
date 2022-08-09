import './view/styles/common.scss';

const tests = (): void => {
  console.log('Hello World');
};

tests();

const a: string = 'asd-asd';

console.log(a.charCodeAt(2));

const b = (name: string): string => `Hello ${name}`;

console.log(b(a));
