import { SortNames } from '../redux/filter/types';

export function findSortEnumValue(value: string): SortNames | undefined {
  return Object.values(SortNames).find((enumValue) => enumValue === value) as SortNames;
}
