import styles from './pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

type PaginationItem = number | 'ellipsis';

const getPaginationItems = (
  currentPage: number,
  totalPages: number,
): PaginationItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  const pages = new Set<number>([
    0,
    1,
    totalPages - 2,
    totalPages - 1,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);

  const sortedPages = Array.from(pages)
    .filter(page => page >= 0 && page < totalPages)
    .sort((a, b) => a - b);

  const items: PaginationItem[] = [];

  sortedPages.forEach((page, index) => {
    if (index > 0 && page - sortedPages[index - 1] > 1) {
      items.push('ellipsis');
    }

    items.push(page);
  });

  return items;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <nav className={styles.container} aria-label='Pagination'>
      <button
        type='button'
        className={styles.navButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        이전
      </button>
      <div className={styles.pageList}>
        {paginationItems.map((item, index) =>
          item === 'ellipsis' ? (
            <span className={styles.ellipsis} key={`ellipsis-${index}`}>
              ...
            </span>
          ) : (
            <button
              type='button'
              key={item}
              className={`${styles.pageButton} ${
                item === currentPage ? styles.active : ''
              }`}
              onClick={() => onPageChange(item)}
              aria-current={item === currentPage ? 'page' : undefined}
            >
              {item + 1}
            </button>
          ),
        )}
      </div>
      <button
        type='button'
        className={styles.navButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        다음
      </button>
    </nav>
  );
};

export default Pagination;
