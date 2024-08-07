"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Link as MuiLink,
  Avatar,
  Paper,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Fade,
  Grow,
  Slide,
  Zoom
} from '@mui/material';
import Link from 'next/link';
import styles from './instructors.module.css';
import { PublicNavbar } from '../page';

const AnimatedBox = ({ children, ...props }) => (
  <Fade in={true} timeout={1000}>
    <Box {...props}>{children}</Box>
  </Fade>
);

const AnimatedTypography = ({ children, ...props }) => (
  <Grow in={true} timeout={1000}>
    <Typography {...props}>{children}</Typography>
  </Grow>
);

const AnimatedButton = ({ children, ...props }) => (
  <Zoom in={true} timeout={1000}>
    <Button {...props}>{children}</Button>
  </Zoom>
);

const AnimatedGrid = ({ children, ...props }) => (
  <Slide direction="up" in={true} timeout={1000}>
    <Grid {...props}>{children}</Grid>
  </Slide>
);

const AnimatedAvatar = ({ children, ...props }) => (
  <Fade in={true} timeout={1000}>
    <Avatar {...props}>{children}</Avatar>
  </Fade>
);

const AnimatedAppBar = ({ children, ...props }) => (
  <Slide direction="down" in={true} timeout={1000}>
    <AppBar {...props}>{children}</AppBar>
  </Slide>
);

const AnimatedToolbar = ({ children, ...props }) => (
  <Slide direction="down" in={true} timeout={1000}>
    <Toolbar {...props}>{children}</Toolbar>
  </Slide>
);

const AnimatedPaper = ({ children, ...props }) => (
  <Fade in={true} timeout={1000}>
    <Paper {...props}>{children}</Paper>
  </Fade>
);

const AnimatedCard = ({ children, ...props }) => (
  <Grow in={true} timeout={1000}>
    <Box {...props} className={`${props.className} ${styles.card}`}>
      {children}
    </Box>
  </Grow>
);

const AnimatedCardMedia = ({ ...props }) => (
  <Zoom in={true} timeout={1000}>
    <Box {...props} component="img" />
  </Zoom>
);

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      className={styles.tabPanel}
    >
      {value === index && (
        <Box p={3} className={styles.tabContent}>
          {children}
        </Box>
      )}
    </div>
  );
};

const InstructorPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AnimatedBox className={styles.pageContainer}>
      <PublicNavbar />

      <Box className={styles.hero}>
        <Box className={styles.heroContent}>
          <AnimatedTypography variant="h2" className={styles.heroTitle}>
            Come teach with us
          </AnimatedTypography>
          <AnimatedTypography variant="h5" className={styles.heroSubtitle}>
            Become an instructor and change lives — including your own
          </AnimatedTypography>
          <AnimatedButton href="/auth/signup" variant="contained" className={styles.heroButton}>
            Get started
          </AnimatedButton>
        </Box>
        <Box className={styles.heroImageContainer}>
          <img src="/images/instructor_hero.webp" alt="Instructor Hero" className={styles.heroImage} />
        </Box>
      </Box>

      <Box className={styles.section}>
        <AnimatedTypography variant="h4" align="center" gutterBottom>
          So many reasons to start
        </AnimatedTypography>
        <AnimatedGrid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <AnimatedPaper className={styles.card}>
              <AnimatedCardMedia src="/images/teachyourway.webp" alt="Teach your way" className={styles.cardImage} />
              <Typography variant="h6">Teach your way</Typography>
              <Typography variant="body2">
                Publish the course you want, in the way you want, and always have control of your own content.
              </Typography>
            </AnimatedPaper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <AnimatedPaper className={styles.card}>
              <AnimatedCardMedia src="/images/inspirelearners.webp" alt="Inspire learners" className={styles.cardImage} />
              <Typography variant="h6">Inspire learners</Typography>
              <Typography variant="body2">
                Teach what you know and help learners explore their interests, gain new skills, and advance their careers.
              </Typography>
            </AnimatedPaper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <AnimatedPaper className={styles.card}>
              <AnimatedCardMedia src="/images/getrewarded.webp" alt="Get rewarded" className={styles.cardImage} />
              <Typography variant="h6">Get rewarded</Typography>
              <Typography variant="body2">
                Expand your professional network, build your expertise, and earn money on each paid enrollment.
              </Typography>
            </AnimatedPaper>
          </Grid>
        </AnimatedGrid>
      </Box>

      <Box className={styles.statsSection}>
        <AnimatedGrid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={2}>
            <AnimatedTypography variant="h4">70M</AnimatedTypography>
            <Typography variant="body2">Students</Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <AnimatedTypography variant="h4">74+</AnimatedTypography>
            <Typography variant="body2">Languages</Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <AnimatedTypography variant="h4">970M</AnimatedTypography>
            <Typography variant="body2">Enrollments</Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <AnimatedTypography variant="h4">180+</AnimatedTypography>
            <Typography variant="body2">Countries</Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <AnimatedTypography variant="h4">16,000+</AnimatedTypography>
            <Typography variant="body2">Enterprise customers</Typography>
          </Grid>
        </AnimatedGrid>
      </Box>

      <Box className={styles.section}>
        <AnimatedTypography variant="h4" align="center" gutterBottom>
          How to begin
        </AnimatedTypography>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Plan your curriculum" />
          <Tab label="Record your video" />
          <Tab label="Launch your course" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className={styles.bodyText}>
                You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.
                The way that you teach — what you bring to it — is up to you.
              </Typography>
              <Typography variant="h6" className={styles.subtitle}>How we help you</Typography>
              <Typography variant="body1" className={styles.bodyText}>
                We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <AnimatedCardMedia src="/images/curricullum.webp" alt="Plan your curriculum" className={styles.tabImage} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className={styles.bodyText}>
                Discover the best ways to write a script and find the tools you need to capture your course.
              </Typography>
              <Typography variant="h6" className={styles.subtitle}>How we help you</Typography>
              <Typography variant="body1" className={styles.bodyText}>
                We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <AnimatedCardMedia src="/images/record.webp" alt="Record your video" className={styles.tabImage} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className={styles.bodyText}>
                Expand your professional network, build your expertise, and earn money on each paid enrollment.
              </Typography>
              <Typography variant="h6" className={styles.subtitle}>How we help you</Typography>
              <Typography variant="body1" className={styles.bodyText}>
                We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <AnimatedCardMedia src="/images/launch.webp" alt="Launch your course" className={styles.tabImage} />
            </Grid>
          </Grid>
        </TabPanel>
      </Box>

      <Box className={styles.testimonialSection}>
        <AnimatedGrid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={4}>
            <AnimatedCardMedia src="/images/professor.webp" alt="Testimonial" className={styles.testimonialImage} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <AnimatedTypography variant="body1" className={styles.testimonialText}>
            “Education is not a preparation for life; education is life itself. 
            The process of education must be continuous, adapting to the needs and experiences of the learner.”
            </AnimatedTypography>
            <Typography variant="subtitle1" className={styles.testimonialName}>
              John Dewey
            </Typography>
            <Typography variant="body2" className={styles.testimonialTitle}>
            American philosopher and psychologist
            </Typography>
          </Grid>
        </AnimatedGrid>
      </Box>

      <Box className={styles.section}>
        <AnimatedTypography variant="h4" align="center" gutterBottom>
          You won't have to do it alone
        </AnimatedTypography>
        <Typography variant="body1" align="center" gutterBottom>
          Our Instructor Support Team is here to answer your questions and review your test video, while our Teaching Center gives you plenty of resources to help you through the process. Plus, get the support of experienced instructors in our online community.
        </Typography>
        <Box textAlign="center">
          <AnimatedButton variant="outlined" color="primary">
            Need more details before you start? Learn more.
          </AnimatedButton>
        </Box>
      </Box>

      <Box className={styles.footer}>
        <Box className={styles.footerLinks}>
          <MuiLink component={Link} href="/business" color="inherit">
            Pi Learning Business
          </MuiLink>
          <MuiLink component={Link} href="/about" color="inherit">
            About Us
          </MuiLink>
          <MuiLink component={Link} href="/blog" color="inherit">
            Blog
          </MuiLink>
          <MuiLink component={Link} href="/terms" color="inherit">
            Terms
          </MuiLink>
          <MuiLink component={Link} href="/cookie" color="inherit">
            Cookie Settings
          </MuiLink>
        </Box>
        <Typography variant="body2" color="inherit">
          © 2024 Pi Learning
        </Typography>
      </Box>
    </AnimatedBox>
  );
};

export default InstructorPage;
