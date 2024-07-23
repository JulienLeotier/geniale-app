// Extract path parameters from fetch url like toto/${id}/tutu and return never if you forget $ before ${id}
/* eslint-disable @typescript-eslint/no-unused-vars */
export type IterateOnPathParameters<
  K extends string,
  Acc extends string[] = [],
> = K extends `${infer _Head}/{${infer _Content}}${infer _Tails}`
  ? never
  : K extends `${infer _Head}\${${infer Content}}${infer Tails}`
    ? IterateOnPathParameters<Tails, [...Acc, Content]>
    : Acc;
