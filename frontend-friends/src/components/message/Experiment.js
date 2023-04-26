import React, { useState } from 'react';
import Snackbar from '@mui/material';





function Experiment(props) {
    const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (showSnackbar) {
      setTimeout(() => {
        setShowSnackbar(false);
      }, 4000);
    }
  }, [showSnackbar]);
  
    return (
      <div>
        {showSnackbar && (
          <Snackbar open={showSnackbar} onClose={handleSnackbarClose}>
            <MuiAlert severity="success">Snackbar message</MuiAlert>
          </Snackbar>
        )}
      </div>
    );
  }