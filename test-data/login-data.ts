export interface LoginTestCase {
  id: string;
  description: string;
  email: string;
  password: string;
  expectedMessage?: string;
  expectedToLogin?: boolean;
}

export const validLogin = {
  email: 'fatimaqa202@gmail.com',
  password: 'Test@1234',
};

const longEmail = `${'a'.repeat(120)}@example.com`;
const longPassword = 'P'.repeat(260);

export const negativeLoginCases: LoginTestCase[] = [
  {
    id: 'NEG-001',
    description: 'Empty email and password',
    email: '',
    password: '',
    expectedMessage: 'This field is required',
  },
  {
    id: 'NEG-002',
    description: 'Empty email',
    email: '',
    password: validLogin.password,
    expectedMessage: 'This field is required',
  },
  {
    id: 'NEG-003',
    description: 'Empty password',
    email: validLogin.email,
    password: '',
    expectedMessage: 'This field is required',
  },
  {
    id: 'NEG-004',
    description: 'Invalid email format',
    email: 'not-an-email',
    password: validLogin.password,
    expectedMessage: 'Please enter a valid email address',
  },
  {
    id: 'NEG-005',
    description: 'Invalid email address',
    email: 'wronguser@example.com',
    password: validLogin.password,
    expectedMessage: 'Invalid credentials',
  },
  {
    id: 'NEG-006',
    description: 'Invalid password',
    email: validLogin.email,
    password: 'WrongPassword1!',
    expectedMessage: 'Invalid credentials',
  },
  {
    id: 'NEG-007',
    description: 'Invalid email and password',
    email: 'wronguser@example.com',
    password: 'WrongPassword1!',
    expectedMessage: 'Invalid credentials',
  },
  {
    id: 'NEG-008',
    description: 'Leading spaces in email',
    email: ' fatimaqa202@gmail.com',
    password: validLogin.password,
    expectedToLogin: true,
  },
  {
    id: 'NEG-009',
    description: 'Trailing spaces in email',
    email: 'fatimaqa202@gmail.com ',
    password: validLogin.password,
    expectedToLogin: true,
  },
  {
    id: 'NEG-010',
    description: 'Leading spaces in password',
    email: validLogin.email,
    password: ' Test@1234',
    expectedMessage: 'Invalid credentials',
  },
  {
    id: 'NEG-011',
    description: 'Trailing spaces in password',
    email: validLogin.email,
    password: 'Test@1234 ',
    expectedMessage: 'Invalid credentials',
  },
  {
    id: 'NEG-012',
    description: 'Special characters in email input',
    email: '!@#$%^&*()_+<>?@example.com',
    password: validLogin.password,
    expectedMessage: 'Please enter a valid email address',
  },
  {
    id: 'NEG-013',
    description: 'SQL injection attempt',
    email: "' OR '1'='1@example.com",
    password: "' OR '1'='1",
    expectedMessage: 'Please enter a valid email address',
  },
  {
    id: 'NEG-014',
    description: 'XSS injection attempt',
    email: '<script>alert(1)</script>@example.com',
    password: validLogin.password,
    expectedMessage: 'Please enter a valid email address',
  },
  {
    id: 'NEG-015',
    description: 'Extremely long email value',
    email: longEmail,
    password: validLogin.password,
    expectedMessage: 'Invalid credentials',
  },
  {
    id: 'NEG-016',
    description: 'Extremely long password value',
    email: validLogin.email,
    password: longPassword,
    expectedMessage: 'Invalid credentials',
  },
  {
    id: 'NEG-017',
    description: 'Boundary value validation for short email',
    email: 'a@b.c',
    password: validLogin.password,
    expectedMessage: 'Please enter a valid email address',
  },
  {
    id: 'NEG-018',
    description: 'Case sensitivity with wrong password casing',
    email: validLogin.email,
    password: 'test@1234',
    expectedMessage: 'Invalid credentials',
  },
];
