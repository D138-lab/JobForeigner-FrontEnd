import Select, { Option } from '@/components/common/select/Select';

import { ArrowLeft } from 'lucide-react';
import { ImageInput } from '@/components/common/input/ImageInput';
import Input from '@/components/common/input/Input';
import { TagInput } from '@/components/common/input/TagInput';
import TipTapEditor from '@/components/common/tiptapEditor/TipTapEditor';
import styles from './writePostPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function WritePostPage() {
  const navigate = useNavigate();
  const [postOption, setPostOption] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [contentHtml, setContentHtml] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const postType: Option[] = [{ label: '전체', value: 'all' }];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ postOption, postTitle, contentHtml, files });
  };

  const handleCancel = () => {
    const hasChanges =
      postOption ||
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
        <div>카테고리 선택</div>
        <Select
          options={postType}
          value={postOption}
          onChange={v => setPostOption(v)}
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
          <button className={styles.cancelBtn} onClick={handleCancel}>
            취소
          </button>
          <button className={styles.submitBtn} type='submit'>
            등록
          </button>
        </div>
      </form>
    </div>
  );
}
