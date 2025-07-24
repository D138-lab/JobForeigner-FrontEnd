import Input from '@/components/common/input/Input';
import styles from './skillsInfo.module.scss';
import Button from '@/components/common/button/Button';
import SkillTag from './SkillTag';
import { useFormContext } from 'react-hook-form';
import { useRef, useState } from 'react';

export default function SkillsInfo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { watch, setValue } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const skills = watch('skills') || [];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddSkill = () => {
    if (!inputValue.trim()) return;

    if (
      skills.some(
        (s: { skillName: string }) => s.skillName === inputValue.trim(),
      )
    ) {
      setInputValue('');
      return;
    }

    setValue('skills', [...skills, { skillName: inputValue.trim() }]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setValue('skills', newSkills);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>업무 및 스킬</h2>
      <div className={styles.content}>
        <Input
          ref={inputRef}
          placeholder='보유한 스킬을 입력해주세요'
          name='skills'
          onChange={onChange}
          value={inputValue}
        />
        <Button type='button' size='medium' onClick={handleAddSkill}>
          추가
        </Button>
      </div>
      <div className={styles.skillsList}>
        {skills.map((skill: { skillName: string }, index: number) => (
          <SkillTag
            key={skill.skillName}
            handleRemoveSkill={() => handleRemoveSkill(index)}
          >
            {skill.skillName}
          </SkillTag>
        ))}
      </div>
    </div>
  );
}
