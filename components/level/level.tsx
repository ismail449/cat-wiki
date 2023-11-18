import React, { FC } from "react";
import classNames from "classnames";
import styles from "./level.module.css";

type LevelProps = {
  maxLevel: number;
  level: number;
};

const Level: FC<LevelProps> = ({ level, maxLevel }) => {
  const levels = [];
  for (let i = 0; i < maxLevel; i++) {
    const levelItem = (
      <span
        key={i}
        className={classNames(
          styles.levelItem,
          i < level ? styles.filledLevel : ""
        )}
      />
    );
    levels.push(levelItem);
  }
  return <>{levels}</>;
};

export default Level;
