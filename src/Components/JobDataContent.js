import React from "react";
import InnerHTMLReader from "./InnerHTMLReader";
import "./JobDataContent.css"


function JobDataContent({jobData, handleRemoveJob, close}) {

    return (
        <>
            <div className="delete-pop-up-overlay"></div>
            <div className="saved-job-card-container">
                <div className="saved-close-btn" onClick={() => close()}>
                    x
                </div>
                <div className="saved-job-card">
                    <h1 className="saved-job-title">{jobData.name}</h1>
                    <p className="saved-company">{jobData.company.name}</p>
                    <div className="saved-home-break"></div>
                    <div className="saved-other-attributes">
                        <p className="saved-location">{jobData.locations[0].name}</p>
                    </div>
                    <div className="saved-description-box">
                        {/* <p>{job.description}</p> */}
                        <InnerHTMLReader value={jobData.contents} />
                    </div>
                </div>
                <div className="saved-button-container">
                    <button className="saved-apply-btn" onClick={() => window.open(jobData.refs.landing_page, '_blank')}>Apply</button>
                    <button className="saved-remove-btn" onClick={() => handleRemoveJob(jobData.job_id)}>Remove</button>
                </div>
            </div>
        </>
    )
  
}

export default JobDataContent;  