import { CustomDivider } from '../common/customDivider/CustomDivider';
import { EtcDots } from './EtcDots';
import { LikeAndComments } from './LikeAndComments';
import { ProfileInfoInPost } from './ProfileInfoInPost';
import { StyledCategory } from './StyledCategory';
import DOMPurify from 'dompurify';
import useDeleteBoardPostLike from '@/lib/apis/mutations/useDeleteBoardPostLike';
import usePostBoardPostLike from '@/lib/apis/mutations/usePostBoardPostLike';
import styles from './detailPostBox.module.scss';
import { useEffect, useMemo, useState } from 'react';

export interface DetailPostBoxProps {
  postId: number;
  isMine?: boolean;
  onDeleted?: () => void;
  category: string;
  title: string;
  tags: string[];
  userImgUrl: string;
  userName: string;
  isVerifiedUser: boolean;
  country: string;
  postedAt: Date;
  content: string;
  isLiked: boolean;
  numOfLiked: number;
  numOfComment: number;
}

export const DetailPostBox = ({
  postId,
  isMine = false,
  onDeleted,
  category,
  title,
  tags,
  userImgUrl,
  userName,
  isVerifiedUser,
  country,
  postedAt,
  content,
  isLiked,
  numOfLiked,
  numOfComment,
}: DetailPostBoxProps) => {
  const { mutate: postBoardPostLike, isPending: isLikePending } =
    usePostBoardPostLike();
  const { mutate: deleteBoardPostLike, isPending: isUnlikePending } =
    useDeleteBoardPostLike();
  const [likedState, setLikedState] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(numOfLiked);
  const sanitizedContent = useMemo(() => DOMPurify.sanitize(content), [content]);

  useEffect(() => {
    setLikedState(isLiked);
    setLikeCountState(numOfLiked);
  }, [isLiked, numOfLiked]);

  const handleLike = () => {
    if (isLikePending || isUnlikePending) return;

    const onSuccess = (response: {
      data: { liked: boolean; likeCount: number };
    }) => {
      setLikedState(response.data.liked);
      setLikeCountState(response.data.likeCount);
    };
    const onError = (error: unknown) => {
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
          '좋아요 처리에 실패했습니다. 다시 시도해주세요.',
      );
    };

    if (likedState) {
      deleteBoardPostLike(postId, { onSuccess, onError });
      return;
    }

    postBoardPostLike(postId, { onSuccess, onError });
  };

  return (
    <div className={styles.container}>
      <div className={styles.topArea}>
        <StyledCategory category={category} />
        <EtcDots postId={postId} isMine={isMine} onDeleted={onDeleted} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.tags}>
        {tags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <ProfileInfoInPost
        imageUrl={userImgUrl}
        isVerified={isVerifiedUser}
        name={userName}
        nationality={country}
        postedAt={postedAt}
      />
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
      <CustomDivider />
      <LikeAndComments
        isLiked={likedState}
        onCommentClick={() => console.log('댓글 눌림')}
        onLikeClick={handleLike}
        numOfComment={numOfComment}
        numOfLike={likeCountState}
      />
    </div>
  );
};
