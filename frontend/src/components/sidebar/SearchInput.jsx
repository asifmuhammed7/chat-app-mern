import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../store/useConversation';
import useGetConversation from '../../hooks/useGetConversation';
import toast from 'react-hot-toast';
import useSearchList from '../../hooks/useSearchList';

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { conversation, getConversations } = useGetConversation()
  const { setSelectedConversation } = useConversation();

  const { searchUser } = useSearchList();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) {
      toast.error('Please enter a search term');
      return;
    }
    if (search.length < 3) {
      toast.error('Search term must be at least 3 characters long');
      return;
    }
    const searchUsers = searchUser.find((s) =>
      s.username.toLowerCase().includes(search.toLowerCase())
    );
    console.log(searchUsers);
    if (searchUsers) {
      setSelectedConversation(searchUsers);
      setSearch("");
      await getConversations()
    } else {
      toast.error('No user found');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type="text"
        placeholder='Search'
        className='input input-bordered rounded-full'
        value={search}
        onChange={handleChange}
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>
    </form>
  );
};

export default SearchInput;
