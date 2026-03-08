import { useController, useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import styles from './filesInfo.module.scss';
import { FileIcon, FileUpIcon, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const fileSizeFormatter = (size: number) => {
  if (size < 1024) {
    return `${size}B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)}KB`;
  }
  if (size < 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(2)}MB`;
  }
  return `${(size / 1024 / 1024 / 1024).toFixed(2)}GB`;
};

export default function FilesInfo() {
  const { t } = useTranslation('pages');
  const { control } = useFormContext();
  const { field } = useController({ name: 'files', control });

  const onDrop = (acceptedFiles: File[]) => {
    field.onChange([...field.value, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'application/pdf': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        [],
      'image/png': [],
      'image/jpeg': [],
    },
    maxSize: 100 * 1024 * 1024,
  });

  const uploadedFiles: File[] = field.value || [];

  const handleDeleteFile = (index: number) => {
    field.onChange(field.value.filter((_: any, i: number) => i !== index));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('profile.resumePreview.sections.files')}</h2>
      <div {...getRootProps()} className={styles.dropzone}>
        <FileUpIcon className={styles.fileUpIcon} />
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <p className={styles.text}>{t('profile.component.files.dropActive')}</p>
            <p className={styles.description}>
              {t('profile.component.files.formatGuide')}
            </p>
          </>
        ) : (
          <>
            <p className={styles.text}>{t('profile.component.files.dropIdle')}</p>
            <p className={styles.description}>
              {t('profile.component.files.formatGuide')}
            </p>
          </>
        )}
        <h3 className={styles.fileSelectTitle}>{t('profile.component.files.select')}</h3>
      </div>
      <div className={styles.uploadedFiles}>
        {!!uploadedFiles.length && (
          <h3 className={styles.fileSelectTitle}>
            {t('profile.component.files.uploaded')}
          </h3>
        )}
        {uploadedFiles.map((file, index) => (
          <div key={index} className={styles.fileItem}>
            <div className={styles.fileItemLeft}>
              <FileIcon className={styles.fileIcon} />
              <div className={styles.fileInfo}>
                <p className={styles.fileName}>{file.name}</p>
                <p className={styles.fileSize}>
                  {fileSizeFormatter(file.size)}
                </p>
              </div>
            </div>
            <X
              className={styles.fileDeleteIcon}
              onClick={() => handleDeleteFile(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
