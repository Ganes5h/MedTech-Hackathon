import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      style={{
        backgroundColor: '#2C3E50',
        color: '#ECF0F1',
        padding: '20px 0',
        textAlign: 'center'
      }}
    >
      <Container>
        <Typography variant="body1">&copy; 2024 Clinical Trials Platform</Typography>
        <Typography variant="body2">All rights reserved.</Typography>
      </Container>
    </Box>
  );
};

export default Footer;
