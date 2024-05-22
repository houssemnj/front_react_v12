import React, { useState, forwardRef, useImperativeHandle , useRef , useEffect} from 'react';
import axios from 'axios';
import FormData from "form-data";
import "./Appp.css";







const DockerizeForm = React.forwardRef(({ projectUrl,framework,containerPort,deploymentEnvironment,gitService }, ref) => {
  const [response, setResponse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  


 useEffect(() => {
    const eventSource = new EventSource('/dockerize');
    eventSource.onmessage = function(event) {
        const result = JSON.parse(event.data);
        console.log(result);
        setResponse(JSON.stringify(result));
    };

    return () => {
        eventSource.close();
    };
 }, []);

  const handleSubmit = async (event) => {
    //event.preventDefault();
    setIsSubmitting(true);
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    let data = new FormData();
    data.append('project_url', projectUrl);
    data.append('framework', framework);
    data.append('container_port', containerPort);
    data.append('deployment_environment', deploymentEnvironment);
    data.append('git_service', gitService);


    let config = {
      method: 'post',
      url: `${apiUrl}dockerize`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    };

    try {
      const response = await axios(config);
      setResponse(JSON.stringify(response.data));
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useImperativeHandle(ref, () => ({
    handleSubmit
  }));

  return (
    <header className='repo'>
        <form onSubmit={handleSubmit}>
            {/* Form inputs and submit button here */}
        </form>
        
        {isSubmitting ? (
            <h4><pre>Dockerize in progress...</pre></h4>
        ) : (
            response && <h4><pre>{response}</pre></h4>
        )}
        
    </header>
);
});


export default DockerizeForm ;
