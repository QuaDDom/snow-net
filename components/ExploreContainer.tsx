import styles from '../styles/explore.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import React from 'react';
import News from './Explore/News';

export default function ExploreContainer() {
    return (
        <div className={styles.exploreContainer}>
            <div className={styles.searchInput}>
                <div className={styles.inputContainer}>
                    <span>
                        <AiOutlineSearch />
                    </span>
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className={styles.trending}>
                <News
                    title="Everything new on the PS5"
                    img="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/11/analisis-ps5-computerhoy-2140441.jpg?itok=3O0gb1ee"
                    topic="Gaming"
                />
                <News
                    title="South Korea elects conservative opponent Yoon Suk-yeol as its new president"
                    img="https://api.time.com/wp-content/uploads/2022/03/yoon-suk-yeol.jpg"
                    topic="World"
                />
            </div>
        </div>
    );
}
