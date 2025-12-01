
import { education, experience, achievements } from '../data/resumeData.json';
import React from "react";
import TimelineSection from './TimelineSection';

const Experiences = () => {

    return (
        <div className="homepage">
            <TimelineSection education={education} experience={experience} achievements={achievements} />
        </div>
    );
};
export default Experiences;
