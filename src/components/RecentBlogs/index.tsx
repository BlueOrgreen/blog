import React, { FC, useRef, useLayoutEffect } from 'react';
import styles from './index.module.css';
import Translate from "@docusaurus/Translate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAccusoft } from '@fortawesome/free-brands-svg-icons';
import { usePluginData } from '@docusaurus/useGlobalData'
import clsx from 'clsx'
import Link from '@docusaurus/Link';
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useTransform,
    wrap,
} from 'framer-motion'

const defaultVelocity = 0.8
const Slider = ({ blogList }) => {
    let { blogs } = blogList;
    // 初始速度
    let baseVelocity = -defaultVelocity
    // 移动方向
    const directionFactor = useRef<number>(1)
    const baseX = useMotionValue(0)

    useLayoutEffect(() => {
        baseX.set(6)
      })

    const x = useTransform(
        baseX,
        v => `${wrap(10, -(blogs.length * blogs.length), v)}%`,
      )

      useAnimationFrame((time, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
        moveBy += directionFactor.current * moveBy
        baseX.set(baseX.get() + moveBy)
      })

      const handleHoverStart = () => {
        baseX.stop()
        baseVelocity = 0
      }
    
      const handleHoverEnd = () => {
        baseVelocity = -defaultVelocity
      }

    return (
        <div
        className={styles.slider}
        style={{ width: `${blogs.length * 100}%` }}
      >
        <motion.div
          className={styles['slide-track']}
          style={{ x }}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
        >
            {blogs.map((item, index) => {
                const { metadata } = item;
                const { description, permalink, title, tags } = metadata;
                const { frontMatter: { image }, date } = metadata;
                const dateObj = new Date(date);
                const dateString = `${dateObj.getFullYear()}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}`;
        
                return (
                    <div className={styles.slide}>
                        <div className={styles.slideImage}>
                            <img
                            src={image}
                            alt={title}
                            className={styles.image}
                            loading="lazy"
                        />
                        </div>
                        <div className={styles.slideContent}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                <div className={styles.itemTime}>{dateString}</div>
                                <div className={styles.itemTags}>
                                {tags.length > 0 &&
                                    tags
                                    .slice(0, 2)
                                    .map(({ label, permalink: tagPermalink }, index) => (
                                        <Link
                                        key={tagPermalink}
                                        className={`post__tags ${index < tags.length ? 'margin-right--sm' : ''}`}
                                        to={tagPermalink}
                                        style={{ color: 'black', fontSize: '0.75em', fontWeight: 500 }}>
                                        {label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <Link to={permalink} className={styles.itemTitle}>
                                {title}
                            </Link>
                            <div className={styles.slideDesc}>
                            {description}
                            </div> 
                        </div>
                  </div>
                )
            })}
            </motion.div>
            </div>
    )
}

const RecentBlogs:React.FC<{}> = () => {
    const blogPluginData = usePluginData('docusaurus-plugin-content-blog') as any
    return (
        <div className={styles.recentBlogs}>
            <h2 className={styles.title}>
                <FontAwesomeIcon style={{ marginRight: "15px" }} icon={faAccusoft} />
                <Translate id="theme.recentBlog.title">近期博客</Translate>
            </h2>
            <div className={styles.underline}></div>
            <div style={{ margin: '5%', position: "relative", overflow: "hidden" }} >
                <Slider blogList={blogPluginData} />
            <div className={clsx(styles.gradientBox, styles.leftBox)} />
            <div className={clsx(styles.gradientBox, styles.rightBox)} />
            </div>
        </div>
    )
}

export default RecentBlogs;