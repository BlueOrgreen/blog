import clsx from 'clsx'
import React from 'react'
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from '@docusaurus/theme-common'
import Link from '@docusaurus/Link'
import BackToTopButton from '@theme/BackToTopButton';
import type { Props } from '@theme/BlogListPage';
import Translate from '@docusaurus/Translate'
import Layout from '@theme/Layout'
import SearchMetadata from '@theme/SearchMetadata';
import styles from './index.module.css';
import { Fade } from 'react-awesome-reveal';
import { Typography, Grid, Box } from "@material-ui/core";
import { useHistory } from '@docusaurus/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAccusoft } from '@fortawesome/free-brands-svg-icons';


function BlogListPageMetadata(props: Props): JSX.Element {
    const { metadata } = props
    const { blogDescription } = metadata
  
    return (
      <>
        <PageMetadata title={`Blog`} description={blogDescription} />
        <SearchMetadata tag="blog_posts_list" />
      </>
    )
  }

function BlogListPageContent(props: Props) {
    const { items } = props;
    const history = useHistory();
    return (
        <Layout>
            <Grid container style={{ padding: "2% 15%" }} className={styles.blogsContent}>
            <h2 className={styles.blogTitle}>
                 <FontAwesomeIcon style={{ marginRight: "15px" }} icon={faAccusoft} />
                <Translate id="theme.blog.title.new">博客</Translate>
            </h2>
                <div>
                {items.map(({ content: BlogPostContent }, index) => {
                    const { metadata: blogMetaData, frontMatter, assets } = BlogPostContent;
                    const { title, image, description } = frontMatter;
                    const { permalink, date, tags } = blogMetaData;
                    const dateObj = new Date(date);
                    const dateString = `${dateObj.getFullYear()}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}`;
                    
                    return (
                        <Fade direction='left' triggerOnce={true}>
                        <Grid xs={12} container className={styles.blogItem} key={blogMetaData.permalink}>
                            <Grid xs={6}>
                                <img className={styles.blogItemImage} src={image} alt="" />
                            </Grid>
                            <Grid xs={6} className={styles.blogItemContent}>
                                    <h3 className={styles.titleLink} onClick={() => history.push({
                                        pathname: permalink
                                    })}>
                                        {title}
                                   </h3>
                                   <div style={{ display: "flex", justifyContent: "space-between" }}>
                                      <div className={styles.blogItemTime}>{dateString}</div>
                                      <div className={styles.blogItemTags}>
                                      {tags.length > 0 &&
                                          tags
                                          .slice(0, 2)
                                          .map(({ label, permalink: tagPermalink }, index) => (
                                              <Link
                                                key={tagPermalink}
                                                className={styles.tag}
                                                to={tagPermalink}
                                              >
                                                <span>
                                                  {label}
                                                </span>
                                              </Link>
                                          ))}
                                      </div>
                                   </div>
                                <div className={styles.desc}>
                                    {description}
                                </div>
                            
                            </Grid>
                        </Grid>
                        </Fade>
                    )
                })}
                </div>
                </Grid>
                <BackToTopButton />
        </Layout>
    )
}

export default function BlogListPage(props: Props): JSX.Element {
    return (
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogListPage,
        )}
      >
        
        <BlogListPageMetadata {...props} />
        <BlogListPageContent {...props} />
      </HtmlClassNameProvider>
    )
  }
  