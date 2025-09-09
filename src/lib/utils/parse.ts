export function ParseErrorMsg(err: unknown) {
  return (err as { response: { data: string } }).response.data;
}
