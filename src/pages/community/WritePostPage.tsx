import Select, { Option } from '@/components/common/select/Select';

import { ArrowLeft } from 'lucide-react';
import { ImageInput } from '@/components/common/input/ImageInput';
import Input from '@/components/common/input/Input';
import { TagInput } from '@/components/common/input/TagInput';
import TipTapEditor from '@/components/common/tiptapEditor/TipTapEditor';
import usePostBoardPost from '@/lib/apis/mutations/usePostBoardPost';
import { PATH } from '@/lib/constants';
import styles from './writePostPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type BoardCategoryType = 'GENERAL' | 'MARKET' | 'POLICY';
const postTypeOptions: Option[] = [
  { label: '일반 게시글', value: 'GENERAL' },
  { label: '중고 거래', value: 'MARKET' },
  { label: '정책 큐레이션', value: 'POLICY' },
];

export default function WritePostPage() {
  const navigate = useNavigate();
  const { mutate: postBoardPost, isPending } = usePostBoardPost();
  const [boardCategoryType, setBoardCategoryType] =
    useState<BoardCategoryType>('GENERAL');
  const [postTitle, setPostTitle] = useState('');
  const [contentHtml, setContentHtml] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;

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
      alert('이미지 업로드 연동 전이라 현재는 이미지 없이 등록됩니다.');
    }

    postBoardPost(
      {
        title: normalizedTitle,
        content: normalizedContent,
        boardCategoryType,
        categoryCode: '',
        tags: normalizedTags,
        imageFileIds: [],
      },
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
  };

  const handleCancel = () => {
    if (isPending) return;

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
            setBoardCategoryType(value as BoardCategoryType);
          }}
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
            disabled={isPending}
          >
            취소
          </button>
          <button className={styles.submitBtn} type='submit' disabled={isPending}>
            {isPending ? '등록 중...' : '등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
