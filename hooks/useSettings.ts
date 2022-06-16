import { useState } from 'react';

export const useSettings = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUserame] = useState('');
};
