import React, { useState } from 'react';
import { Box, Button, Avatar, Typography, Tabs, Tab, List, ListItem, ListItemAvatar, ListItemText, IconButton, Badge, Popover } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { stylesForDetail, textStylesBodyL2, textStylesDropdownName, textStylesDropdown, stylesForDecline, stylesForAccept } from '../Styles/styles';
import ButtonGroupDropdownFilter from './ButtonGroupDropdownFilter';
import avatar1 from '../../assets/avatars/avatar1.svg';
import avatar2 from '../../assets/avatars/avatar2.svg';
import avatar3 from '../../assets/avatars/avatar3.svg';
import avatar4 from '../../assets/avatars/avatar4.svg';
import { useNavigate } from 'react-router-dom';

const notificationsData = [
    {
        id: 1,
        name: 'Marilyn Donin',
        action: 'Followed you',
        project: 'TechBridge',
        time: '2 hours ago',
        avatar: avatar1,
        type: 'Invites',
        read: true,
        status: 'accepted',
    },
    {
        id: 2,
        name: 'Randy Baptista',
        action: 'Invited you to the project',
        project: 'TechBridge',
        time: '2 hours ago',
        avatar: avatar2,
        type: 'Other',
        read: false,
        status: null,
    },
    {
        id: 3,
        name: 'Lindsey Vetrovs',
        action: 'Followed your project',
        project: 'TechBridge',
        time: '9 hours ago',
        avatar: avatar3,
        type: 'Other',
        read: false,
        status: null,
    },
    {
        id: 4,
        name: 'Lindsey Vetrovs',
        action: 'Followed your project',
        project: 'TechBridge',
        time: '7 hours ago',
        avatar: avatar4,
        type: 'Join requests',
        read: true,
        status: null,
    },
    {
        id: 5,
        name: 'Randy Baptista',
        action: 'Invited you to the project',
        project: 'TechBridge',
        time: '5 hours ago',
        avatar: avatar2,
        type: 'Invites',
        read: true,
        status: 'declined',
    },
];

const NotificationDropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [notifications, setNotifications] = useState(notificationsData);
    const navigate = useNavigate();

    const handleOpenBell = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseBell = () => {
        setAnchorEl(null);
    };

    const handleDecline = (id) => {
            setNotifications((prev) =>
                prev.map((notif) =>
                    notif.id === id
                        ? { ...notif, status: 'declined', type: 'Invites' }
                        : notif
                )
            );
        };
        // setNotifications((prev) => prev.filter((notif) => notif.id !== id));


    const handleAccept = (id) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id
                    ? { ...notif, status: 'accepted', type: 'Invites' }
                    : notif
            )
        );
    };


    const handleDetail = (notif) => {
        console.log('Detail:', notif);
        // Можно открыть модальное окно или перенаправить на страницу
    };
    const filteredNotifications = notifications.filter((notif) => {
        if (activeFilter === 'All') return true;
        return notif.type === activeFilter;
    });
    // console.log('Отфильтрованные уведомления:', filteredNotifications);
    // console.log('Текущий фильтр:', activeFilter);

    const handleFilterChange = (newFilter) => {
        setActiveFilter(newFilter);
        // console.log(`Текущий фильтр: ${newFilter}`);

    };

    const handleMarkAsRead = () => {
        setNotifications((prev) =>
            prev.map((notif) => ({ ...notif, read: true }))
        );
    };


    const handleNotificationClick = (id) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, read: true } : notif 
            )
        );
    };

    const formatText = (text) => {
        const words = text.split(' ');
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
        return words.join(' ');
    };

    return (
        <>
            <IconButton onClick={handleOpenBell} >
                <Badge badgeContent={notifications.filter((notif) => !notif.read).length}
                    sx={{ '& .MuiBadge-badge': { backgroundColor: '#A6F4C5', right: '8px', top: '3px' } }}>
                    <NotificationsNoneIcon sx={{ width: '32px', height: '32px' }} />
                </Badge>
            </IconButton>

            <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleCloseBell} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} transformOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ marginTop: '40px' }}>
                <Box sx={{ width: 600, zIndex: 5, padding: 2, bgcolor: '#fff', borderRadius: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" sx={{ ...textStylesBodyL2 }}>Notifications</Typography>
                        <Button variant="text" sx={{ ...textStylesDropdownName, color: '#814AEB', textTransform: 'none', }} onClick={handleMarkAsRead}>
                            {formatText('mark all as read')}
                        </Button>
                    </Box>

                    <Box>
                        <ButtonGroupDropdownFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />
                    </Box>

                    <List>
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map((notif) => (
                                <ListItem key={notif.id} sx={{ borderRadius: 2, mb: 1, display: 'flex', flexDirection: 'column', p: 2, bgcolor: notif.read ? 'transparent' : '#F3E9FF' }}  onClick={() => handleNotificationClick(notif.id)}>
                                    <Box display="flex" alignItems="center" width="100%" mb={2}>
                                        <ListItemAvatar>
                                            <Avatar src={notif.avatar} alt={notif.name} />
                                        </ListItemAvatar>

                                        {notif.type === 'Invites' && notif.status === 'accepted' ? (
                                            <Typography variant="body2" sx={{ ...textStylesDropdown, color: '#000' }}>
                                                    You have{' '}
                                                <Typography component="span" sx={{ ...textStylesDropdown, color: '#12B76A' }}>successfully</Typography>{' '}
                                                    joined the project{' '}
                                                <Typography component="span" sx={{ ...textStylesDropdownName, color: '#814AEB',cursor: 'pointer'  }} onClick={() => navigate(`/PageProjectId/${notif.id}`)} >{notif.project}</Typography>
                                                <Typography variant="body2" color="textSecondary">{notif.time}</Typography>
                                            </Typography>
                                        ) : notif.type === 'Invites' && notif.status === 'declined' ? (
                                            <Typography variant="body2" sx={{ ...textStylesDropdown, color: '#000' }}>
                                                    You have{' '}
                                                <Typography variant="span" color="red">declined</Typography>{' '}
                                                    joining the project{' '}
                                                <Typography component="span" sx={{...textStylesDropdownName, color: '#814AEB', cursor: 'pointer'}} onClick={() => navigate(`/PageProjectId/${notif.id}`)}>{notif.project}</Typography>.
                                                <Typography variant="body2" sx={{ display: 'block', ...textStylesDropdown }}>
                                                    Keep looking for new opportunities for cooperation.
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">{notif.time}</Typography>
                                            </Typography>
                                        ) : (
                                            <ListItemText
                                                primary={
                                                    <Box>
                                                        <Typography onClick={() => navigate(`/pageAboutMember/${notif.id}`)} sx={{ ...textStylesDropdownName, mr: 1, cursor: 'pointer' }}>
                                                            {notif.name}
                                                        </Typography>
                                                        <Typography component="span" variant="body2" sx={{ ...textStylesDropdown }}>
                                                            {notif.action}{' '}
                                                            {notif.project && (
                                                                <Typography component="span" onClick={() => navigate(`/PageProjectId/${notif.id}`)} sx={{ ...textStylesDropdownName, color: '#814AEB',  cursor: 'pointer' }}>
                                                                    {notif.project}
                                                                </Typography>
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                }
                                                secondary={notif.time}
                                            />
                                        )}
                                        {/* {console.log('Notification:', notif)} */}

                                        {!notif.read && (
                                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#814AEB', position: 'absolute', right: 100, top: 70, transform: 'translateY(-50%)' }} />
                                        )}
                                    </Box>

                                    {notif.type !== 'Invites' && (
                                        <Box display="flex" justifyContent="flex-start" gap={1} width="78%">
                                            <Button size="small" variant="text" sx={{ ...stylesForDecline }} onClick={() => handleDecline(notif.id)}>
                                                Decline
                                            </Button>
                                            <Button size="small" variant="contained" sx={{ ...stylesForAccept }} onClick={() => handleAccept(notif.id)}>
                                                Accept
                                            </Button>
                                            <Button size="small" variant="text" sx={{ ...stylesForDetail }} onClick={() => handleDetail(notif)}>
                                                Detail
                                            </Button>
                                        </Box>
                                    )}
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary" align="center">
                                No notifications found
                            </Typography>
                        )}
                    </List>
                </Box>
            </Popover >
        </>
    );
};

export default NotificationDropdown;

