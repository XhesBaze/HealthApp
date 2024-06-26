import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import './chat.css';
import Stack from '@mui/material/Stack';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Avatar, Typography } from "@mui/material";
import Badge from '@mui/material/Badge';

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  borderRadius: '10px',
  backgroundColor: alpha('#CCCCCC', 0.1), // Very light grey background
  width: '100%',
  maxWidth: '20ch', // Max width for search input
  marginRight: theme.spacing(2), // Margin to separate search input and button
  height: 36,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Shadow
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#909090', // Search icon color
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary, // Grey text color
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const ChatElement = ({ avatar, name, message, time, badgeCount, onClick }) => {
  return (
    <Box className='chat' p={2} display="flex" alignItems="center" justifyContent="space-between" onClick={onClick}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={avatar} />
        <Stack direction="column" spacing={0.3}>
          <Typography className="user-name">
            {name}
          </Typography>
          <Typography className='chat-content'>
            {message}
          </Typography>
        </Stack>
      </Stack>
      <Stack spacing={2} alignItems="center" justifyContent="flex-end">
        <Typography className="chat-time">
          {time}
        </Typography>
        <Badge sx={{
            "& .MuiBadge-badge": {
              color: "white",
              backgroundColor: "#b7d9e4"
          }
        }} badgeContent={badgeCount}></Badge>
      </Stack>
    </Box>
  );
};

const Chats = ({ conversations, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChatClick = (chat) => {
    onSelectChat(chat);
  };

  const handleMenuClick = () => {
    onSelectChat(null);
    setSearchQuery("");
  };

  const filteredChatElements = conversations.filter(conversation =>
    conversation.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getLastMessage = (conversation) => {
    const allMessages = [...conversation.clientMessages, ...conversation.doctorMessages];
    allMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return allMessages[0];
  };

  return (
    <Box className='main-container' sx={{overflow:"scroll",  scrollbarWidth: "none", msOverflowStyle: "none"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1, color: 'grey' }}
            onClick={handleMenuClick}
          >
            <MenuOutlinedIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Search>
        </Toolbar>
        <Box className="chat-container">
          <Stack spacing={2} direction={'column'} sx={{ overflow: "hidden", height: "100%", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {filteredChatElements.map((conversation, index) => (
              <ChatElement
                key={index}
                name={conversation.clientName}
                message={getLastMessage(conversation).text}
                time={new Date(getLastMessage(conversation).timestamp).toLocaleString()}
                badgeCount={1}
                onClick={() => handleChatClick(conversation)}
              />
            ))}
          </Stack>
        </Box>
      </Box>
  );
};

export default Chats;