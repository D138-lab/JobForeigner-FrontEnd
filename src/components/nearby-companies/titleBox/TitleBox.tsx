import styled from './titleBox.module.scss';

export const TitleBox = () => {
  return (
    <div className={styled.container}>
      <div className={styled.title}>주변 기업 찾기</div>
      <div className={styled.content}>
        내 주변의 외국인 친화적인 기업을 찾아보세요.
      </div>
    </div>
  );
};
