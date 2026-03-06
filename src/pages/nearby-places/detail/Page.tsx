import { ArrowLeft, Clock3, MapPin, Phone, ThumbsUp } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { PATH } from '@/lib/constants/routes';
import useGetPlaceDetail from '@/lib/apis/queries/useGetPlaceDetail';
import styles from './page.module.scss';

const tipTypeLabel: Record<string, string> = {
  POSITIVE: '긍정',
  NEUTRAL: '중립',
  WARNING: '주의',
};

export default function NearbyPlaceDetailPage() {
  const { placeId } = useParams();
  const parsedPlaceId = Number(placeId);
  const { data, isLoading, isError } = useGetPlaceDetail(parsedPlaceId, !!placeId);

  const detail = data?.data;

  if (isLoading) {
    return <div className={styles.stateBox}>장소 상세 정보를 불러오는 중입니다.</div>;
  }

  if (isError || !detail) {
    return <div className={styles.stateBox}>장소 상세 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <Link to={PATH.NEARBY_PLACES} className={styles.backLink}>
        <ArrowLeft size={16} />
        <span>목록으로 돌아가기</span>
      </Link>

      <div className={styles.headerCard}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{detail.name}</h1>
          {detail.isVerified && <span className={styles.verified}>검증됨</span>}
        </div>
        <div className={styles.subTitle}>{detail.nameEn || detail.subCategory}</div>
        <p className={styles.description}>{detail.description || '설명 정보가 없습니다.'}</p>

        <div className={styles.infoList}>
          <div>
            <MapPin size={15} />
            <span>{detail.displayAddress}</span>
          </div>
          <div>
            <Phone size={15} />
            <span>{detail.phoneNumber || '전화번호 정보 없음'}</span>
          </div>
          <div>
            <Clock3 size={15} />
            <span>{detail.operatingHours || '운영시간 정보 없음'}</span>
          </div>
        </div>
      </div>

      <div className={styles.summaryCard}>
        <h2>팁 요약</h2>
        <div className={styles.summaryGrid}>
          <div>
            <span>전체</span>
            <strong>{detail.tipSummary.total}</strong>
          </div>
          <div>
            <span>긍정</span>
            <strong>{detail.tipSummary.positive}</strong>
          </div>
          <div>
            <span>중립</span>
            <strong>{detail.tipSummary.neutral}</strong>
          </div>
          <div>
            <span>주의</span>
            <strong>{detail.tipSummary.warning}</strong>
          </div>
        </div>
      </div>

      <div className={styles.tipsCard}>
        <h2>사용자 팁</h2>
        {detail.tips.length === 0 ? (
          <div className={styles.empty}>등록된 팁이 없습니다.</div>
        ) : (
          <ul className={styles.tipList}>
            {detail.tips.map(tip => (
              <li key={tip.id} className={styles.tipItem}>
                <div className={styles.tipTop}>
                  <span className={styles.tipType}>{tipTypeLabel[tip.tipType] ?? tip.tipType}</span>
                  <span className={styles.tipAuthor}>{tip.authorNickname}</span>
                </div>
                <p>{tip.content}</p>
                <div className={styles.tipBottom}>
                  <div>
                    <ThumbsUp size={14} />
                    <span>{tip.likeCount}</span>
                  </div>
                  <span>{new Date(tip.createdAt).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
