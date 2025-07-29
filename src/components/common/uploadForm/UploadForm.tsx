import { useRef, useState } from 'react';

import { Upload } from 'lucide-react';
import styles from './uploadForm.module.scss';

const UploadForm = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('선택된 파일: ', file);
      setSelectedFile(file);
      // TODO: 업로드 로직 추후에 추가
    }
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <Upload color='#9333ea' />
      <div className={styles.title}>파일을 선택하세요</div>
      <div className={styles.subTitle}>PDF, JPG, PNG 파일만 업로드 가능</div>
      <input
        type='file'
        ref={inputRef}
        onChange={handleFileChange}
        accept='.pdf,.jpg,.jpeg,.png'
        style={{ display: 'none' }}
      />
      {selectedFile && (
        <div className={styles.fileInfo}>
          <p>
            <strong>파일명:</strong> {selectedFile.name}
          </p>
          <p>
            <strong>크기:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
          </p>
          <p>
            <strong>타입:</strong> {selectedFile.type}
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
