import { ProfileInfoInPost, ProfileInfoInPostProps } from './ProfileInfoInPost';

import { BriefPost } from './BriefPost';
import { CustomDivider } from '../common/customDivider/CustomDivider';
import { EtcDots } from './EtcDots';
import { LikeAndComments } from './LikeAndComments';
import usePostBoardPostLike from '@/lib/apis/mutations/usePostBoardPostLike';
import styles from './postBox.module.scss';
import { useEffect, useState } from 'react';

export interface PostBoxProps extends ProfileInfoInPostProps {
  id: number;
  memberId: number;
  currentMemberId?: number;
  category: string;
  tags: string[];
  title: string;
  content: string;
  numOfLike: number;
  numOfComment: number;
  isLiked: boolean;
  onClick?: () => void;
}

export const PostBox = ({
  id,
  memberId,
  currentMemberId,
  category,
  content,
  imageUrl,
  isVerified,
  name,
  nationality,
  postedAt,
  tags,
  title,
  isLiked,
  numOfComment,
  numOfLike,
  onClick,
}: PostBoxProps) => {
  const { mutate: postBoardPostLike, isPending: isLikePending } =
    usePostBoardPostLike();
  const [likedState, setLikedState] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(numOfLike);

  useEffect(() => {
    setLikedState(isLiked);
    setLikeCountState(numOfLike);
  }, [isLiked, numOfLike]);

  const isMine =
    typeof currentMemberId === 'number' &&
    memberId === currentMemberId;

  const handleLike = () => {
    if (isLikePending) return;

    postBoardPostLike(id, {
      onSuccess: response => {
        setLikedState(response.data.liked);
        setLikeCountState(response.data.likeCount);
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
            '좋아요 처리에 실패했습니다. 다시 시도해주세요.',
        );
      },
    });
  };

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.topArea}>
        <ProfileInfoInPost
          imageUrl={imageUrl}
          isVerified={isVerified}
          name={name}
          nationality={nationality}
          postedAt={postedAt}
        />
        <div onClick={e => e.stopPropagation()}>
          <EtcDots postId={id} isMine={isMine} />
        </div>
      </div>
      <div className={styles.middleArea}>
        <BriefPost
          category={category}
          title={title}
          content={content}
          tags={tags}
        />
      </div>
      <CustomDivider />
      <div className={styles.bottomArea}>
        <div onClick={e => e.stopPropagation()}>
          <LikeAndComments
            onLikeClick={handleLike}
            onCommentClick={() => console.log('댓글 눌림')}
            isLiked={likedState}
            numOfComment={numOfComment}
            numOfLike={likeCountState}
          />
        </div>
      </div>
    </div>
  );
};
