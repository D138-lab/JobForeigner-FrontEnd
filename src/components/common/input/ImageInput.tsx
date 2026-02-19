import { Image as ImageIcon, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

import styles from './imageInput.module.scss';

type PreviewItem = {
  file: File;
  url: string;
};

interface ImageInputProps {
  maxFiles?: number;
  onChangeFiles?: (files: File[]) => void;
}

export const ImageInput = ({
  maxFiles = 5,
  onChangeFiles,
}: ImageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<PreviewItem[]>([]);

  const helpText = useMemo(() => `SVG, PNG, JPG, or GIF (max. 800x400px)`, []);

  const openFilePicker = () => inputRef.current?.click();

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const incoming = Array.from(fileList).filter(f =>
      f.type.startsWith('image/'),
    );
    if (incoming.length === 0) return;

    setPreviews(prev => {
      const remaining = Math.max(0, maxFiles - prev.length);
      const sliced = incoming.slice(0, remaining);

      const next = [
        ...prev,
        ...sliced.map(file => ({
          file,
          url: URL.createObjectURL(file),
        })),
      ];

      onChangeFiles?.(next.map(p => p.file));
      return next;
    });
  };

  const removeAt = (idx: number) => {
    setPreviews(prev => {
      const target = prev[idx];
      if (target) URL.revokeObjectURL(target.url);

      const next = prev.filter((_, i) => i !== idx);
      onChangeFiles?.(next.map(p => p.file));
      return next;
    });
  };

  // Drag handlers
  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>Attachments</div>

      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
        onClick={openFilePicker}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        role='button'
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') openFilePicker();
        }}
      >
        <div className={styles.iconWrap}>
          <ImageIcon size={18} />
        </div>

        <div className={styles.text}>
          <div className={styles.mainText}>클릭하여 업로드하세요</div>
          <div className={styles.subText}>혹은 드래그하여 업로드하세요</div>
          <div className={styles.helpText}>{helpText}</div>
        </div>

        <input
          ref={inputRef}
          className={styles.hiddenInput}
          type='file'
          accept='image/*'
          multiple
          onChange={e => addFiles(e.target.files)}
        />
      </div>

      {previews.length > 0 && (
        <div className={styles.previewRow}>
          {previews.map((p, idx) => (
            <div key={`${p.file.name}-${idx}`} className={styles.thumb}>
              <img className={styles.thumbImg} src={p.url} alt={p.file.name} />
              <button
                type='button'
                className={styles.removeBtn}
                onClick={e => {
                  e.stopPropagation();
                  removeAt(idx);
                }}
                aria-label='remove'
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
