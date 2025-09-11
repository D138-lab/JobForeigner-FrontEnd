export function ParseErrorMsg(err: unknown) {
  return (err as { response: { data: { msg: string } } }).response.data.msg;
}
