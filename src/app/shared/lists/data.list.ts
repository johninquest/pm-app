export const PROPERTY_LIST: string[] = [
  'limbe.mile4',
  'buea.molyko',
  'muyuka.balong',
  'douala.bonaberi',
];

export const PAYMENT_METHOD: string[] = [
  'cash',
  'bank transfer',
  'mobile money',
];

export const PAYMENT_FREQUENCY = [
  { value: 1, viewValue: 'yearly' },
  { value: 2, viewValue: 'semi-annually' },
  { value: 4, viewValue: 'quarterly' },
  { value: 12, viewValue: 'monthly' },
];

export const EXPENSE_TYPE_LIST: string[] = [
  'cleaning',
  'construction',
  'insurance', 
  'improvement/renovation',
  'legal',
  'maintenance/repairs',
  'tax',
];

export const PROPERTY_CATEGORY_LIST = [
  { value: 'singleUnit', viewValue: 'Single Apartment' },
  { value: 'multiUnit', viewValue: 'Multi-Unit' },
  { value: 'singleFamily', viewValue: 'Single-Family Home' },
  { value: 'multiFamily', viewValue: 'Multi-Family Home' },
  { value: 'commercial', viewValue: 'Commercial' },
  { value: 'mixedUse', viewValue: 'Mixed-Use' },
  { value: 'industrial', viewValue: 'Industrial' },
  { value: 'land', viewValue: 'Land' },
];

export const USER_ROLES = [
  { value: 'propertyManager', viewValue: 'Manager' },
  { value: 'propertyOwner', viewValue: 'Owner' },
];
