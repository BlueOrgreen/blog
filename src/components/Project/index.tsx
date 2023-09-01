import React from "react";
import { Project } from "@site/data/project";
import styles from './index.module.css';
import useBaseUrl from "@docusaurus/useBaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import clsx from 'clsx'

export const ProjectItem: React.FC<Project & { index: number }> = (props) => {
    console.log("project===>", props);
    const { preview, index, title, description, tech, source, website } = props;

    return (
        <div className={styles.project}>
            <div className={styles.projectImg}>
                {preview && <img src={useBaseUrl(preview)} className={styles.image} />}
                <div className={styles.imgMask}></div>
            </div>
            <div className={styles.projectInfo}>
                <span className={styles.projectNum}>0{index + 1}.</span>
                <h3 className={styles.title}>{title || "default title"}</h3>
                <p className={styles.desc}>{description}</p>
                <div className={styles.workStack}>
                    {tech.map((item, index) => {
                        return <span key={index}>{item}</span>;
                    })}
                </div>
                <div className={styles.projectLink}>
                    <a href={source}>
                        <FontAwesomeIcon icon={faGithub} className={clsx(styles.workIcon, source ? null : styles.disabled)} />
                    </a>
                    <a href={website}>
                        <FontAwesomeIcon icon={faExternalLinkAlt} className={styles.workIcon} />
                    </a>
                </div>
            </div>
    </div>
    )
}