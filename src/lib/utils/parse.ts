export function ParseErrorMsg(err: unknown) {
  return (
    err as {
      response: { data: { code: string; msg: string; success: string } };
    }
  ).response.data;
}
