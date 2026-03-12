import Select, { Option } from '@/components/common/select/Select';

import { ArrowLeft } from 'lucide-react';
import { ImageInput } from '@/components/common/input/ImageInput';
import { TagInput } from '@/components/common/input/TagInput';
import TipTapEditor from '@/components/common/tiptapEditor/TipTapEditor';
import useGetMyInfo from '@/lib/apis/mutations/useGetMyInfo';
import usePostBoardPost from '@/lib/apis/mutations/usePostBoardPost';
import usePostFileUpload from '@/lib/apis/mutations/usePostFileUpload';
import usePostFileUploadConfirm, {
  PostFileUploadConfirmData,
} from '@/lib/apis/mutations/usePostFileUploadConfirm';
import { PATH } from '@/lib/constants';
import styles from './writePostPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type BoardCategoryType = 'GENERAL' | 'MARKET' | 'POLICY';
type GeneralCategoryCode = 'NOTICE' | 'FREE' | 'QNA' | 'INFO';

export default function WritePostPage() {
  const { t } = useTranslation('pages');
  const navigate = useNavigate();
  const { mutate: postBoardPost, isPending } = usePostBoardPost();
  const { mutateAsync: postFileUpload, isPending: isFileUploadPending } =
    usePostFileUpload();
  const {
    mutateAsync: postFileUploadConfirm,
    isPending: isFileConfirmPending,
  } = usePostFileUploadConfirm();
  const { data: myInfo } = useGetMyInfo();
  const isAdminUser = myInfo?.type === 'ADMIN';
  const [boardCategoryType, setBoardCategoryType] =
    useState<BoardCategoryType>('GENERAL');
  const [generalCategoryCode, setGeneralCategoryCode] =
    useState<GeneralCategoryCode>('FREE');
  const [postTitle, setPostTitle] = useState('');
  const [contentHtml, setContentHtml] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const isSubmitting = isPending || isFileUploadPending || isFileConfirmPending;
  const postTypeOptions: Option[] = useMemo(
    () => [
      { label: t('communityWrite.postTypes.GENERAL'), value: 'GENERAL' },
      { label: t('communityWrite.postTypes.MARKET'), value: 'MARKET' },
      { label: t('communityWrite.postTypes.POLICY'), value: 'POLICY' },
    ],
    [t],
  );
  const allGeneralCategoryOptions: Option[] = useMemo(
    () => [
      {
        label: t('communityWrite.generalCategories.NOTICE'),
        value: 'NOTICE',
      },
      { label: t('communityWrite.generalCategories.FREE'), value: 'FREE' },
      { label: t('communityWrite.generalCategories.QNA'), value: 'QNA' },
      { label: t('communityWrite.generalCategories.INFO'), value: 'INFO' },
    ],
    [t],
  );
  const generalCategoryOptions = useMemo(
    () =>
      isAdminUser
        ? allGeneralCategoryOptions
        : allGeneralCategoryOptions.filter(option => option.value !== 'NOTICE'),
    [isAdminUser],
  );

  const extractConfirmedImageFileId = (
    confirmData: PostFileUploadConfirmData | number | null,
  ) => {
    if (typeof confirmData === 'number' && Number.isFinite(confirmData)) {
      return confirmData;
    }

    if (!confirmData || typeof confirmData !== 'object') return null;

    const directId = confirmData.imageFileId ?? confirmData.fileId ?? confirmData.id;
    return typeof directId === 'number' && Number.isFinite(directId)
      ? directId
      : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

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
      alert(t('communityWrite.alerts.titleRequired'));
      return;
    }

    if (!plainText) {
      alert(t('communityWrite.alerts.contentRequired'));
      return;
    }

    if (boardCategoryType === 'GENERAL' && !generalCategoryCode) {
      alert(t('communityWrite.alerts.generalCategoryRequired'));
      return;
    }

    if (
      boardCategoryType === 'GENERAL' &&
      generalCategoryCode === 'NOTICE' &&
      !isAdminUser
    ) {
      alert(t('communityWrite.alerts.noticeAdminOnly'));
      return;
    }

    try {
      const uploadedImageFileIds: number[] = [];

      for (const file of files) {
        const presignedResponse = await postFileUpload({
          fileType: 'BOARD_POST_IMAGE',
          referenceId: myInfo?.memberId ?? 0,
          fileName: file.name,
        });

        const uploadResponse = await fetch(presignedResponse.data.presignedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type || 'application/octet-stream',
          },
          body: file,
        });

        if (!uploadResponse.ok) {
          throw new Error('PRESIGNED_UPLOAD_FAILED');
        }

        const confirmResponse = await postFileUploadConfirm({
          fileName: file.name,
          objectName: presignedResponse.data.objectName,
          fileSize: file.size,
          fileType: 'BOARD_POST_IMAGE',
          referenceId: myInfo?.memberId ?? 0,
          contentType: file.type || 'application/octet-stream',
        });

        const imageFileId = extractConfirmedImageFileId(confirmResponse.data);
        if (!imageFileId) {
          throw new Error('IMAGE_FILE_ID_NOT_FOUND');
        }
        uploadedImageFileIds.push(imageFileId);
      }

      const requestBody = {
        title: normalizedTitle,
        content: normalizedContent,
        boardCategoryType,
        ...(boardCategoryType === 'GENERAL'
          ? { categoryCode: generalCategoryCode }
          : {}),
        tags: normalizedTags,
        imageFileIds: uploadedImageFileIds,
      };

      postBoardPost(
        requestBody,
        {
          onSuccess: () => {
            alert(t('communityWrite.alerts.createSuccess'));
            navigate(PATH.COMMUNITY);
          },
          onError: error => {
            const errorData = (
              error as {
                response?: {
                  data?: {
                    code?: string;
                    message?: string;
                    msg?: string;
                  };
                };
              }
            )?.response?.data;

            const errorMessage =
              errorData?.message ??
              errorData?.msg ??
              t('communityWrite.alerts.createFail');

            alert(errorMessage);
          },
        },
      );
    } catch (error) {
      if ((error as Error)?.message === 'IMAGE_FILE_ID_NOT_FOUND') {
        alert(t('communityWrite.alerts.imageIdMissing'));
        return;
      }

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
          t('communityWrite.alerts.imageUploadFail'),
      );
      return;
    }
  };

  const handleCancel = () => {
    if (isSubmitting) return;

    const hasChanges =
      boardCategoryType !== 'GENERAL' ||
      postTitle ||
      contentHtml ||
      files.length > 0 ||
      tags.length > 0;

    if (!hasChanges) {
      navigate(-1);
      return;
    }

    const confirmLeave = window.confirm(
      t('communityWrite.confirmLeave'),
    );

    if (confirmLeave) {
      navigate(-1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageShell}>
        <button className={styles.goBack} type='button' onClick={handleCancel}>
          <ArrowLeft size={18} />
          <span>{t('communityWrite.labels.back')}</span>
        </button>

        <form className={styles.contentArea} onSubmit={handleSubmit}>
          <div className={styles.hero}>
            <div className={styles.heroEyebrow}>{t('communityWrite.labels.postType')}</div>
            <div className={styles.heroTitleField}>
              <input
                className={styles.heroTitleInput}
                placeholder={t('communityWrite.placeholder.title')}
                value={postTitle}
                onChange={e => setPostTitle(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formCard}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>
                {t('communityWrite.labels.postType')}
              </label>
              <Select
                options={postTypeOptions}
                value={boardCategoryType}
                onChange={value => {
                  const nextType = value as BoardCategoryType;
                  setBoardCategoryType(nextType);
                  if (nextType !== 'GENERAL') {
                    setGeneralCategoryCode('FREE');
                  }
                }}
              />
            </div>
            {boardCategoryType === 'GENERAL' ? (
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  {t('communityWrite.labels.generalCategory')}
                </label>
                <Select
                  options={generalCategoryOptions}
                  value={generalCategoryCode}
                  onChange={value =>
                    setGeneralCategoryCode(value as GeneralCategoryCode)
                  }
                />
              </div>
            ) : null}

            <div className={styles.editorSection}>
              <TipTapEditor value={contentHtml} onChange={setContentHtml} />
            </div>

            <div className={styles.supportSection}>
              <ImageInput maxFiles={5} onChangeFiles={setFiles} />
              <TagInput
                tags={tags}
                onChangeTags={setTags}
                maxTags={5}
                helperText={t('communityWrite.tagHelper')}
              />
            </div>
          </div>

          <div className={styles.btnArea}>
          <button
            className={styles.cancelBtn}
            type='button'
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            {t('communityWrite.buttons.cancel')}
          </button>
          <button
            className={styles.submitBtn}
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t('communityWrite.buttons.submitting')
              : t('communityWrite.buttons.submit')}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
