export interface User {
  name: string;
  password: string;
  testResults?: TestResult[];
}

export interface TestResult {
  testId: number;
  lastStep: number;
}
