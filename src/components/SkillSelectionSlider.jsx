import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchSkills} from "../store/Slice/skillsSlice";
import Box from "@mui/material/Box";
import {Chip, IconButton, Typography} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {textStylesBody3, textStylesBodyM} from "./Styles/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CancelIcon from "@mui/icons-material/Cancel";
import {SITE_URL} from "../config";

const SkillSelectionSlider = ({setSkills, skills}) => {
    const dispatch = useDispatch();
    const skillsData = useSelector((state) => state.skills.skills.data);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(fetchSkills());
        setLoading(false)
    }, [dispatch]);


    const handleSelectSkill = (newSkill) => {
        if (skills.find(e => e.id === newSkill.id)) {
            setSkills(prev => prev.filter(e => e.id !== newSkill.id))
        } else {
            setSkills([...skills, newSkill])
        }
    };

    const handleRemoveSkill = (id) => {
        setSkills((prev) => prev.filter((s) => s.id !== id));
    };


    if (loading) {
        return <>loading</>
    }

    return (
        <>
            <Box sx={{display: "flex", alignItems: "center", mb: '24px', px: 2}}>
                {/*<IconButton>*/}
                {/*    <SearchIcon/>*/}
                {/*</IconButton>*/}
                {/*<InputBase*/}
                {/*    onChange={(e) => setFilter(e.target.value)}*/}
                {/*    placeholder="Search"*/}
                {/*    sx={{flex: 1, border: "1px solid #D0D5DD", borderRadius: '6px', padding: '4px 12px'}}*/}
                {/*/>*/}

            </Box>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: '16px'}}>
                <IconButton
                    // onClick={() => handleChangePage(null, page - 1)}
                    // disabled={page === 1}
                >
                    <ArrowBackIosNewIcon sx={{fontSize: '16px'}}/>
                    <Typography sx={{
                        ml: '8px', ...textStylesBodyM, fontSize: '16px', lineHeight: '120%',
                        // color: page === 1 ? '#a2a2a2' : 'black'
                    }}>
                        Previous
                    </Typography>
                </IconButton>
                <IconButton
                    // onClick={() => handleChangePage(null, page + 1)}
                    // disabled={page === Math.ceil(skillsData?.length / itemsPerPage)}
                >
                    <Typography sx={{
                        mr: '8px', ...textStylesBodyM, fontSize: '16px', lineHeight: '120%',
                        // color: page === Math.ceil(skillsData?.length / itemsPerPage) ? '#a2a2a2' : 'black'
                    }}>
                        Next
                    </Typography>
                    <ArrowForwardIosIcon sx={{fontSize: '16px'}}/>
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '32px',
                }}
            >
                {skillsData?.length ? (
                    skillsData.map((skill) => (
                        <Box
                            key={skill.id}
                            onClick={() => handleSelectSkill(skill)}
                            sx={{
                                userSelect: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                borderRadius: '8px',
                                padding: '12px 24px',
                                backgroundColor: skills.find((e) => e.id === skill.id) ? '#814aeb' : '#efe8ff',
                                height: '96px',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: skills.find((e) => e.id === skill.id) ? '#814aeb' : '#efe8ff',
                                },
                            }}
                        >
                            <img src={`${SITE_URL}${skill.icon.url}`} alt="" style={{ width: '40px', height: '40px', filter: skills.find((e) => e.id === skill.id) ? 'invert(95%)' : 'none' }} />
                            <Typography
                                sx={{
                                    ...textStylesBodyM,
                                    textAlign: 'left',
                                    verticalAlign: 'end',
                                    color: skills.find((e) => e.id === skill.id) ? '#e8e8e8' : '#000',
                                    fontSize: '16px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {skill.skillName}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography
                        sx={{
                            ...textStylesBodyM,
                            width: '100%',
                            textAlign: 'center',
                            verticalAlign: 'end',
                            fontSize: '20px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        NOT FOUND
                    </Typography>
                )}
            </Box>

            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                mt: 3,
                gap: '12px',
                marginTop: '40px', ...textStylesBody3,
                fontSize: '18px'
            }}>
                {
                    skills.length
                        ?
                        skills.map((skill, index) => (
                            <Chip
                                key={index}
                                label={<Box sx={{display: 'flex', alignItems: 'center', padding: 0}}>
                                    <img src={`${SITE_URL}${skill.icon.url}`} alt=""
                                         style={{width: '24px', height: '24px', marginRight: '10px'}}/>
                                    {skill.skillName}</Box>}
                                onDelete={() => handleRemoveSkill(skill.id)}
                                sx={{
                                    ...textStylesBody3,
                                    fontSize: '18px',
                                    border: '1px solid black',
                                    borderRadius: '8px',
                                    height: '44px',
                                    backgroundColor: 'white',
                                    justifyContent: 'space-between'
                                }}
                                deleteIcon={<CancelIcon sx={{fill: '#FDA29B', width: "24", height: "24"}}/>}
                            />
                        ))
                        : <></>
                }
            </Box>
        </>
    );
};

export default SkillSelectionSlider;