import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import useBaseUrl from "@docusaurus/useBaseUrl";
import Translate from "@docusaurus/Translate";
import { faWeixin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography, Grid, Modal, Box } from "@material-ui/core";
import { useTrail, animated, useSpring } from "react-spring";
import styles from './index.module.css';
import RecentBlogs from '../components/RecentBlogs/index';
import { Projects } from '../components/Projects/index';


export default function Home(): JSX.Element {
  const context = useDocusaurusContext();
  const [open, setOpen] = useState(false);
  const { siteConfig } = context;
  
  const animatedHero = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(8em)" },
    config: { mass: 2, tension: 260, friction: 30 },
    delay: 600,
  });
  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: "translateY(3em)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
    delay: 200,
  });

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Layout
     title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <Grid container style={{ padding: "5%" }} className={styles.hero}>
        {/* 个人信息 */}
        <Grid item xs={12} lg={6} className={styles.homeIntro}>
        <animated.div style={animatedTexts[0]}>
            <Typography variant="h3" gutterBottom>
              <Translate id="homepage.hero.greet">你好! 我是</Translate>
              <span className="introName">
                <Translate id="homepage.hero.name">云帆</Translate>
              </span>
            </Typography>
          </animated.div>
          <animated.div style={animatedTexts[1]}>
            <Typography variant="body1">
              <Translate id="homepage.hero.personal">
                一个经验丰富的全栈工程师, 在软件开发方面拥有扎实的技能.   
              </Translate>
            </Typography>
          </animated.div>
          &nbsp;
          <animated.div style={animatedTexts[2]}>
            <Typography variant="h6" gutterBottom>
              <Translate id="homepage.hero.skillTitle">相关技能: </Translate>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Web, TypeScript, 微信小程序, NestJs, Docker, Linux,
              MySql.
            </Typography>
          </animated.div>
          &nbsp;
          <animated.div className="social__links" style={animatedTexts[4]}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography display={"inline"} gutterBottom>
              <Translate id="homepage.hero.contract">联系方式: </Translate>
              </Typography>
            </Grid>
            <Grid item>
              <a style={{ cursor: "pointer" }} onClick={() => {setOpen(true)}}>
                <FontAwesomeIcon icon={faWeixin} />
              </a>
            </Grid>
            <Grid item>
              <a href="https://github.com/BlueOrgreen">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </Grid>
          </Grid>
        </animated.div>
        </Grid>
        <Grid item xs={12} lg={6} className="homeImg">
          <animated.img
            src={useBaseUrl("img/programming.svg")}
            style={animatedHero}
          />
        </Grid>
      </Grid>
      <Grid>
        <RecentBlogs />
      </Grid>
      <Grid>
        <Projects />
      </Grid>
      <Modal
        open={open}
        onClose={() => {setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modalBox} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            我的微信号是
          </Typography>
          <Typography>
            CYF8683
          </Typography>
        </Box>
      </Modal>
    </Layout>
  );
}
