import React, { useState } from 'react';
import { Button } from 'antd';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import { useTranslation } from 'react-i18next';
import {SelectInput} from './components/Select';
import MultiSelect from './components/MultiSelect';
import { PartStart, Modal, Part, SettingsContainer } from './style';
import { IntegerStep } from './components/Slider';
import { WorkExperience } from './components/WorkExperience';
import { Education } from './components/Education';

function Settings(): JSX.Element {

    const [experienceModal, setExperienceModal] = useState<boolean>(false);
    const [educationModal, setEducationModal] = useState<boolean>(false);
    const { t } = useTranslation();
    const categories = ['React', 'Redux', 'NestJs', 'Flutter', 'Rest API']
    const skills = ['React', 'Redux', 'NestJs', 'Flutter', 'Rest API']
    const english = ['Elementary', 'Pre-Intermediate', 'Intermediate', 'Upper-Intermediate', 'Advanced']
    const workExperience = {
      company: 'Zenbit',
      position: 'string;',
      start: moment(Date.now()),
      end: moment(Date.now()),
      description: 'Date;',
    }
    const education = {
      establishment: 'KSTU',
      level: 'bachelour',
      start: moment(Date.now()),
      end: moment(Date.now())
    }
  
  return (
    <SettingsContainer>
      <h1>{t('GeneralSettings.title')}</h1>
        <Part>
          <div>
            <h2>{t('GeneralSettings.mainForm.position')}</h2>
          </div>
          <div>
            <SelectInput data={categories}/>
          </div>
        </Part>
        <Part>
          <div>
            <h2>{t('GeneralSettings.mainForm.skills')}</h2>
          </div>
          <div>
            <MultiSelect data={skills}/>
          </div>
        </Part>
        <Part>
          <div>
            <h2>{t('GeneralSettings.mainForm.salary')}</h2>
          </div>
          <div>
            <IntegerStep/>
          </div>
        </Part>
        <Part>
          <div>
            <h2>{t('GeneralSettings.mainForm.english')}</h2>
          </div>
          <div>
            <SelectInput data={english}/>
          </div>
        </Part>
        <Part>
          <div>
            <h2>{t('GeneralSettings.mainForm.availableHours')}</h2>
          </div>
          <div>
            <IntegerStep/>
          </div>
        </Part>
        <PartStart>
          <div>
            <h2>{t('GeneralSettings.mainForm.workExperience')}</h2>
            <Button onClick={() => setExperienceModal(true)}>{t('GeneralSettings.mainForm.addWork')}</Button>
          </div>
          <div>
              <WorkExperience data={workExperience}/>
          </div>
        </PartStart>
        {experienceModal && <Modal> <WorkExperience closeModal={() => setExperienceModal(false)} /></Modal>}
        <PartStart>
          <div>
            <h2>{t('GeneralSettings.mainForm.education')}</h2>
            <Button onClick={() => setEducationModal(true)}>{t('GeneralSettings.mainForm.addEducation')}</Button>
          </div>
          <div>
             <Education data={education}/>
          </div>
        </PartStart>
        {educationModal && <Modal> <Education closeModal={() => setEducationModal(false)} /></Modal>}
        <PartStart>
          <div>
            <h2>{t('GeneralSettings.mainForm.other')}</h2>
          </div>
          <div>
            <TextArea placeholder={t('GeneralSettings.mainForm.typeOther')} style={{width: '30rem', height: '10rem'}}/>
          </div>
        </PartStart>
        <PartStart>
          <div>
            <h2>{t('GeneralSettings.mainForm.description')}</h2>
          </div>
          <div>
            <TextArea placeholder={t('GeneralSettings.mainForm.typeAboutYourself')} style={{width: '30rem', height: '10rem'}}/>
          </div>
        </PartStart>
    </SettingsContainer>
  )
}

export default Settings;
