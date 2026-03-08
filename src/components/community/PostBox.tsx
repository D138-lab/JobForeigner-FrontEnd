import { ProfileInfoInPost, ProfileInfoInPostProps } from './ProfileInfoInPost';

import { BriefPost } from './BriefPost';
import { CustomDivider } from '../common/customDivider/CustomDivider';
import { EtcDots } from './EtcDots';
import { LikeAndComments } from './LikeAndComments';
import useDeleteBoardPostLike from '@/lib/apis/mutations/useDeleteBoardPostLike';
import usePostBoardPostLike from '@/lib/apis/mutations/usePostBoardPostLike';
import styles from './postBox.module.scss';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('common');
  const { mutate: postBoardPostLike, isPending: isLikePending } =
    usePostBoardPostLike();
  const { mutate: deleteBoardPostLike, isPending: isUnlikePending } =
    useDeleteBoardPostLike();
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
          t('communityPage.postAction.likeFail'),
      );
    };

    if (likedState) {
      deleteBoardPostLike(id, { onSuccess, onError });
      return;
    }

    postBoardPostLike(id, { onSuccess, onError });
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
