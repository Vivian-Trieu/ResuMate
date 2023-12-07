import React, { useState, useEffect } from 'react';
import Amplify, { API } from 'aws-amplify';

function FetchResumeData (props) {
    const user_id = window.sessionStorage.getItem('user_id');
  

    useEffect(() => {
      const fetchResumeData = async () => {
        try {
            const apiResponse = await API.post('Resumes', '/get', {
                contentType: "application/json",
                body: { user_id: user_id },
            });
            
    
            if (apiResponse && apiResponse.length > 0) {
                props.setResumeData(apiResponse[apiResponse.length - 1]);     
                console.log('set', apiResponse[apiResponse.length - 1]);   
                // console.log('get', resumeData);
            }            
    
        } catch (error) {
            console.error('Error fetching resume info:', error);
        }
      }
      fetchResumeData();
    }, [])
}

export default FetchResumeData;