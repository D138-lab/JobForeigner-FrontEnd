import Select, { Option } from '@/components/common/select/Select';

import { ArrowLeft } from 'lucide-react';
import { ImageInput } from '@/components/common/input/ImageInput';
import Input from '@/components/common/input/Input';
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

type BoardCategoryType = 'GENERAL' | 'MARKET' | 'POLICY';
type GeneralCategoryCode = 'NOTICE' | 'FREE' | 'QNA' | 'INFO';

const postTypeOptions: Option[] = [
  { label: '일반 게시글', value: 'GENERAL' },
  { label: '중고 거래', value: 'MARKET' },
  { label: '정책 큐레이션', value: 'POLICY' },
];
const allGeneralCategoryOptions: Option[] = [
  { label: '운영 안내/공지', value: 'NOTICE' },
  { label: '자유 게시글', value: 'FREE' },
  { label: '질문/답변', value: 'QNA' },
  { label: '정보 공유', value: 'INFO' },
];

export default function WritePostPage() {
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
      alert('제목을 입력해주세요.');
      return;
    }

    if (!plainText) {
      alert('본문을 입력해주세요.');
      return;
    }

    if (boardCategoryType === 'GENERAL' && !generalCategoryCode) {
      alert('일반 게시글 카테고리를 선택해주세요.');
      return;
    }

    if (
      boardCategoryType === 'GENERAL' &&
      generalCategoryCode === 'NOTICE' &&
      !isAdminUser
    ) {
      alert('일반 사용자는 운영 안내/공지를 선택할 수 없습니다.');
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
            alert('게시글이 등록되었습니다.');
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
              '게시글 등록에 실패했습니다. 다시 시도해주세요.';

            alert(errorMessage);
          },
        },
      );
    } catch (error) {
      if ((error as Error)?.message === 'IMAGE_FILE_ID_NOT_FOUND') {
        alert('이미지 업로드 확인 응답에서 파일 ID를 찾지 못했습니다.');
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
          '이미지 업로드에 실패했습니다. 다시 시도해주세요.',
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
      '작성 중인 내용이 저장되지 않습니다.\n정말 취소하시겠습니까?',
    );

    if (confirmLeave) {
      navigate(-1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.goBack} onClick={handleCancel}>
        <ArrowLeft size={20} />
        <span>돌아가기</span>
      </div>

      <form className={styles.contentArea} onSubmit={handleSubmit}>
        <div>게시글 유형</div>
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
        {boardCategoryType === 'GENERAL' ? (
          <>
            <div>일반 게시글 카테고리</div>
            <Select
              options={generalCategoryOptions}
              value={generalCategoryCode}
              onChange={value => setGeneralCategoryCode(value as GeneralCategoryCode)}
            />
          </>
        ) : null}

        <div>제목</div>
        <Input
          placeholder='제목을 입력해주세요.'
          value={postTitle}
          onChange={e => setPostTitle(e.target.value)}
        />

        <TipTapEditor value={contentHtml} onChange={setContentHtml} />
        <ImageInput maxFiles={5} onChangeFiles={setFiles} />
        <TagInput
          tags={tags}
          onChangeTags={setTags}
          maxTags={5}
          helperText='게시물과 연관된 태그를 입력해주세요. 최대 5개까지 입력 가능합니다.'
        />

        <div className={styles.btnArea}>
          <button
            className={styles.cancelBtn}
            type='button'
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            취소
          </button>
          <button
            className={styles.submitBtn}
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? '등록 중...' : '등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
