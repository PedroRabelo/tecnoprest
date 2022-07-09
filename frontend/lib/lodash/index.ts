import _ from "lodash";

export const setEmptyOrStr = (v: unknown) => {
  if (_.isString(v) && _.isEmpty(v)) return undefined;
  else return v;
};
