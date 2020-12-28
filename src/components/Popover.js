import React from 'react';
import '../Assets/style/Popover.css';

export default function Popover({children, isOpen}) {
  const [showPopover, setShowPopover] = React.useState(false);

  React.useEffect(() => {
    setShowPopover(isOpen);
    return () => setShowPopover(false);
  }, [isOpen]);

  const popoverContainer = {
    bottom: '0',
    left: '50%',
    transform: 'translate(-50%, calc(100% + 6.6px))',
  };

  const popoverWrapper = {
    /* Border */
    minWidth: '100px',
    width: 'auto',
    height: 'auto',
    backgroundColor: 'white',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '0.5em',

    /* Used to position the arrow */
    position: 'relative',
  };

  const triangleOuter = {
    width: '100%',
    paddingBottom: '70.921985816%',
    overflow: 'hidden',
    position: 'relative',
    border: '0',
    backgroundColor: 'transparent',
  };

  const triangleInner = {
    borderLeft: '1px solid rgba(0, 0, 0, 0.3)',
    borderTop: '1px solid rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    transformOrigin: '0 100%',
    transform: 'rotate(45deg)',
  };

  const triangleWrapper = {
    position: 'absolute',
    width: '16px',
    height: '16px',
    top: '0px',
    left: '50%',
    transform: 'translate(-50%, -74.5%)',
    zIndex: '20',
    borderTop: '1.15px solid rgb(255, 255, 255)',
  };

  return showPopover ? (
    <div className="position-absolute" style={popoverContainer}>
      <div style={popoverWrapper}>
        <div style={triangleWrapper}>
          <div style={triangleOuter}>
            <div style={triangleInner}>&nbsp;</div>
          </div>
        </div>
        {children}
      </div>
    </div>
  ) : null;
}
