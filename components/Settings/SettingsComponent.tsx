import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import General from './pages/General'
import Language from './pages/Language'
import Privacy from './pages/Privacy'
import Security from './pages/Security'

interface Props{
    setPage: React.Dispatch<React.SetStateAction<number>>,
    page: number
}

export default function SettingsComponent({ setPage, page }: Props) {
    const { loggedUser } = useContext<any>(AuthContext);
    
    return (
        <>
            {
            page === 1 && <General setPage={setPage} loggedUser={loggedUser}/>
            }
            {
            page === 2 && <Security setPage={setPage} loggedUser={loggedUser}/>
            }
            {
            page === 3 && <Privacy setPage={setPage} loggedUser={loggedUser}/>
            }
            {
            page === 4 && <Language setPage={setPage} loggedUser={loggedUser}/>
            }
        </>
    )
}
