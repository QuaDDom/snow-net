import React from 'react';
import Person from './Person';
import styles from './Suggestions.module.scss';

export default function Suggestions() {
  return (
      <div className={styles.suggestionsContainer}>
        <div className={styles.border}/>
          <div className={styles.groups}>
            <div className={styles.groupList}>
              <h3>Groups</h3>
              <div className={styles.groupGrid}>
                <div className={styles.group}>
                  <div className={styles.presentation}>
                    <div className={styles.banner}></div>
                    <img src="https://www.wallpapertip.com/wmimgs/69-695766_papel-mural-3d-paisajes.jpg" alt="" />
                  </div>
                    <p>Photography</p>
                </div>
                <div className={styles.group}>
                  <div className={styles.presentation}>
                    <div className={styles.banner}></div>
                    <img src="https://r1.community.samsung.com/t5/image/serverpage/image-id/1935540iE64CB74216CC4E43?v=v2" alt="" />
                  </div>
                    <p>Wallpapers</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.follow}>
            <h3>Who to follow</h3>
            <div className={styles.personList}>
              <Person name="Edixon" lastname="Alberto" image="https://i.pinimg.com/originals/12/41/f6/1241f673ad968d4c7c3b3773aa028aff.jpg" id={1}/>
              <Person name="Galaxy" lastname="Nebula" image="https://apod.nasa.gov/apod/fap/image/1601/M101_nasaMultiW960.jpg" id={2}/>
              <Person name="Enzo" lastname="Díaz" image="https://avatars.githubusercontent.com/u/37701477?v=4" id={3}/>
            </div>
          </div>
      </div>
  );
}
