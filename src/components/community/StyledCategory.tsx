import styles from './styledCategory.module.scss';

type Category = '일반 게시글' | '중고거래' | '큐레이션';

interface StyledCategoryProps {
  category: Category | string;
}

const categoryClassMap: Record<Category, string> = {
  '일반 게시글': styles.general,
  중고거래: styles.market,
  큐레이션: styles.curation,
};

export const StyledCategory = ({ category }: StyledCategoryProps) => {
  const categoryClass =
    (categoryClassMap as Partial<Record<string, string>>)[category] ??
    styles.default;

  return (
    <div className={`${styles.container} ${categoryClass}`}>{category}</div>
  );
};
