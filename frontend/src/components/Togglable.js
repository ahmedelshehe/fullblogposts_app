import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Grid } from '@mui/material';
// eslint-disable-next-line react/display-name
const Togglable = forwardRef(({ viewButtonLabel, hideButtonLabel, defaultVisibility, children }, refs) => {
  const [visible, setVisible] = useState(defaultVisibility ? defaultVisibility : false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Grid container spacing={0} direction="column" margin={2}>
      <Container style={hideWhenVisible}>
        <Button id="viewToggle" onClick={toggleVisibility}>
          {viewButtonLabel}
        </Button>
      </Container>
      <Container style={showWhenVisible} className="togglableContent">
        {children}
        <Button style={{ textAlign: 'center' }} id="hideToggle" onClick={toggleVisibility}>
          {hideButtonLabel ? hideButtonLabel : 'cancel'}
        </Button>
      </Container>
    </Grid>
  );
});
Togglable.propTypes = {
  viewButtonLabel: PropTypes.string.isRequired,
};
export default Togglable;
