export function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export async function randomSleep(secondFrom: number, secondTo: number) {
  const duration = between(secondFrom * 1000, secondTo * 1000)
  return new Promise(resolve => setTimeout(resolve, duration));
}


export async function serializeUserMessageData(message: string): Promise<ProceedUserData>{
  const messageObject = JSON.parse(message)
  if (messageObject.proceedNum !== undefined && typeof messageObject.proceedNum === 'number') {
    return {proceedNum: messageObject.proceedNum}
  }
  console.log(`There is no proceedNum in message ${message}`)
  return {proceedNum: -1}
}


export function fib(n: number): number {
  if (n <= 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}
