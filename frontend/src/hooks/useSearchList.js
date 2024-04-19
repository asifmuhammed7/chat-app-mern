import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const useSearchList = () => {
    const [loading, setLoading] = useState(false);
    const [searchUser, setSearchUser] = useState([]);

    useEffect(() => {
        const searchList = async () => {
            setLoading(true)
            try {
                const res = await fetch("api/users/search")
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setSearchUser(data);

            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        searchList()

    }, []);

    return { loading, searchUser }
}

export default useSearchList