import {
  Bold,
  Heading2,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Underline as UnderlineIcon,
  Unlink,
} from 'lucide-react';
import { EditorContent, useEditor } from '@tiptap/react';

import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import styles from './tiptapEditor.module.scss';
import { useEffect } from 'react';

interface TipTapEditorProps {
  value: string; // HTML string
  onChange: (html: string) => void;
  placeholder?: string;
  minHeightPx?: number;
}

export default function TipTapEditor({
  value,
  onChange,
  placeholder = '여러분의 생각을 자유롭게 공유해주세요.',
  minHeightPx = 220,
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: styles.isEmpty,
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: styles.prose,
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current) {
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  const setLink = () => {
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('링크 URL을 입력하세요', prev ?? '');
    if (url === null) return;

    if (url.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url.trim() })
      .run();
  };

  const unsetLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <button
          type='button'
          className={`${styles.toolBtn} ${editor.isActive('bold') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label='Bold'
        >
          <Bold size={16} />
        </button>

        <button
          type='button'
          className={`${styles.toolBtn} ${editor.isActive('italic') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label='Italic'
        >
          <Italic size={16} />
        </button>

        <button
          type='button'
          className={`${styles.toolBtn} ${editor.isActive('underline') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          aria-label='Underline'
        >
          <UnderlineIcon size={16} />
        </button>

        <span className={styles.divider} />

        <button
          type='button'
          className={`${styles.toolBtn} ${editor.isActive('heading', { level: 2 }) ? styles.active : ''}`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-label='Heading'
        >
          <Heading2 size={16} />
        </button>

        <button
          type='button'
          className={`${styles.toolBtn} ${editor.isActive('blockquote') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label='Quote'
        >
          <Quote size={16} />
        </button>

        <span className={styles.divider} />

        <button
          type='button'
          className={`${styles.toolBtn} ${editor.isActive('bulletList') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label='Bullet list'
        >
          <List size={16} />
        </button>

        <button
          type='button'
          className={`${styles.toolBtn} ${editor.isActive('orderedList') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label='Ordered list'
        >
          <ListOrdered size={16} />
        </button>

        <span className={styles.divider} />

        <button
          type='button'
          className={`${styles.toolBtn} ${editor.isActive('link') ? styles.active : ''}`}
          onClick={setLink}
          aria-label='Add link'
        >
          <LinkIcon size={16} />
        </button>

        <button
          type='button'
          className={styles.toolBtn}
          onClick={unsetLink}
          aria-label='Remove link'
          disabled={!editor.isActive('link')}
        >
          <Unlink size={16} />
        </button>
      </div>

      <div
        className={styles.editorArea}
        style={{ minHeight: `${minHeightPx}px` }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
