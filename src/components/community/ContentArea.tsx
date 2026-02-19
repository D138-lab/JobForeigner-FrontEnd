import { AnnouncementAndEvent } from './AnnouncementAndEvent';
import { CustomDivider } from '../common/customDivider/CustomDivider';
import { PopularPosts } from './PopularPosts';
import { PostBox } from './PostBox';
import { PostSortBy } from './PostSortBy';
import { SelectPostType } from './SelectPostType';
import { TopMember } from './TopMember';
import { postBoxDummyData } from '@/lib/constants/dummyTestDatas';
import { postSortOption } from '@/pages/community/Page';
import styles from './contentArea.module.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
  sortOption: postSortOption;
  setSortOption: (option: postSortOption) => void;
  postType: string;
  setPostType: (type: string) => void;
}

export const ContentArea = ({
  sortOption,
  setSortOption,
  postType,
  setPostType,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <PostSortBy
          sortOption={sortOption}
          onClick={(option: postSortOption) => setSortOption(option)}
        />
        <CustomDivider />
        <SelectPostType postType={postType} onClick={setPostType} />
        <div className={styles.posts}>
          {postBoxDummyData.map(data => (
            <PostBox
              {...data}
              onClick={() =>
                navigate(`/community/${data.id}`, { state: { id: data.id } })
              }
            />
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <PopularPosts titles={postBoxDummyData.map(post => post.title)} />
        <TopMember
          people={postBoxDummyData.slice(0, 3).map(post => ({
            name: post.name,
            profileImgUrl: post.imageUrl,
          }))}
        />
        <AnnouncementAndEvent />
      </div>
    </div>
  );
};
