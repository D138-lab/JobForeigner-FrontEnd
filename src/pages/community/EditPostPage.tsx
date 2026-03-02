import { ArrowLeft } from 'lucide-react';
import { ImageInput } from '@/components/common/input/ImageInput';
import Input from '@/components/common/input/Input';
import { TagInput } from '@/components/common/input/TagInput';
import TipTapEditor from '@/components/common/tiptapEditor/TipTapEditor';
import useGetBoardPostDetail from '@/lib/apis/queries/useGetBoardPostDetail';
import usePatchBoardPost from '@/lib/apis/mutations/usePatchBoardPost';
import styles from './writePostPage.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type BoardCategoryType = 'GENERAL' | 'MARKET' | 'POLICY' | string;

const boardCategoryTypeLabelMap: Record<string, string> = {
  GENERAL: '일반 게시글',
  MARKET: '중고 거래',
  POLICY: '정책 큐레이션',
};

export default function EditPostPage() {
  const { id } = useParams();
  const postId = Number(id ?? 0);
  const navigate = useNavigate();
  const { mutate: patchBoardPost, isPending: isPatchPending } =
    usePatchBoardPost();
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
  const initialRef = useRef({
    title: '',
    content: '',
    tags: [] as string[],
  });

  const post = data?.data;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPatchPending || !postId) return;

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

    if (files.length > 0) {
      alert('이미지 업로드 연동 전이라 현재는 이미지 없이 수정됩니다.');
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
          alert('게시글이 수정되었습니다.');
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
              '게시글 수정에 실패했습니다. 다시 시도해주세요.',
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
      '수정 중인 내용이 저장되지 않습니다.\n정말 취소하시겠습니까?',
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
    return <div className={styles.container}>게시글 정보를 불러오는 중입니다.</div>;
  }

  if (isDetailError || !post) {
    return (
      <div className={styles.container}>
        {detailErrorMessage?.message ??
          detailErrorMessage?.msg ??
          '게시글 정보를 불러오지 못했습니다.'}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.goBack} onClick={handleCancel}>
        <ArrowLeft size={20} />
        <span>돌아가기</span>
      </div>

      <form className={styles.contentArea} onSubmit={handleSubmit}>
        <div>게시글 유형</div>
        <Input
          value={
            boardCategoryTypeLabelMap[boardCategoryType] ?? boardCategoryType
          }
          readOnly
        />

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
            disabled={isPatchPending}
          >
            취소
          </button>
          <button
            className={styles.submitBtn}
            type='submit'
            disabled={isPatchPending}
          >
            {isPatchPending ? '수정 중...' : '수정'}
          </button>
        </div>
      </form>
    </div>
  );
}
