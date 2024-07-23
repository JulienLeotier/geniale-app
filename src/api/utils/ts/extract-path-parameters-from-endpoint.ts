import type { IterateOnPathParameters } from "@/api/utils/ts/iterate-on-path-parameters";

type TransformPathParametersIntoObject<TEndpoint extends string> = {
  [key in IterateOnPathParameters<TEndpoint>[number]]: string;
};

// Transform path parameters into a type object, moreover, it return never if your path parameters is not correct like forgeting $ before ${id}
export type ExtractPathParametersFromEndpoint<TEndpoint extends string> =
  {} extends TransformPathParametersIntoObject<TEndpoint>
    ? never
    : TransformPathParametersIntoObject<TEndpoint>;
