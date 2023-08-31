import React, { FC } from 'react';
import styles from './index.module.css';
import Translate from "@docusaurus/Translate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAccusoft } from '@fortawesome/free-brands-svg-icons';
import { usePluginData } from '@docusaurus/useGlobalData'
import { Typography, Grid, Modal, Box } from "@material-ui/core";
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    wrap,
  } from 'framer-motion'
import Link from '@docusaurus/Link';


const Slider = ({ blogList }) => {

    return (
        <div
            className={styles.slider}
            style={{ width: `${blogList.length * 100}%` }}
        >
            <motion.div
        className={styles['slide-track']}
        // style={{ x }}
        // onHoverStart={handleHoverStart}
        // onHoverEnd={handleHoverEnd}
      >
        {blogList.map(item => {
            const {
                metadata: { permalink, frontMatter },
            } = item;
            const { title, image, description } = frontMatter;
            return (
                <div className={styles.slide}>
                    <Link to={permalink}>
                        <img
                            src={image}
                            alt={title}
                            className={styles.image}
                            loading="lazy"
                        />
                        <div className={styles.slideBody}>
                            <h2 className={styles.title}>{title}</h2>
                            <p className={styles.website}>{description}</p>
                        </div>
                    </Link>
                </div>
            )
        })}
        </motion.div>
        </div>
    )
}

const RecentBlogs:React.FC<{}> = () => {
    const blogPluginData = usePluginData('docusaurus-plugin-content-blog') as any

    console.log('blogPluginData', blogPluginData);
    return (
        <div className={styles.recentBlogs}>
            <h2 className={styles.experienceTitle}>
                <FontAwesomeIcon style={{ marginRight: "15px" }} icon={faAccusoft} />
                <Translate>近期博客</Translate>
            </h2>
            <div className={styles.underline}></div>
            {/* <Hero /> */}
            <Grid container style={{ padding: "10%" }} className={styles.swiper}>
                {/* <Slider blogList={blogPluginData} /> */}
            </Grid>
        </div>
    )
}

export default RecentBlogs;