import React from "react";
import styles from './index.module.css';
import Translate from "@docusaurus/Translate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons';
import { ProjectItem } from '../Project';
import { projects } from "@site/data/project";

export const Projects: React.FC<{}> = () => {

    return (
        <div className={styles.projects}>
            <h2 className={styles.title}>
                <FontAwesomeIcon style={{ marginRight: "15px" }} icon={faFontAwesome} />
                <Translate id="theme.projects.title">个人项目</Translate>
            </h2>
            <div className={styles.underline}></div>
            <div>
                {projects.map((item, index) => {
                    return (
                        <ProjectItem
                            index={index}
                            {...item}
                        />
                    )
                })}
            </div>
        </div>
    )
}