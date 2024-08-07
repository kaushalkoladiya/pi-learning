"use client";

import React from 'react';
import { Box, Typography, Button, Grid, Link as MuiLink, AppBar, Toolbar, Avatar, Paper, CardContent, Fade, Grow, Slide, Zoom } from '@mui/material';
import Link from 'next/link';
import styles from './homecss/home.module.css';

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

export const PublicNavbar = () => (
  <AnimatedAppBar position="static" className={styles.appBar}>
    <AnimatedToolbar className={styles.toolbar}>
      <Typography variant="h6" className={styles.logo} component={MuiLink} href='/'>
        Pi Learning
      </Typography>
      <Box className={styles.navLinks}>
        <MuiLink component={Link} href="/" color="inherit">
          Teaching Center
        </MuiLink>
        <MuiLink component={Link} href="/instructor_public" color="inherit">
          Teaching on Pi Learning
        </MuiLink>
        <MuiLink component={Link} href="/auth/login" color="inherit">
          Login
        </MuiLink>
        <MuiLink component={Link} href="/auth/signup" color="inherit">
          Sign Up
        </MuiLink>
      </Box>
    </AnimatedToolbar>
  </AnimatedAppBar>
);

const Home = () => {
  return (
    <AnimatedBox className={styles.pageContainer}>
      <PublicNavbar />

      <Box className={styles.hero}>
        <Box className={styles.heroContent}>
          <AnimatedTypography variant="h2" className={styles.heroTitle}>
            Welcome to Pi Learning
          </AnimatedTypography>
          <AnimatedTypography variant="h5" className={styles.heroSubtitle}>
            Learn how to implement Pi Learning into your educational center.
          </AnimatedTypography>
          <Box className={styles.searchBox}>
            <input type="text" placeholder="Search the Teaching Center" className={styles.searchInput} />
            <AnimatedButton variant="contained" className={styles.searchButton}>
              Search
            </AnimatedButton>
          </Box>
        </Box>
        <Box className={styles.heroImageContainer}>
          <img src="/images/hero.webp" alt="Pi Learning Hero" className={styles.heroImage} />
        </Box>
      </Box>

      <Box className={styles.section}>
        <AnimatedTypography variant="h4" align="center" gutterBottom>
          Something for every part of your journey
        </AnimatedTypography>
        <AnimatedGrid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <AnimatedCard className={styles.card}>
              <AnimatedCardMedia src="/images/icon1.webp" alt="Plan your course" className={styles.cardImage} />
              <Typography variant="h6">Plan your course</Typography>
              <Typography variant="body2">
                Learn the best practices for preparing your course content.
              </Typography>
              <MuiLink component={Link} href="/plan" color="primary">
                Learn more
              </MuiLink>
            </AnimatedCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <AnimatedCard className={styles.card}>
              <AnimatedCardMedia src="/images/icon2.webp" alt="Record your course" className={styles.cardImage} />
              <Typography variant="h6">Record your course</Typography>
              <Typography variant="body2">
                Discover the best ways to write a script and find the tools you need to capture your course.
              </Typography>
              <MuiLink component={Link} href="/record" color="primary">
                Learn more
              </MuiLink>
            </AnimatedCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <AnimatedCard className={styles.card}>
              <AnimatedCardMedia src="/images/icon3.webp" alt="Market your course" className={styles.cardImage} />
              <Typography variant="h6">Market your course</Typography>
              <Typography variant="body2">
                Get inside knowledge on driving enrollments and getting reviews.
              </Typography>
              <MuiLink component={Link} href="/market" color="primary">
                Learn more
              </MuiLink>
            </AnimatedCard>
          </Grid>
        </AnimatedGrid>
      </Box>

      <Box className={styles.section}>
        <AnimatedTypography variant="h4" align="center" gutterBottom>
          Have questions?
        </AnimatedTypography>
        <AnimatedGrid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <AnimatedCard className={styles.card}>
              <AnimatedCardMedia src="/images/icon4.webp" alt="Help and support" className={styles.cardImage} />
              <Typography variant="h6">Help and support</Typography>
              <Typography variant="body2">
                Find answers to frequently asked questions and review troubleshooting and how-to articles.
              </Typography>
              <MuiLink component={Link} href="/help" color="primary">
                Learn more
              </MuiLink>
            </AnimatedCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <AnimatedCard className={styles.card}>
              <AnimatedAvatar className={styles.avatar} src="/images/icon5.webp" alt="Instructor community" />
              <Typography variant="h6">Instructor community</Typography>
              <Typography variant="body2">
                Get support and inspiration from new and experienced instructors.
              </Typography>
              <MuiLink component={Link} href="/community" color="primary">
                Learn more
              </MuiLink>
            </AnimatedCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <AnimatedCard className={styles.card}>
              <AnimatedCardMedia src="/images/icon6.webp" alt="Trust and safety" className={styles.cardImage} />
              <Typography variant="h6">Trust and safety</Typography>
              <Typography variant="body2">
                Learn about course requirements and policies for instructors and learners.
              </Typography>
              <MuiLink component={Link} href="/safety" color="primary">
                Learn more
              </MuiLink>
            </AnimatedCard>
          </Grid>
        </AnimatedGrid>
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

export default Home;
