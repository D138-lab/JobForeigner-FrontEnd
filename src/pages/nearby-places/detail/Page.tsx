import { FormEvent, useState } from 'react';
import {
  ArrowLeft,
  Clock3,
  Globe2,
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
import usePostPlaceTipReport from '@/lib/apis/mutations/usePostPlaceTipReport';
import useGetMyInfo from '@/lib/apis/mutations/useGetMyInfo';
import { PATH } from '@/lib/constants/routes';
import useGetPlaceDetail from '@/lib/apis/queries/useGetPlaceDetail';
import useGetPlaceTips from '@/lib/apis/queries/useGetPlaceTips';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import styles from './page.module.scss';
import { useTranslation } from 'react-i18next';
import type { PlaceTip } from '@/lib/apis/queries/useGetPlaceTips';

interface ApiErrorResponse {
  success: string;
  code?: string;
  message?: string;
}

export default function NearbyPlaceDetailPage() {
  const { t } = useTranslation('pages');
  const { placeId } = useParams();
  const parsedPlaceId = Number(placeId);
  const [tipContent, setTipContent] = useState('');
  const [tipType, setTipType] = useState<PlaceTipType>('POSITIVE');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [tipSubmitSuccess, setTipSubmitSuccess] = useState('');
  const [tipSubmitError, setTipSubmitError] = useState('');
  const [tipActionError, setTipActionError] = useState('');
  const [activeTipMenuId, setActiveTipMenuId] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'tips'>(
    'overview',
  );
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
  const {
    mutate: reportTipMutate,
    isPending: isTipReporting,
    error: reportTipError,
    reset: resetReportTipError,
  } = usePostPlaceTipReport();

  const detail = data?.data;
  const tips = tipsData?.data ?? [];
  const typedTipsError = tipsError as AxiosError<ApiErrorResponse> | null;
  const typedPostTipError = postTipError as AxiosError<ApiErrorResponse> | null;
  const typedDeleteTipError =
    deleteTipError as AxiosError<ApiErrorResponse> | null;
  const typedLikeTipError = likeTipError as AxiosError<ApiErrorResponse> | null;
  const typedReportTipError =
    reportTipError as AxiosError<ApiErrorResponse> | null;
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
  const reportTipErrorCode = typedReportTipError?.response?.data?.code;

  const postTipErrorMessage = (() => {
    if (!postTipErrorCode) return '';
    if (postTipErrorCode === 'M004') return '';
    if (postTipErrorCode === 'M007')
      return t('nearbyPlaceDetail.errors.tipAlreadyExists');
    if (postTipErrorCode === 'C002')
      return t('nearbyPlaceDetail.errors.invalidRequest');
    if (postTipErrorCode === 'U001')
      return t('nearbyPlaceDetail.errors.memberNotFound');
    return t('nearbyPlaceDetail.errors.tipPostFail');
  })();

  const deleteTipErrorMessage = (() => {
    if (!deleteTipErrorCode) return '';
    if (deleteTipErrorCode === 'S002')
      return t('nearbyPlaceDetail.errors.deleteDenied');
    if (deleteTipErrorCode === 'M008')
      return t('nearbyPlaceDetail.errors.tipNotFound');
    return t('nearbyPlaceDetail.errors.tipDeleteFail');
  })();

  const likeTipErrorMessage = (() => {
    if (!likeTipErrorCode) return '';
    if (likeTipErrorCode === 'M004')
      return t('nearbyPlaceDetail.errors.likeForeignerOnly');
    if (likeTipErrorCode === 'U001')
      return t('nearbyPlaceDetail.errors.memberNotFound');
    return t('nearbyPlaceDetail.errors.likeFail');
  })();

  const reportTipErrorMessage = (() => {
    if (!reportTipErrorCode) return '';
    if (reportTipErrorCode === 'M004')
      return t('nearbyPlaceDetail.errors.reportForeignerOnly');
    if (reportTipErrorCode === 'U001')
      return t('nearbyPlaceDetail.errors.memberNotFound');
    return t('nearbyPlaceDetail.errors.reportFail');
  })();

  const isMyTip = (
    authorNickname: string,
    tip: { isMine?: boolean; isAuthor?: boolean; canDelete?: boolean },
  ) => {
    if (tip.isMine || tip.isAuthor || tip.canDelete) return true;
    if (!currentUserName) return false;
    return authorNickname === currentUserName;
  };
  const formatDate = (dateText: string) =>
    new Date(dateText).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  const latestTipDate =
    tips.length > 0
      ? formatDate(
          [...tips].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )[0].createdAt,
        )
      : null;
  const tipTypeClassName = (tipTypeValue: PlaceTip['tipType']) => {
    if (tipTypeValue === 'POSITIVE') return styles.tipTypePositive;
    if (tipTypeValue === 'WARNING') return styles.tipTypeWarning;
    return styles.tipTypeNeutral;
  };
  const detailTabs = [
    { key: 'overview' as const, label: t('nearbyPlaceDetail.summaryTitle') },
    { key: 'tips' as const, label: t('nearbyPlaceDetail.tipsTitle') },
  ];

  const handleSubmitTip = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedContent = tipContent.trim();
    if (!normalizedContent) {
      setTipSubmitSuccess('');
      setTipSubmitError(t('nearbyPlaceDetail.messages.tipContentRequired'));
      return;
    }

    setTipSubmitError('');
    setTipSubmitSuccess('');
    setTipActionError('');
    resetPostTipError();
    resetDeleteTipError();
    resetLikeTipError();
    resetReportTipError();

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
          setTipSubmitSuccess(t('nearbyPlaceDetail.messages.tipCreated'));
        },
      },
    );
  };

  const handleDeleteTip = (tipId: number) => {
    const confirmed = window.confirm(t('nearbyPlaceDetail.messages.deleteConfirm'));
    if (!confirmed) return;

    setTipActionError('');
    resetDeleteTipError();
    resetLikeTipError();
    resetReportTipError();
    setActiveTipMenuId(null);

    deleteTipMutate(
      { tipId, placeId: parsedPlaceId },
      {
        onSuccess: () => {
          setTipSubmitSuccess(t('nearbyPlaceDetail.messages.tipDeleted'));
        },
      },
    );
  };

  const handleLikeTip = (tipId: number) => {
    setTipActionError('');
    resetDeleteTipError();
    resetLikeTipError();
    resetReportTipError();

    likeTipMutate({ tipId, placeId: parsedPlaceId });
  };

  const handleReportTip = (tipId: number) => {
    const confirmed = window.confirm(t('nearbyPlaceDetail.messages.reportConfirm'));
    if (!confirmed) return;

    setTipActionError('');
    resetDeleteTipError();
    resetLikeTipError();
    resetReportTipError();
    setActiveTipMenuId(null);

    reportTipMutate(
      { tipId },
      {
        onSuccess: () => {
          setTipSubmitSuccess(t('nearbyPlaceDetail.messages.tipReported'));
        },
      },
    );
  };

  if (isLoading) {
    return <div className={styles.stateBox}>{t('nearbyPlaceDetail.state.loadingDetail')}</div>;
  }

  if (isError || !detail) {
    return <div className={styles.stateBox}>{t('nearbyPlaceDetail.state.loadDetailFail')}</div>;
  }

  return (
    <div className={styles.container}>
      <Link to={PATH.NEARBY_PLACES} className={styles.backLink}>
        <ArrowLeft size={16} />
        <span>{t('nearbyPlaceDetail.backToList')}</span>
      </Link>

      <div className={styles.infoTitle}>
        {detail.imageUrl ? (
          <div className={styles.logoWrap}>
            <img src={detail.imageUrl} alt={detail.name} className={styles.heroImage} />
          </div>
        ) : (
          <div className={styles.logoWrap} />
        )}
        <div className={styles.titleContent}>
          <div className={styles.badgeRow}>
            <span className={styles.categoryBadge}>
              {t(`nearbyPlaces.categories.${detail.category}`, {
                defaultValue: detail.category,
              })}
            </span>
            {detail.subCategory ? (
              <span className={styles.subCategory}>{detail.subCategory}</span>
            ) : null}
            {detail.isVerified && (
              <span className={styles.verified}>
                {t('nearbyPlaceDetail.verified')}
              </span>
            )}
          </div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{detail.name}</h1>
          </div>
          <div className={styles.subTitleRow}>
            {detail.nameEn ? (
              <span className={styles.subTitle}>{detail.nameEn}</span>
            ) : null}
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <MapPin size={16} />
              {detail.displayAddress}
            </span>
            <span className={styles.metaItem}>
              <Phone size={16} />
              {detail.phoneNumber || t('nearbyPlaceDetail.phoneEmpty')}
            </span>
            <span className={styles.metaItem}>
              <Clock3 size={16} />
              {detail.operatingHours || t('nearbyPlaceDetail.hoursEmpty')}
            </span>
            <span className={styles.metaItem}>
              <Globe2 size={16} />
              {detail.countryAffinity || '-'}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.optionTab}>
        {detailTabs.map(tab => (
          <button
            type='button'
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`${styles.option} ${
              selectedTab === tab.key ? styles.selectedOption : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.selectInfo}>
        {selectedTab === 'overview' ? (
          <section className={styles.contentCard}>
            <p className={styles.description}>
              {detail.description || t('nearbyPlaceDetail.descriptionEmpty')}
            </p>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <span>{t('nearbyPlaceDetail.summary.total')}</span>
                <strong>{detail.tipSummary.total}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>{t('nearbyPlaceDetail.summary.positive')}</span>
                <strong>{detail.tipSummary.positive}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>{t('nearbyPlaceDetail.summary.neutral')}</span>
                <strong>{detail.tipSummary.neutral}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>{t('nearbyPlaceDetail.summary.warning')}</span>
                <strong>{detail.tipSummary.warning}</strong>
              </div>
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <MapPin size={16} />
                <div>
                  <strong>{detail.displayAddress}</strong>
                </div>
              </div>
              <div className={styles.infoItem}>
                <Phone size={16} />
                <div>
                  <strong>
                    {detail.phoneNumber || t('nearbyPlaceDetail.phoneEmpty')}
                  </strong>
                </div>
              </div>
              <div className={styles.infoItem}>
                <Clock3 size={16} />
                <div>
                  <strong>
                    {detail.operatingHours || t('nearbyPlaceDetail.hoursEmpty')}
                  </strong>
                </div>
              </div>
              <div className={styles.infoItem}>
                <Globe2 size={16} />
                <div>
                  <strong>{detail.countryAffinity || '-'}</strong>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className={styles.contentCard}>
            <div className={styles.sectionHeading}>
              <h2>{t('nearbyPlaceDetail.tipsTitle')}</h2>
              <span className={styles.sectionHint}>
                {latestTipDate ?? tips.length}
              </span>
            </div>
            <form className={styles.tipForm} onSubmit={handleSubmitTip}>
              <textarea
                className={styles.tipTextarea}
                placeholder={t('nearbyPlaceDetail.tipPlaceholder')}
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
                    {t('nearbyPlaceDetail.tipTypeLabel')}
                    <select
                      className={styles.tipTypeSelect}
                      value={tipType}
                      onChange={event => setTipType(event.target.value as PlaceTipType)}
                      disabled={isTipPosting || isForeignerOnlyAccessBlocked}
                    >
                      <option value='POSITIVE'>{t('nearbyPlaceDetail.tipType.POSITIVE')}</option>
                      <option value='NEUTRAL'>{t('nearbyPlaceDetail.tipType.NEUTRAL')}</option>
                      <option value='WARNING'>{t('nearbyPlaceDetail.tipType.WARNING')}</option>
                    </select>
                  </label>
                  <label className={styles.tipFormCheck}>
                    <input
                      type='checkbox'
                      checked={isAnonymous}
                      onChange={event => setIsAnonymous(event.target.checked)}
                      disabled={isTipPosting || isForeignerOnlyAccessBlocked}
                    />
                    {t('nearbyPlaceDetail.anonymous')}
                  </label>
                </div>
                <Button
                  type='submit'
                  color='#0c4a6e'
                  disabled={isTipPosting || isForeignerOnlyAccessBlocked}
                >
                  {isTipPosting
                    ? t('nearbyPlaceDetail.tipCreating')
                    : t('nearbyPlaceDetail.tipCreate')}
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
                <div className={styles.formError}>
                  {t('nearbyPlaceDetail.errors.foreignerOnlyAccess')}
                </div>
              ) : null}
              {tipActionError ? (
                <div className={styles.formError}>{tipActionError}</div>
              ) : null}
              {deleteTipErrorMessage ? (
                <div className={styles.formError}>{deleteTipErrorMessage}</div>
              ) : null}
              {likeTipErrorMessage ? (
                <div className={styles.formError}>{likeTipErrorMessage}</div>
              ) : null}
              {reportTipErrorMessage ? (
                <div className={styles.formError}>{reportTipErrorMessage}</div>
              ) : null}
            </form>
            {isTipsLoading ? (
              <div className={styles.empty}>{t('nearbyPlaceDetail.tipsLoading')}</div>
            ) : isForeignerOnlyTipsError ? (
              <div className={styles.empty}>{t('nearbyPlaceDetail.errors.foreignerOnlyView')}</div>
            ) : isTipsError ? (
              <div className={styles.empty}>{t('nearbyPlaceDetail.errors.tipsLoadFail')}</div>
            ) : tips.length === 0 ? (
              <div className={styles.empty}>{t('nearbyPlaceDetail.tipsEmpty')}</div>
            ) : (
              <ul className={styles.tipList}>
                {tips.map(tip => (
                  <li key={tip.id} className={styles.tipItem}>
                    <div className={styles.tipTop}>
                      <span
                        className={`${styles.tipType} ${tipTypeClassName(tip.tipType)}`}
                      >
                        {t(`nearbyPlaceDetail.tipType.${tip.tipType}`, {
                          defaultValue: tip.tipType,
                        })}
                      </span>
                      <div className={styles.tipTopRight}>
                        <span className={styles.tipAuthor}>{tip.authorNickname}</span>
                        <div className={styles.tipMenuWrap}>
                          <button
                            type='button'
                            className={styles.tipMenuButton}
                            aria-label={t('nearbyPlaceDetail.tipMenuAria')}
                            onClick={() =>
                              setActiveTipMenuId(prev => (prev === tip.id ? null : tip.id))
                            }
                            disabled={isTipDeleting || isTipReporting}
                          >
                            <MoreHorizontal size={14} />
                          </button>
                          {activeTipMenuId === tip.id ? (
                            isMyTip(tip.authorNickname, tip) ? (
                              <button
                                type='button'
                                className={styles.tipDeleteButton}
                                onClick={() => handleDeleteTip(tip.id)}
                                disabled={isTipDeleting}
                              >
                                {t('nearbyPlaceDetail.tipDelete')}
                              </button>
                            ) : (
                              <button
                                type='button'
                                className={styles.tipReportButton}
                                onClick={() => handleReportTip(tip.id)}
                                disabled={isTipReporting}
                              >
                                {t('nearbyPlaceDetail.tipReport')}
                              </button>
                            )
                          ) : null}
                        </div>
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
                      <span>{formatDate(tip.createdAt)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
