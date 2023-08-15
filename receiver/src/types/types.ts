interface ProceedUserData {
  proceedNum: number;
}

interface ResultFromQueue {
  resultNum: number;
  error?: string;
}

interface responseHandler {
  info: string;
  proceedNum: number;
}
