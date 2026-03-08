import { ArrowLeft } from 'lucide-react';
import { ImageInput } from '@/components/common/input/ImageInput';
import Input from '@/components/common/input/Input';
import { TagInput } from '@/components/common/input/TagInput';
import TipTapEditor from '@/components/common/tiptapEditor/TipTapEditor';
import useGetMyInfo from '@/lib/apis/mutations/useGetMyInfo';
import useGetBoardPostDetail from '@/lib/apis/queries/useGetBoardPostDetail';
import usePatchBoardPost from '@/lib/apis/mutations/usePatchBoardPost';
import styles from './writePostPage.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type BoardCategoryType = 'GENERAL' | 'MARKET' | 'POLICY' | string;

export default function EditPostPage() {
  const { t } = useTranslation('pages');
  const { id } = useParams();
  const postId = Number(id ?? 0);
  const navigate = useNavigate();
  const { mutate: patchBoardPost, isPending: isPatchPending } =
    usePatchBoardPost();
  const { data: myInfo, isPending: isMyInfoPending } = useGetMyInfo();
  const {
    data,
    isPending: isDetailPending,
    isError: isDetailError,
    error: detailError,
  } = useGetBoardPostDetail(postId, Number.isFinite(postId) && postId > 0);

  const [boardCategoryType, setBoardCategoryType] =
    useState<BoardCategoryType>('GENERAL');
  const [postTitle, setPostTitle] = useState('');
  const [contentHtml, setContentHtml] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const initializedRef = useRef(false);
  const unauthorizedHandledRef = useRef(false);
  const initialRef = useRef({
    title: '',
    content: '',
    tags: [] as string[],
  });

  const post = data?.data;
  const boardCategoryTypeLabelMap: Record<string, string> = {
    GENERAL: t('communityEdit.categoryLabel.GENERAL'),
    MARKET: t('communityEdit.categoryLabel.MARKET'),
    POLICY: t('communityEdit.categoryLabel.POLICY'),
  };
  const canEdit = !!post && !!myInfo?.memberId && post.memberId === myInfo.memberId;

  useEffect(() => {
    if (!post || initializedRef.current) return;

    const nextTitle = post.title ?? '';
    const nextContent = post.content ?? '';
    const nextTags = post.tags ?? [];

    setBoardCategoryType(post.boardCategoryType);
    setPostTitle(nextTitle);
    setContentHtml(nextContent);
    setTags(nextTags);

    initialRef.current = {
      title: nextTitle,
      content: nextContent,
      tags: nextTags,
    };
    initializedRef.current = true;
  }, [post]);

  useEffect(() => {
    if (!post || isMyInfoPending || unauthorizedHandledRef.current) return;

    if (!myInfo?.memberId || post.memberId !== myInfo.memberId) {
      unauthorizedHandledRef.current = true;
      alert(t('communityEdit.alerts.noPermission'));
      navigate(`/community/${postId}`, { replace: true });
    }
  }, [isMyInfoPending, myInfo?.memberId, navigate, post, postId, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPatchPending || !postId || !canEdit) return;

    const normalizedTitle = postTitle.trim();
    const normalizedContent = contentHtml.trim();
    const normalizedTags = [...new Set(tags.map(tag => tag.trim()))].filter(
      tag => tag.length > 0,
    );
    const plainText = normalizedContent
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim();

    if (!normalizedTitle) {
      alert(t('communityEdit.alerts.titleRequired'));
      return;
    }

    if (!plainText) {
      alert(t('communityEdit.alerts.contentRequired'));
      return;
    }

    if (files.length > 0) {
      alert(t('communityEdit.alerts.imageNotSupported'));
    }

    patchBoardPost(
      {
        postId,
        body: {
          title: normalizedTitle,
          content: normalizedContent,
          categoryCode: '',
          tags: normalizedTags,
          imageFileIds: [],
        },
      },
      {
        onSuccess: () => {
          alert(t('communityEdit.alerts.updateSuccess'));
          navigate(`/community/${postId}`);
        },
        onError: error => {
          const errorData = (
            error as {
              response?: {
                data?: {
                  message?: string;
                  msg?: string;
                };
              };
            }
          )?.response?.data;

          alert(
            errorData?.message ??
              errorData?.msg ??
              t('communityEdit.alerts.updateFail'),
          );
        },
      },
    );
  };

  const handleCancel = () => {
    if (isPatchPending) return;

    const normalizedCurrentTags = [...new Set(tags.map(tag => tag.trim()))]
      .filter(tag => tag.length > 0)
      .sort();
    const normalizedInitialTags = [
      ...new Set(initialRef.current.tags.map(tag => tag.trim())),
    ]
      .filter(tag => tag.length > 0)
      .sort();

    const hasChanges =
      postTitle.trim() !== initialRef.current.title.trim() ||
      contentHtml.trim() !== initialRef.current.content.trim() ||
      JSON.stringify(normalizedCurrentTags) !==
        JSON.stringify(normalizedInitialTags) ||
      files.length > 0;

    if (!hasChanges) {
      navigate(-1);
      return;
    }

    const confirmLeave = window.confirm(
      t('communityEdit.confirmLeave'),
    );

    if (confirmLeave) {
      navigate(-1);
    }
  };

  const detailErrorMessage = (
    detailError as {
      response?: { data?: { message?: string; msg?: string } };
    }
  )?.response?.data;

  if (isDetailPending) {
    return <div className={styles.container}>{t('communityEdit.state.loadingPost')}</div>;
  }

  if (isMyInfoPending) {
    return (
      <div className={styles.container}>{t('communityEdit.state.checkingPermission')}</div>
    );
  }

  if (isDetailError || !post) {
    return (
      <div className={styles.container}>
        {detailErrorMessage?.message ??
          detailErrorMessage?.msg ??
          t('communityEdit.state.loadFail')}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.goBack} onClick={handleCancel}>
        <ArrowLeft size={20} />
        <span>{t('communityEdit.labels.back')}</span>
      </div>

      <form className={styles.contentArea} onSubmit={handleSubmit}>
        <div>{t('communityEdit.labels.postType')}</div>
        <Input
          value={
            boardCategoryTypeLabelMap[boardCategoryType] ?? boardCategoryType
          }
          readOnly
        />

        <div>{t('communityEdit.labels.title')}</div>
        <Input
          placeholder={t('communityEdit.placeholder.title')}
          value={postTitle}
          onChange={e => setPostTitle(e.target.value)}
        />

        <TipTapEditor value={contentHtml} onChange={setContentHtml} />
        <ImageInput maxFiles={5} onChangeFiles={setFiles} />
        <TagInput
          tags={tags}
          onChangeTags={setTags}
          maxTags={5}
          helperText={t('communityEdit.tagHelper')}
        />

        <div className={styles.btnArea}>
          <button
            className={styles.cancelBtn}
            type='button'
            onClick={handleCancel}
            disabled={isPatchPending}
          >
            {t('communityEdit.buttons.cancel')}
          </button>
          <button
            className={styles.submitBtn}
            type='submit'
            disabled={isPatchPending}
          >
            {isPatchPending
              ? t('communityEdit.buttons.saving')
              : t('communityEdit.buttons.save')}
          </button>
        </div>
      </form>
    </div>
  );
}
