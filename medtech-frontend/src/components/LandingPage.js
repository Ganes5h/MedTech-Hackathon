import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

const headingVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } }
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5, duration: 1.2, ease: "easeOut" } }
};

const buttonVariants = {
  hover: { scale: 1.1, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", transition: { yoyo: Infinity, duration: 0.3 } }
};

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

const solutionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ backgroundColor: '#F4F6F8', padding: '80px 0', textAlign: 'center' }}
      >
        <Container>
          <motion.div variants={headingVariants}>
            <Typography variant="h2" gutterBottom style={{ fontWeight: 700, color: '#333', marginBottom: '20px' }}>
              Clinical Trial Recruitment and Management Platform
            </Typography>
          </motion.div>
          
          <motion.div variants={textVariants} style={{ marginTop: '20px' }}>
            <Typography variant="h6" style={{ color: '#555', maxWidth: '700px', margin: '0 auto' }}>
              Efficient Recruitment, Enhanced Diversity, and Improved Management
            </Typography>
          </motion.div>

          <motion.div
            variants={textVariants}
            style={{ marginTop: '40px' }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={motion.div}
              variants={buttonVariants}
              style={{ padding: '12px 24px', borderRadius: '8px' }}
            >
              Get Started
            </Button>
          </motion.div>
        </Container>
      </motion.div>

      <Container>
        <Grid container spacing={4} style={{ marginTop: '80px' }}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={featureVariants}
            >
              <Paper elevation={8} style={{ padding: '40px', textAlign: 'center', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h5" style={{ fontWeight: 600, color: '#222' }}>Efficient Recruitment</Typography>
                <Typography variant="body1" style={{ marginTop: '15px', color: '#666' }}>
                  Streamline your recruitment processes with our intuitive platform.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={featureVariants}
            >
              <Paper elevation={8} style={{ padding: '40px', textAlign: 'center', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h5" style={{ fontWeight: 600, color: '#222' }}>Enhanced Diversity</Typography>
                <Typography variant="body1" style={{ marginTop: '15px', color: '#666' }}>
                  Reach a diverse pool of candidates with our targeted tools and features.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={featureVariants}
            >
              <Paper elevation={8} style={{ padding: '40px', textAlign: 'center', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h5" style={{ fontWeight: 600, color: '#222' }}>Improved Management</Typography>
                <Typography variant="body1" style={{ marginTop: '15px', color: '#666' }}>
                  Manage your trials with ease using our advanced management features.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={solutionVariants}
        style={{ backgroundColor: '#ffffff', padding: '80px 0', textAlign: 'center' }}
      >
        <Container>
          <Typography variant="h4" style={{ fontWeight: 700, color: '#222', marginBottom: '40px' }}>
            Our Solution
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '30px', textAlign: 'center', borderRadius: '10px', backgroundColor: '#f5f5f5', boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h6" style={{ fontWeight: 600, color: '#333' }}>Automated Matching System</Typography>
                <Typography variant="body1" style={{ marginTop: '15px', color: '#666' }}>
                  AI-powered system pairs eligible participants with relevant trials based on medical history, demographics, and preferences.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '30px', textAlign: 'center', borderRadius: '10px', backgroundColor: '#f5f5f5', boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h6" style={{ fontWeight: 600, color: '#333' }}>Targeted Outreach Campaigns</Typography>
                <Typography variant="body1" style={{ marginTop: '15px', color: '#666' }}>
                  Digital marketing and community engagement to reach underrepresented populations.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '30px', textAlign: 'center', borderRadius: '10px', backgroundColor: '#f5f5f5', boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h6" style={{ fontWeight: 600, color: '#333' }}>Centralized Dashboard</Typography>
                <Typography variant="body1" style={{ marginTop: '15px', color: '#666' }}>
                  Manages participant data, applications, and communication efficiently.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Typography variant="body1" style={{ marginTop: '40px', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
            <strong>Statistics:</strong> According to industry reports, AI-driven recruitment can reduce participant enrollment times by up to 50%.
          </Typography>
          <Typography variant="body1" style={{ marginTop: '20px', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
            <strong>USP:</strong> Our platform enhances recruitment speed, diversity, and management efficiency in clinical trials.
          </Typography>
        </Container>
      </motion.div>

      <Footer />
    </div>
  );
};

export default LandingPage;
