import React, { useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import { getData } from '../../utils/request'

function MyComponent() {
  const [caseData, setCaseData] = useState({});
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    // Make API call to get case data
    // Assuming the API returns an object with a "status" property
    // that indicates whether the case has been updated
    const getCaseData = async () => {
      const response = await (getData('/case'))
      setShowSnackbar(true)
    };
    getCaseData();
  }, []);

  useEffect(() => {
    if (caseData.status === 'updated') {
      setShowSnackbar(true);
    }
  }, [caseData]);

  const handleClose = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      {/* Render your component here */}
      <Snackbar open={showSnackbar} onClose={handleClose} message="Case updated!" />
    </>
  );
}

export default MyComponent;

