import * as crypto from 'crypto';

export async function generateUniqueId(): Promise<string> {
  return crypto.randomUUID();
}

export async function prepareResponse(
  proceedMessage: ResultFromQueue
): Promise<responseHandler> {
  return {
    info:  proceedMessage.error ? proceedMessage.error : 'Your number was proceeded',
    proceedNum: proceedMessage.resultNum,
  };
}
