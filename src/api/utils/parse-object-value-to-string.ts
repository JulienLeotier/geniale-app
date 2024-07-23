export const parseObjectValueToString = (
  myObject: Record<PropertyKey, any>,
) => {
  const parsedObject: Record<PropertyKey, any> = {};
  Object.keys(myObject).forEach(function (key) {
    parsedObject[key] = String(myObject[key]);
  });
  return parsedObject;
};

function paramsToObject(entries: IterableIterator<[string, string]>): Object {
  const result: { [key: string]: any } = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
}

export const ParamsToObject = (urlParams: string): any => {
  const params = new URLSearchParams(urlParams);
  return paramsToObject(params.entries());
};
