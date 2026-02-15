import { useLocation, useNavigate } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';
import { DetailPostBox } from '@/components/community/DetailPostBox';
import { detailPostDummyData } from '@/lib/constants/dummyTestDatas';
import styles from './detailPage.module.scss';

export default function DetailPage() {
  const location = useLocation();
  const postId = location.state?.id;
  const data = detailPostDummyData.find(post => post.id === postId);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.goBack} onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        <span>커뮤니티로 돌아가기</span>
      </div>
      <div className={styles.contentArea}>
        <div className={styles.mainContent}>
          <DetailPostBox
            isLiked={data?.isLiked ?? false}
            category={data?.category ?? ''}
            content={data?.content ?? ''}
            country={data?.country ?? ''}
            isVerifiedUser={data?.isVerifiedUser ?? false}
            numOfComment={data?.numOfComment ?? 0}
            numOfLiked={data?.numOfComment ?? 0}
            postedAt={data?.postedAt ?? new Date(2025, 10, 20)}
            tags={data?.tags ?? []}
            title={data?.title ?? ''}
            userImgUrl={data?.userImgUrl ?? ''}
            userName={data?.userName ?? ''}
          />
        </div>
        <div className={styles.subContent}>
          <div>hi</div>
        </div>
      </div>
    </div>
  );
}
