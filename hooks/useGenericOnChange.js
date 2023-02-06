export function useGenericOnChange(name, value) {
  const e = {
    target: {
      name: name,
      value: value,
      checked: null,
    },
  };
  return e;
}
