import _ from "lodash";

export const setEmptyOrStr = (v: unknown) => {
  console.log(v);

  if (_.isString(v) && _.isEmpty(v)) return undefined;
  else return v;
};
