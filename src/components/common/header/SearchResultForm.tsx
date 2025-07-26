import styles from './searchResultForm.module.scss';
import { useNavigate } from 'react-router-dom';

interface JobPost {
  id: number;
  title: string;
  companyName: string;
  description: string;
  location: string;
  employment_type: string;
  salary: string;
  career: string;
  published: string;
  expiryAt: string;
  grade: string;
  isScrapped: boolean;
  imageList: string[];
}

interface ContentProp {
  companyId: number;
  companyName: string;
  companyDescription: string;
  companyAddress: string;
  employeeCount: number;
  jobPostList: JobPost[];
}

interface Props {
  content: ContentProp[];
}

const SearchResultForm = ({ content }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {content.map(ele => (
        <div
          key={ele.companyId}
          className={styles.companyCard}
          onClick={() =>
            navigate(`/companies/${ele.companyId}`, {
              state: ele.companyId,
            })
          }
        >
          <p>{ele.companyName}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResultForm;
