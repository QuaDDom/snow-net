import React, { useState } from 'react';
import styles from './MessageList.module.scss';
import { messageList } from '../../db/message_list';
import RowMsg from '../RowMsg';
import ChatInfo from '../ChatInfo';
import { BsGearFill } from 'react-icons/bs';
import Conversation from './Conversation';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiMessageAdd } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import NewConversationModal from './NewConversationModal';
import { useMediaQuery } from 'react-responsive';

interface Conversation{
  members: [string, string],
  _id: string,
}

interface Props{
  loggedUser: any
  conversations: any,
  currentChat: any,
  setCurrentChat: any,
  socket: React.MutableRefObject<any>,
  getChats: () => Promise<void>
}

export default function MessageList({conversations, loggedUser, currentChat, setCurrentChat, socket, getChats}: Props) {
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isResponsive = useMediaQuery({ query: '(min-width: 1200px)' });
  const [query, setQuery] = useState('');

  const handleOpenModal = ()=> setIsModalOpen(true);

  const keys = ["name", "lastname", "username"];

  (conversations)

 


  return (
    <>
    {isModalOpen && <NewConversationModal 
    setIsModalOpen={setIsModalOpen} 
    loggedUser={loggedUser} 
    getChats={getChats}
    />}
    <div className={styles.messageListContainer}>
{      isResponsive && <div className={styles.peopleMsgContainer}>
          <div className={styles.buttons}>
            <h2>Messages</h2>
              <div>
                <button><IoSettingsOutline/></button>
                <button onClick={handleOpenModal}><BiMessageAdd/></button>
              </div>
          </div>
          <div className={styles.searchInput}>
            <div className={styles.inputContainer}>
              <span><AiOutlineSearch/></span>
              <input type="text" placeholder='Search' />
            </div>
          </div>
          <div className={styles.grid}>
            {
              conversations.map(({members, _id}: Conversation)=> (
                <RowMsg 
                key={_id}
                _id={_id}
                members={members} 
                loggedUser={loggedUser}
                setCurrentChat={setCurrentChat}
                user={user}
                setUser={setUser}
                />
              ))
            }
          </div>
      </div>}
      { currentChat
       ? <Conversation 
          currentChat={currentChat} 
          loggedUser={loggedUser} 
          user={user} 
          socket={socket}
          setCurrentChat={setCurrentChat}
          />
       : 
       <>
 {       isResponsive && <div className={styles.notConversation}>
          <h4>Open a conversation to start chatting.</h4>
        </div>}
{         !isResponsive && <div className={styles.peopleMsgContainer}>
          <div className={styles.buttons}>
            <h2>Messages</h2>
              <div>
                <button><IoSettingsOutline/></button>
                <button onClick={handleOpenModal}><BiMessageAdd/></button>
              </div>
          </div>
          <div className={styles.searchInput}>
            <div className={styles.inputContainer}>
              <span><AiOutlineSearch/></span>
              <input type="text" placeholder='Search' />
            </div>
          </div>
          <div className={styles.grid}>
            {
              conversations.map(({members, _id}: Conversation)=> (
                <RowMsg 
                key={_id}
                _id={_id}
                members={members} 
                loggedUser={loggedUser}
                setCurrentChat={setCurrentChat}
                user={user}
                setUser={setUser}
                />
              ))
            }
          </div>
        </div>}
       </>
      }
    </div>
    </>
  );
}
