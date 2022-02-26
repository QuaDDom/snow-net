import React, { useState } from 'react';
import styles from './MessageList.module.scss';
import { messageList } from '../../db/message_list';
import RowMsg from '../RowMsg';
import ChatInfo from '../ChatInfo';
import { BsGearFill } from 'react-icons/bs';
import Conversation from './Conversation';
import { AiOutlineSearch } from 'react-icons/ai';

interface Conversation{
  members: [string, string],
  _id: string,
}

interface Props{
  loggedUser: any
  conversations: any,
  currentChat: any,
  setCurrentChat: any,
  socket: React.MutableRefObject<any>
}

export default function MessageList({conversations, loggedUser, currentChat, setCurrentChat, socket}: Props) {
  const [user, setUser] = useState<any>(null);

  return (
    <div className={styles.messageListContainer}>
      <div className={styles.peopleMsgContainer}>
          <h2>Messages</h2>
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
      </div>
      { currentChat
       ? <Conversation currentChat={currentChat} loggedUser={loggedUser} user={user} socket={socket}/>
       : 
       <div className={styles.notConversation}>
         <h4>Open a conversation to start chatting.</h4>
       </div>
      }
    </div>
  );
}
