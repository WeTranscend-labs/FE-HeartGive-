import { FundCategory } from '../types/fund';
import { CATEGORY_IMAGES, DEFAULT_FUND_IMAGE } from '../constants/images';

export function getCategoryImage(category: FundCategory): string {
  return CATEGORY_IMAGES[category] || DEFAULT_FUND_IMAGE;
}