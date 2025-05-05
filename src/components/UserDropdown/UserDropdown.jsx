import * as React from 'react';
import {  Typography, Box, Avatar } from '@mui/material';
import { ClickAwayListener } from '@mui/material';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { textStylesBody1, textStylesBodyL2, textStylesH4 } from '../Styles/styles';
import { ReactComponent as LogOut } from "../../assets/icons/log-out.svg";
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/Slice/authSlice';
import { persistor } from '../../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { SITE_URL } from "../../config";
import LetterAvatar from "../LetterAvatar";

const UserDropdown = ({ name, lastName, email }) => {
  const user = useSelector(state => state.auth);
  // console.log('qqqqqqq',user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleLogout = () => {
    dispatch(logoutUser());
    persistor.purge();
    navigate('/login')
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const fileToUrl = (url) => {
    if (!url) return Avatar
    return `${SITE_URL}${user.avatar.url}`
  }

  return (
    <Stack direction="row" spacing={2} sx={{ zIndex: 1100 }}>
      <div>
        <Box ref={anchorRef} id="composition-box" aria-controls={open ? 'composition-menu' : undefined} aria-expanded={open ? 'true' : undefined} aria-haspopup="true" onClick={handleToggle} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} >
          <Avatar sx={{ width: 52, height: 52, marginLeft: '20px', borderColor: '#FFFFF' }}>
            { user.avatar ? <Box component="img" src={fileToUrl(user.avatar?.url)} alt="avatar" sx={{ height: '180%', width: '180%', }}/> : <LetterAvatar firstName={user.firstName} lastName={user.lastName} />}
          </Avatar>

          {/* User's Name */}
          <Typography sx={{ ...textStylesH4, color: 'black', fontSize: '24px', marginLeft: '20px' }}>
            {name} {lastName}
          </Typography>
        </Box>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom', }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button" onKeyDown={handleListKeyDown} sx={{ width: '330px', height: '407px' }} >
                    <Box sx={{ display: 'flex', alignItems: 'center', width: 'auto', height: '70px', margin: '24px', padding: '0' }} >
                      <Avatar sx={{ width: 70, height: 70, borderColor: '#FFFFFF', marginRight: '16px' }}>
                        { user.avatar ? <Box component="img" src={fileToUrl(user.avatar?.url)} alt="avatar" sx={{ height: '180%',  width: '180%', }} /> : <LetterAvatar firstName={user.firstName} lastName={user.lastName} /> }
                      </Avatar>
                      <Box>
                        <Typography sx={{ ...textStylesBody1, fontSize: '18px', color: 'black', paddingBottom: '4px' }}>
                          {name} {lastName}
                        </Typography>
                        <Typography sx={{ ...textStylesBody1, fontSize: '16px', color: '#475467' }}>
                          {email}
                        </Typography>
                      </Box>
                    </Box>

                    <MenuItem onClick={handleClose} component={Link} to="/profileAbout" sx={{...textStylesBody1, width: '228px', height: '63px', margin: '0 24px', padding: '16px 10px', '&:hover': { backgroundColor: '#E2D5FF', borderRadius: '8px' }}}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/settings" sx={{ ...textStylesBody1, width: '228px', height: '63px', margin: '4px 24px', padding: '16px 10px', '&:hover': { backgroundColor: '#E2D5FF', borderRadius: '8px' } }} >
                      Settings
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/pageHelpCenter" sx={{ ...textStylesBody1, width: '228px', height: '63px', margin: '0 24px 4px 24px', padding: '16px  10px', '&:hover': { backgroundColor: '#E2D5FF', borderRadius: '8px' } }} >
                      Help Center
                    </MenuItem>
                    <Divider sx={{ margin: '0 24px', borderColor: '#D0D5DD' }}/>
                    <MenuItem onClick={handleLogout} sx={{margin: '0 24px', padding: '16px 10px', width: '228px', height: '60px', '&:hover': { backgroundColor: '#E2D5FF', borderRadius: '8px' } }}>
                      <Stack direction="row" alignItems="center">
                        <LogOut style={{ width: '24px', height: '24px' }} />
                        <Typography sx={{ ...textStylesBodyL2, fontSize: '18px', color: '#F04438', textTransform: 'none', marginLeft: '12px' }}>
                          Log out
                        </Typography>
                      </Stack>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}

export default UserDropdown;