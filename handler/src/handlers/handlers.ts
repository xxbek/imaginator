import {fib, randomSleep} from '../utils/utils.js';

async function doComplexCalculations(
  userData: ProceedUserData
): Promise<ResultUserData> {
  const result: number = fib(userData.proceedNum);
  await randomSleep(1, 2);
  return {resultNum: result};
}

export const customHandler: HandlerFunction = async function (
  userData: ProceedUserData
): Promise<ResultUserData> {
  if (userData.proceedNum === -1) {
    return {resultNum: -1, error: `User data is not valid`};
  }
  try {
    return await doComplexCalculations(userData);
  } catch (error) {
    console.log(`Error by proceeding user data`);
    return {resultNum: -1, error: `Error by handle user data`};
  }
};
