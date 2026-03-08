import { FormEvent, useState } from 'react';
import {
  ArrowLeft,
  Clock3,
  MapPin,
  MoreHorizontal,
  Phone,
  ThumbsUp,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import Button from '@/components/common/button/Button';
import useDeletePlaceTip from '@/lib/apis/mutations/useDeletePlaceTip';
import usePostPlaceTip, {
  PlaceTipType,
} from '@/lib/apis/mutations/usePostPlaceTip';
import usePostPlaceTipLike from '@/lib/apis/mutations/usePostPlaceTipLike';
import useGetMyInfo from '@/lib/apis/mutations/useGetMyInfo';
import { PATH } from '@/lib/constants/routes';
import useGetPlaceDetail from '@/lib/apis/queries/useGetPlaceDetail';
import useGetPlaceTips from '@/lib/apis/queries/useGetPlaceTips';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import styles from './page.module.scss';

const tipTypeLabel: Record<string, string> = {
  POSITIVE: '긍정',
  NEUTRAL: '중립',
  WARNING: '주의',
};

interface ApiErrorResponse {
  success: string;
  code?: string;
  message?: string;
}

export default function NearbyPlaceDetailPage() {
  const { placeId } = useParams();
  const parsedPlaceId = Number(placeId);
  const [tipContent, setTipContent] = useState('');
  const [tipType, setTipType] = useState<PlaceTipType>('POSITIVE');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [tipSubmitSuccess, setTipSubmitSuccess] = useState('');
  const [tipSubmitError, setTipSubmitError] = useState('');
  const [tipActionError, setTipActionError] = useState('');
  const [activeTipMenuId, setActiveTipMenuId] = useState<number | null>(null);
  const { name: authName } = useAuthStore();
  const { data: myInfo } = useGetMyInfo();
  const currentUserName = (myInfo?.name ?? authName ?? '').trim();
  const { data, isLoading, isError } = useGetPlaceDetail(parsedPlaceId, !!placeId);
  const {
    data: tipsData,
    isLoading: isTipsLoading,
    isError: isTipsError,
    error: tipsError,
  } = useGetPlaceTips(parsedPlaceId, !!placeId);

  const {
    mutate: postTipMutate,
    isPending: isTipPosting,
    error: postTipError,
    reset: resetPostTipError,
  } = usePostPlaceTip();
  const {
    mutate: deleteTipMutate,
    isPending: isTipDeleting,
    error: deleteTipError,
    reset: resetDeleteTipError,
  } = useDeletePlaceTip();
  const {
    mutate: likeTipMutate,
    isPending: isTipLiking,
    error: likeTipError,
    reset: resetLikeTipError,
  } = usePostPlaceTipLike();

  const detail = data?.data;
  const tips = tipsData?.data ?? [];
  const typedTipsError = tipsError as AxiosError<ApiErrorResponse> | null;
  const typedPostTipError = postTipError as AxiosError<ApiErrorResponse> | null;
  const typedDeleteTipError =
    deleteTipError as AxiosError<ApiErrorResponse> | null;
  const typedLikeTipError = likeTipError as AxiosError<ApiErrorResponse> | null;
  const isForeignerOnlyTipsError =
    typedTipsError instanceof AxiosError &&
    typedTipsError.response?.status === 403 &&
    typedTipsError.response?.data?.code === 'M004';
  const isForeignerOnlyPostError =
    typedPostTipError instanceof AxiosError &&
    typedPostTipError.response?.status === 403 &&
    typedPostTipError.response?.data?.code === 'M004';
  const isForeignerOnlyAccessBlocked =
    isForeignerOnlyTipsError || isForeignerOnlyPostError;
  const postTipErrorCode = typedPostTipError?.response?.data?.code;
  const deleteTipErrorCode = typedDeleteTipError?.response?.data?.code;
  const likeTipErrorCode = typedLikeTipError?.response?.data?.code;

  const postTipErrorMessage = (() => {
    if (!postTipErrorCode) return '';
    if (postTipErrorCode === 'M004') return '';
    if (postTipErrorCode === 'M007') return '이미 등록된 팁입니다.';
    if (postTipErrorCode === 'C002')
      return '요청 데이터가 올바르지 않습니다. 입력값을 확인해주세요.';
    if (postTipErrorCode === 'U001') return '사용자를 찾을 수 없습니다.';
    return '팁 등록 중 오류가 발생했습니다.';
  })();

  const deleteTipErrorMessage = (() => {
    if (!deleteTipErrorCode) return '';
    if (deleteTipErrorCode === 'S002')
      return '해당 팁을 삭제할 권한이 없습니다.';
    if (deleteTipErrorCode === 'M008') return '팁 정보를 찾을 수 없습니다.';
    return '팁 삭제 중 오류가 발생했습니다.';
  })();

  const likeTipErrorMessage = (() => {
    if (!likeTipErrorCode) return '';
    if (likeTipErrorCode === 'M004')
      return '외국인 회원만 좋아요를 등록할 수 있습니다.';
    if (likeTipErrorCode === 'U001') return '사용자를 찾을 수 없습니다.';
    return '좋아요 처리 중 오류가 발생했습니다.';
  })();

  const isMyTip = (authorNickname: string, tip: { isMine?: boolean; isAuthor?: boolean; canDelete?: boolean }) => {
    if (tip.isMine || tip.isAuthor || tip.canDelete) return true;
    if (!currentUserName) return false;
    return authorNickname === currentUserName;
  };

  const handleSubmitTip = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedContent = tipContent.trim();
    if (!normalizedContent) {
      setTipSubmitSuccess('');
      setTipSubmitError('팁 내용을 입력해주세요.');
      return;
    }

    setTipSubmitError('');
    setTipSubmitSuccess('');
    setTipActionError('');
    resetPostTipError();
    resetDeleteTipError();
    resetLikeTipError();

    postTipMutate(
      {
        placeId: parsedPlaceId,
        body: {
          content: normalizedContent,
          tipType,
          isAnonymous,
        },
      },
      {
        onSuccess: () => {
          setTipContent('');
          setTipSubmitSuccess('팁이 등록되었습니다.');
        },
      },
    );
  };

  const handleDeleteTip = (tipId: number) => {
    const confirmed = window.confirm('이 팁을 삭제하시겠습니까?');
    if (!confirmed) return;

    setTipActionError('');
    resetDeleteTipError();
    resetLikeTipError();
    setActiveTipMenuId(null);

    deleteTipMutate(
      { tipId, placeId: parsedPlaceId },
      {
        onSuccess: () => {
          setTipSubmitSuccess('팁이 삭제되었습니다.');
        },
      },
    );
  };

  const handleLikeTip = (tipId: number) => {
    setTipActionError('');
    resetDeleteTipError();
    resetLikeTipError();

    likeTipMutate({ tipId, placeId: parsedPlaceId });
  };

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
        <form className={styles.tipForm} onSubmit={handleSubmitTip}>
          <textarea
            className={styles.tipTextarea}
            placeholder='이 장소에 도움이 되는 팁을 작성해주세요.'
            value={tipContent}
            onChange={event => {
              setTipContent(event.target.value);
              if (tipSubmitError) setTipSubmitError('');
              if (tipSubmitSuccess) setTipSubmitSuccess('');
              if (postTipErrorCode) resetPostTipError();
            }}
            rows={3}
            maxLength={500}
            disabled={isTipPosting || isForeignerOnlyAccessBlocked}
          />
          <div className={styles.tipFormControlRow}>
            <div className={styles.tipFormOptions}>
              <label className={styles.tipFormLabel}>
                유형
                <select
                  className={styles.tipTypeSelect}
                  value={tipType}
                  onChange={event => setTipType(event.target.value as PlaceTipType)}
                  disabled={isTipPosting || isForeignerOnlyAccessBlocked}
                >
                  <option value='POSITIVE'>긍정</option>
                  <option value='NEUTRAL'>중립</option>
                  <option value='WARNING'>주의</option>
                </select>
              </label>
              <label className={styles.tipFormCheck}>
                <input
                  type='checkbox'
                  checked={isAnonymous}
                  onChange={event => setIsAnonymous(event.target.checked)}
                  disabled={isTipPosting || isForeignerOnlyAccessBlocked}
                />
                익명으로 등록
              </label>
            </div>
            <Button
              type='submit'
              color='#0c4a6e'
              disabled={isTipPosting || isForeignerOnlyAccessBlocked}
            >
              {isTipPosting ? '등록 중...' : '팁 등록'}
            </Button>
          </div>
          {tipSubmitSuccess ? (
            <div className={styles.formSuccess}>{tipSubmitSuccess}</div>
          ) : null}
          {tipSubmitError ? (
            <div className={styles.formError}>{tipSubmitError}</div>
          ) : null}
          {postTipErrorMessage ? (
            <div className={styles.formError}>{postTipErrorMessage}</div>
          ) : null}
          {isForeignerOnlyAccessBlocked ? (
            <div className={styles.formError}>외국인 회원만 팁 작성 및 조회가 가능합니다.</div>
          ) : null}
          {tipActionError ? <div className={styles.formError}>{tipActionError}</div> : null}
          {deleteTipErrorMessage ? (
            <div className={styles.formError}>{deleteTipErrorMessage}</div>
          ) : null}
          {likeTipErrorMessage ? (
            <div className={styles.formError}>{likeTipErrorMessage}</div>
          ) : null}
        </form>
        {isTipsLoading ? (
          <div className={styles.empty}>팁 목록을 불러오는 중입니다.</div>
        ) : isForeignerOnlyTipsError ? (
          <div className={styles.empty}>외국인 회원만 팁을 조회할 수 있습니다.</div>
        ) : isTipsError ? (
          <div className={styles.empty}>팁 목록을 불러오지 못했습니다.</div>
        ) : tips.length === 0 ? (
          <div className={styles.empty}>등록된 팁이 없습니다.</div>
        ) : (
          <ul className={styles.tipList}>
            {tips.map(tip => (
              <li key={tip.id} className={styles.tipItem}>
                <div className={styles.tipTop}>
                  <span className={styles.tipType}>
                    {tipTypeLabel[tip.tipType] ?? tip.tipType}
                  </span>
                  <div className={styles.tipTopRight}>
                    <span className={styles.tipAuthor}>{tip.authorNickname}</span>
                    {isMyTip(tip.authorNickname, tip) ? (
                      <div className={styles.tipMenuWrap}>
                        <button
                          type='button'
                          className={styles.tipMenuButton}
                          aria-label='팁 더보기'
                          onClick={() =>
                            setActiveTipMenuId(prev => (prev === tip.id ? null : tip.id))
                          }
                          disabled={isTipDeleting}
                        >
                          <MoreHorizontal size={14} />
                        </button>
                        {activeTipMenuId === tip.id ? (
                          <button
                            type='button'
                            className={styles.tipDeleteButton}
                            onClick={() => handleDeleteTip(tip.id)}
                            disabled={isTipDeleting}
                          >
                            삭제
                          </button>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
                <p>{tip.content}</p>
                <div className={styles.tipBottom}>
                  <button
                    type='button'
                    className={styles.likeButton}
                    onClick={() => handleLikeTip(tip.id)}
                    disabled={isTipLiking}
                  >
                    <ThumbsUp size={14} />
                    <span>{tip.likeCount}</span>
                  </button>
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
