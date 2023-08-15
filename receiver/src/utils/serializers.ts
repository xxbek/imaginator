export async function serializeRequestToMessage(
  requestBody: any
): Promise<ProceedUserData | null> {
  return requestBody.proceedNum ? requestBody : null;
}
