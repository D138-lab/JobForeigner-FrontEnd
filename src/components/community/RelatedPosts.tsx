import { CustomDivider } from '../common/customDivider/CustomDivider';
import styles from './relatedPosts.module.scss';
import { useNavigate } from 'react-router-dom';

interface RelatedPostType {
  postId: number;
  title: string;
  numOfComment: number;
}

const dummyRelatedPosts: RelatedPostType[] = [
  {
    postId: 2,
    title: '개발자 면접 준비 체크리스트',
    numOfComment: 12,
  },
  {
    postId: 8,
    title: '한국 IT 회사 문화 적응기',
    numOfComment: 8,
  },
  {
    postId: 19,
    title: '이력서 한국어 번역 팁',
    numOfComment: 15,
  },
];

export const RelatedPosts = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.title}>관련 게시글</div>
      {dummyRelatedPosts.map(data => (
        <div
          className={styles.post}
          onClick={() =>
            navigate(`/community/${data.postId}`, {
              state: { id: data.postId },
            })
          }
        >
          <div className={styles.postTitle}>{data.title}</div>
          <div className={styles.numOfComment}>댓글 {data.numOfComment}개</div>
        </div>
      ))}
    </div>
  );
};
