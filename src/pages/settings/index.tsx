import React, { useEffect, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store/hooks';
import { englishLevels } from 'constants/variables';
import { 
  useDeleteEducationMutation, 
  useDeleteExperienceMutation, 
  useGetPositionsMutation, 
  useGetSkillsMutation, 
  usePutEducationMutation, 
  usePutExperienceMutation, 
  usePostEducationMutation, 
  usePostExperienceMutation, 
  useUpdateProfileMutation 
} from 'store/api/settingsApi';
import { 
  addEducation, 
  addExperience, 
  changeEducation, 
  changeExperience, 
  deleteEducation, 
  deleteExperience, 
  setEducation, 
  setExperience, 
  setPositions, 
  setSkills 
} from 'store/reducers/settings';
import { useDispatch } from 'react-redux';
import { useGetProfileMutation } from 'store/api/profileApi';
import { setProfile } from 'store/reducers/profile';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'components/ui/button';
import { constants } from 'constants/urls';
import { IEducation, IWorkExperience } from 'types/profile';
import {SelectInput} from './components/Select';
import MultiSelect from './components/MultiSelect';
import { PartStart, Modal, Part, SettingsContainer } from './style';
import { IntegerStep } from './components/Slider';
import { WorkExperience } from './components/WorkExperience';
import { Education } from './components/Education';

function Settings(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileState = useAppSelector((state) => state.profile.profile);
  const settingsState = useAppSelector((state) => state.settings);
  const authState = useAppSelector((state) => state.auth);

  const [getSkillsQuery, skills] = useGetSkillsMutation();
  const [getPositionsQuery, positions] = useGetPositionsMutation();
  const [updateProfileQuery] = useUpdateProfileMutation();
  const [getProfileQuery, profile] = useGetProfileMutation();
  const [postExperienceQuery] = usePostExperienceMutation();
  const [putExperienceQuery] = usePutExperienceMutation();
  const [deleteExperienceQuery] = useDeleteExperienceMutation();
  const [postEducationQuery] = usePostEducationMutation();
  const [putEducationQuery] = usePutEducationMutation();
  const [deleteEducationQuery] = useDeleteEducationMutation();

  const [experienceModal, setExperienceModal] = useState<boolean>(false);
  const [educationModal, setEducationModal] = useState<boolean>(false);

  const [salary, setSalary] = useState<number>(profileState?.desirebleSalaryLevel || 0);
  const [amountOfHours, setAmountOfHours] = useState<number>(profileState?.availableAmountOfHours || 0)
  const [description, setDescription] = useState<string>(profileState?.description || "");
  const [otherExperience, setOtherExperience] = useState<string>(profileState?.otherExperience || "");
  const [category, setCategory] = useState<number | undefined>(profileState?.position?.id)
  const [english, setEnglish] = useState<string>(profileState?.englishLevel || "")
  const [userSkills, setUserSkills] = useState<number[] | []>(profileState?.skills?.map((skill) => skill.id) || []);
  const [message, setMessage] = useState<string>("");
    
  function onEnglishLevelChange(index: number): void{
    const filtered = englishLevels.filter((level) => level.id === index)
    setEnglish(filtered[0].category);
  }  

    function handleChange(): void {
      let errorMessage = "";
      if(!english) errorMessage += `${t('GeneralSettings.mainForm.validateEnglish')}\n`;
      if(!salary) errorMessage += `${t('GeneralSettings.mainForm.validateSalary')}\n`;
      if(!amountOfHours) errorMessage += `${t('GeneralSettings.mainForm.validateAvailableHours')}\n`;
      if(!description) errorMessage += `${t('GeneralSettings.mainForm.validateDescription')}\n`;
      if(!category) errorMessage += `${t('GeneralSettings.mainForm.validatePosition')}\n`;      
      if(!userSkills.length) errorMessage += `${t('GeneralSettings.mainForm.validateSkills')}\n`;
      if(!errorMessage){
        const body = {
          id: profileState?.id,
          englishLevel: english,
          desirebleSalaryLevel: salary,
          availableAmountOfHours: amountOfHours,
          otherExperience,
          description,
          position: category,
          user: authState.user?.id,
          skills: userSkills
      };
      (async function() {
        await updateProfileQuery(body);
      })();
      getProfileQuery({token: authState.token});
      }else{
        setMessage(errorMessage);
      }
    }

    function addExperienceEvent(values: IWorkExperience): void{
      dispatch(addExperience(values));
      postExperienceQuery({...values, profile: profileState?.id});
    }
    function setExperienceEvent(values: IWorkExperience, id: number): void{      
      dispatch(changeExperience({data: values, id}));
      if(values.id) putExperienceQuery({...values, profile: profileState?.id})
    }
    function deleteExperienceEvent( index: number, id?: number): void{
      dispatch(deleteExperience(index));
      if(id) deleteExperienceQuery(id)
    }

    function addEducationEvent(values: IEducation): void{
      dispatch(addEducation(values));
      postEducationQuery({...values, profile: profileState?.id});
    }
    function setEducationEvent(values: IEducation, id: number): void{      
      dispatch(changeEducation({data: values, id}));
      if(values.id) putEducationQuery({...values, profile: profileState?.id})
    }
    function deleteEducationEvent( index: number, id?: number): void{
      dispatch(deleteEducation(index));
      if(id) deleteEducationQuery(id)
    }

  useEffect(() => {    
    if(skills.isSuccess){
      dispatch(setSkills(skills.data));
    }else if(!settingsState.skills) {
        getSkillsQuery(null);
    }
    if(positions.isSuccess){
      dispatch(setPositions(positions.data))
    }else if(!settingsState.positions){
      getPositionsQuery(null);
    }
    if(profile.isSuccess){
      dispatch(setProfile(profile.data));
      dispatch(setExperience(profile.data?.workExperience));
      dispatch(setEducation(profile.data?.educations))
      navigate('/');
    }
  }, [skills.isSuccess, positions.isSuccess, profile.isSuccess, settingsState])

  return (
    <SettingsContainer>
      <h1>{t('GeneralSettings.title')}</h1>
      <div><NavLink to={constants.USER_CONTACTS}><Button>{t('GeneralSettings.mainForm.contactInfo')}</Button></NavLink></div>
        <Part>
          <div>
            <h2>{t('GeneralSettings.mainForm.position')}</h2>
          </div>
          <div>
            <SelectInput position={profileState?.position} onChange={(value) => setCategory(value)} data={settingsState.positions}/>
          </div>
        </Part>
        <Part>
          <div>
            <h2>{t('GeneralSettings.mainForm.skills')}</h2>
          </div>
          <div>
            <MultiSelect handleChange={(values) => setUserSkills(values)} skills={userSkills} data={settingsState.skills}/>
          </div>
        </Part>
        <Part>
          <div>
            <h2>{t('GeneralSettings.mainForm.salary')}</h2>
          </div>
          <div>
            <IntegerStep value = {salary} onChange={(newValue) => setSalary(newValue)}/>
          </div>
        </Part>
        <Part>
          <div>
            <h2>{t('GeneralSettings.mainForm.english')}</h2>
          </div>
          <div>
            <SelectInput position={englishLevels.filter((level) => level.category === profileState?.englishLevel)[0]} 
            onChange={(value) => onEnglishLevelChange(value)} data={englishLevels}/>
          </div>
        </Part>
        <Part>
          <div>
            <h2>{t('GeneralSettings.mainForm.availableHours')}</h2>
          </div>
          <div>
            <IntegerStep value = {amountOfHours} onChange={(newValue) => setAmountOfHours(newValue)} />
          </div>
        </Part>
        <PartStart>
          <div>
            <h2>{t('GeneralSettings.mainForm.workExperience')}</h2>
            <Button theme="#91d5ff" onClick={() => setExperienceModal(true)}>{t('GeneralSettings.mainForm.addWork')}</Button>
          </div>
          <div>
              {settingsState?.experiences?.map((experience, index) => <WorkExperience 
              handleClick={(values) => setExperienceEvent(values, index)} 
              deleteExperience={(id) => id? deleteExperienceEvent(index, id) : deleteExperienceEvent(index)}
              key={JSON.stringify(experience)} data={experience}/>)}
          </div>
        </PartStart> 
        {experienceModal && <Modal> <WorkExperience 
        handleClick={(values) => addExperienceEvent(values)} 
        closeModal={() => setExperienceModal(false)} /></Modal>}
        <PartStart>
          <div>
            <h2>{t('GeneralSettings.mainForm.education')}</h2>
            <Button theme="#91d5ff" onClick={() => setEducationModal(true)}>{t('GeneralSettings.mainForm.addEducation')}</Button>
          </div>
          <div>
             {settingsState?.educations?.map((education, index) => <Education 
             handleClick={(values) => setEducationEvent(values, index)} 
             deleteEducation={(id) => id? deleteEducationEvent(index, id) : deleteEducationEvent(index)}
             key={JSON.stringify(education)} data={education}/>)}
          </div>
        </PartStart>
        {educationModal && <Modal> <Education 
        handleClick={(values) => addEducationEvent(values)}
        closeModal={() => setEducationModal(false)} /></Modal>}
        <PartStart>
          <div>
            <h2>{t('GeneralSettings.mainForm.other')}</h2>
          </div>
          <div>
            <TextArea 
            value={otherExperience}
            onChange={(e) => setOtherExperience(e.target.value)}
            placeholder={t('GeneralSettings.mainForm.typeOther')} 
            style={{width: '30rem', height: '10rem'}}/>
          </div>
        </PartStart>
        <PartStart>
          <div>
            <h2>{t('GeneralSettings.mainForm.description')}</h2>
          </div>
          <div>
            <TextArea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('GeneralSettings.mainForm.typeAboutYourself')} 
            style={{width: '30rem', height: '10rem'}}/>
          </div>
        </PartStart>
        <div>
          {message && message.split('\n').map((sentence, id) => <p style={{color: 'red', margin: '2px'}} key={id}>{sentence}</p>)}
        </div>
        <Button theme="#91d5ff" onClick={() => handleChange()}>{t('GeneralSettings.mainForm.save')}</Button>
    </SettingsContainer>
  )
}

export default Settings;
