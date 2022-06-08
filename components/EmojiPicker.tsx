import React, { useRef } from 'react';
import styles from './EmojiPicker.module.scss';
import { useEmojiPicker } from '../hooks/useEmojiPicker';
import People from './Emojis/People';
import Animals from './Emojis/Animals';
import Food from './Emojis/Food';
import Objects from './Emojis/Objects';
import Symbols from './Emojis/Symbols';
import Activity from './Emojis/Activity';
import Travel from './Emojis/Travel';
import { MdOutlineTravelExplore, MdOutlineEmojiObjects } from 'react-icons/md';
import { AiOutlineSmile } from 'react-icons/ai';
import { BiFootball } from 'react-icons/bi';
import { CgCoffee } from 'react-icons/cg';
import { GiPlantsAndAnimals } from 'react-icons/gi';
import { VscSymbolOperator } from 'react-icons/vsc';
import { memo } from 'react';
import { useModal } from '../hooks/useModal';

interface Props {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  setPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pickerOpen: boolean;
  isTop: boolean;
}

const EmojiPicker = ({ setMessage, message, setPickerOpen, pickerOpen, isTop }: Props) => {
  const {
    activityList,
    peopleList,
    natureList,
    handleCategory,
    symbolList,
    foodList,
    objectList,
    travelList,
    currentCategory,
    emojiRef
  } = useEmojiPicker();

  const handleClick = (emoji: string) => {
    setMessage(`${message + emoji}`);
  };

  return (
    <>
      {pickerOpen && <div className="closeOverlay" onClick={() => setPickerOpen(false)} />}
      <div
        className={`
      ${styles.emojiPickerContainer} 
      ${pickerOpen ? styles.open : styles.close} ${isTop && styles.isTop}
      `}>
        <div className={styles.searchAndCategory}>
          <div className={styles.category}>
            <button onClick={() => handleCategory('people')}>
              <AiOutlineSmile />
            </button>
            <button onClick={() => handleCategory('activity')}>
              <BiFootball />
            </button>
            <button onClick={() => handleCategory('animals')}>
              <GiPlantsAndAnimals />
            </button>
            <button onClick={() => handleCategory('food')}>
              <CgCoffee />
            </button>
            <button onClick={() => handleCategory('symbols')}>
              <VscSymbolOperator />
            </button>
            <button onClick={() => handleCategory('objects')}>
              <MdOutlineEmojiObjects />
            </button>
            <button onClick={() => handleCategory('travel')}>
              <MdOutlineTravelExplore />
            </button>
          </div>
        </div>
        <div className={styles.emojiGrid} ref={emojiRef}>
          {currentCategory === 'people' && <People data={peopleList} handleClick={handleClick} />}

          {currentCategory === 'animals' && <Animals data={natureList} handleClick={handleClick} />}

          {currentCategory === 'food' && <Food data={foodList} handleClick={handleClick} />}

          {currentCategory === 'objects' && <Objects data={objectList} handleClick={handleClick} />}

          {currentCategory === 'symbols' && <Symbols data={symbolList} handleClick={handleClick} />}

          {currentCategory === 'activity' && (
            <Activity data={activityList} handleClick={handleClick} />
          )}

          {currentCategory === 'travel' && <Travel data={travelList} />}
        </div>
      </div>
    </>
  );
};

export default EmojiPicker;
