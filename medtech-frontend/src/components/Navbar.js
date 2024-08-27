import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MoreVert } from '@mui/icons-material';
import { Menu, MenuItem, IconButton } from '@mui/material';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <header className="bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-md w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="relative flex items-center">
          <motion.h1 
            className="text-5xl font-extrabold tracking-wide"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.span
              className="text-black"
              initial={{ letterSpacing: "0.1em" }}
              animate={{ letterSpacing: "normal" }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Clinical
            </motion.span>
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 ml-2"
              initial={{ backgroundPosition: "200% center" }}
              animate={{ backgroundPosition: "0% center" }}
              transition={{ duration: 3, ease: "linear" }}
            >
              Trail
            </motion.span>
          </motion.h1>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <IconButton
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleClick}
              className="text-gray-600 hover:text-blue-600 transition-colors text-3xl"
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  minWidth: 180,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                },
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => handleNavigation('/faq')}>FAQ</MenuItem>
              <MenuItem onClick={() => handleNavigation('/help')}>Help</MenuItem>
              <MenuItem onClick={() => handleNavigation('/account')}>Account</MenuItem>
              <MenuItem onClick={() => handleNavigation('/pricing')}>See Pricing</MenuItem>
            </Menu>
          </div>
          
          <motion.button
            className="bg-blue-600 text-white py-2 px-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-transform duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
          >
            Login
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
