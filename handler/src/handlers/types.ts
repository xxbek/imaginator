interface HandlerFunction {
  (userData: ProceedUserData): Promise<ResultUserData>;
}

interface ProceedUserData {
  proceedNum: number;
}

interface ResultUserData {
  resultNum: number;
  error?: string;
}
