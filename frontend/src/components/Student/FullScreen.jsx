import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const FullScreen = () => {
  useEffect(() => {
    const showFullScreenAlert = () => {
      Swal.fire({
        title: 'Enter Full Screen',
        text: 'Click OK to enter full screen mode.',
        icon: 'info',
        showCancelButton: false,
        confirmButtonText: 'OK',
        allowOutsideClick: false 
      }).then((result) => {
        if (result.isConfirmed) {
          enterFullScreen();
        }
      });
    };

    // Show the full screen alert when the component mounts
    showFullScreenAlert();

    // Add event listener for full screen change
    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const handleFullScreenChange = () => {
    // Check if exiting full screen mode
    if (!document.fullscreenElement) {
      // Show confirmation dialog to prevent exiting full screen
      Swal.fire({
        title: 'Exiting Full Screen',
        text: 'Are you sure you want to exit full screen mode?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, exit full screen',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (!result.isConfirmed) {
          // Re-enter full screen if user cancels
          enterFullScreen();
        }
      });
    }
  };

  const enterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
      element.msRequestFullscreen();
    }
  };

  return (
    <div>
      {/* Component content */}
    </div>
  );
};

export default FullScreen;
