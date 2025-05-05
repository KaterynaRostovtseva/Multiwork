import BadgeActive from '../../assets/images/BadgeActive.svg';
import BadgeCompleted from '../../assets/images/BadgeCompleted.svg';
import BadgeInProcces from '../../assets/images/BadgeInProcces.svg';
import avatar1 from '../../assets/avatars/avatar1.svg';
import avatar2 from '../../assets/avatars/avatar2.svg';
import avatar3 from '../../assets/avatars/avatar3.svg';
import avatar4 from '../../assets/avatars/avatar4.svg';
import projects5 from '../../assets/images/TopUsers/projects5.svg';
import projects7 from '../../assets/images/TopUsers/projects7.svg';
import projects14 from '../../assets/images/TopUsers/projects14.svg';
import GraphicDesigner from '../../assets/icons/GraphicDesigner.svg';
import Art from '../../assets/icons/Art.svg';
import Coding from '../../assets/icons/Coding.svg';
import DataAnalystic from '../../assets/icons/DataAnalytic.svg';
import Marketing from '../../assets/icons/Marketing.svg';
import Design from '../../assets/icons/Design.svg';
import BrandManagment from '../../assets/icons/BrandManagment.svg';
import Finance from '../../assets/icons/Finance.svg';
import ContentCreator from '../../assets/icons/ContentCreator.svg';
import SMM from '../../assets/icons/SMM.svg';



const MockDataProjects= () => {
    const dataProjects = [
        {
            id: 1,
            coverImg: projects14,
            skills: [
                {
                    icon: Design,
                    skillName: "3D Design"
                },
                {
                    icon: DataAnalystic,
                    skillName: "Data Analytic"
                },
                {
                    icon: Coding,
                    skillName: "Coding",
                },
                {
                    icon: Art,
                    skillName: "Art",
                },
            ],
            plusNumber: '',
            createdAt: "10.07.2024",
            icon: "FavoriteIcon",
            icon: "ShareIcon",
            project_status: 'Active',
            title: "Hyatt LLC",
            description: "A platform for finding and combining specialists into teams, the purpose of the platform is to simplify the search and combination of specialists, using artificial intelligence to improve the recruiting process.",
            dataAvatar: [
                {
                    avatar: avatar1,
                },
                {
                    avatar: avatar2,
                },
                {
                    avatar: avatar3,
                },
                {
                    avatar: avatar4,
                }
            ],
            plusNum: '+15 member',
            isSelected: true,
        },
        {
            id: 2,
            coverImg: projects14,
            skills: [
                {
                    icon: Design,
                    skillName: "3D Design"
                },
                {
                    icon: DataAnalystic,
                    skillName: "Data Analytic"
                },
                {
                    icon: Coding,
                    skillName: "Coding",
                },
                {
                    icon: Art,
                    skillName: "Art",
                },
            ],
            plusNumber: '',
            createdAt:"10.07.2024",
            icon: "FavoriteIcon",
            icon: "ShareIcon",
            project_status: 'InProcces',
            title: "Hyatt LLC",
            description: "A platform for finding and combining specialists into teams, the purpose of the platform is to simplify the search and combination of specialists, using artificial intelligence to improve the recruiting process.",
            dataAvatar: [
                {
                    avatar: avatar1,
                },
                {
                    avatar: avatar2,
                },
                {
                    avatar: avatar3,
                },
                {
                    avatar: avatar4,
                }
            ],
            plusNum: '+15 member',
            isSelected: false,
        },
        {
            id: 3,
            coverImg: projects14,
            skills: [
                {
                    icon: Design,
                    skillName: "3D Design"
                },
                {
                    icon: DataAnalystic,
                    skillName: "Data Analytic"
                },
                {
                    icon: Coding,
                    skillName: "Coding",
                },
                {
                    icon: Art,
                    skillName: "Art",
                },
            ],
            plusNumber: '',
            createdAt: "10.07.2024",
            icon: "FavoriteIcon",
            icon: "ShareIcon",
            project_status: 'Completed',
            title: "Hyatt LLC",
            description: "A platform for finding and combining specialists into teams, the purpose of the platform is to simplify the search and combination of specialists, using artificial intelligence to improve the recruiting process.",
            dataAvatar: [
                {
                    avatar: avatar1,
                },
                {
                    avatar: avatar2,
                },
                {
                    avatar: avatar3,
                },
                {
                    avatar: avatar4,
                }
            ],
            plusNum: '+15 member',
            isSelected: false,
        },
        {
            id: 4,
            coverImg: projects14,
            skills: [
                {
                    icon: Design,
                    skillName: "3D Design"
                },
                {
                    icon: DataAnalystic,
                    skillName: "Data Analytic"
                },
                {
                    icon: Coding,
                    skillName: "Coding",
                },
                {
                    icon: Art,
                    skillName: "Art",
                },
            ],
            plusNumber: '',
            createdAt: "10.07.2024",
            icon: "FavoriteIcon",
            icon: "ShareIcon",
            project_status: 'Active',
            title: "Hyatt LLC",
            description: "A platform for finding and combining specialists into teams, the purpose of the platform is to simplify the search and combination of specialists, using artificial intelligence to improve the recruiting process.",
            dataAvatar: [
                {
                    avatar: avatar1,
                },
                {
                    avatar: avatar2,
                },
                {
                    avatar: avatar3,
                },
                {
                    avatar: avatar4,
                }
            ],
            plusNum: '+15 member',
        },
        {
            id: 5,
            coverImg: projects14,
            skills: [
                {
                    icon: Design,
                    skillName: "3D Design"
                },
                {
                    icon: DataAnalystic,
                    skillName: "Data Analytic"
                },
                {
                    icon: Coding,
                    skillName: "Coding",
                },
                {
                    icon: Art,
                    skillName: "Art",
                },
            ],
            plusNumber: '',
            createdAt: "10.07.2024",
            icon: "FavoriteIcon",
            icon: "ShareIcon",
            project_status: 'InProcces',
            title: "Hyatt LLC",
            description: "A platform for finding and combining specialists into teams, the purpose of the platform is to simplify the search and combination of specialists, using artificial intelligence to improve the recruiting process.",
            dataAvatar: [
                {
                    avatar: avatar1,
                },
                {
                    avatar: avatar2,
                },
                {
                    avatar: avatar3,
                },
                {
                    avatar: avatar4,
                }
            ],
            plusNum: '+15 member',
        },
        {
            id: 6,
            coverImg: projects14,
            skills: [
                {
                    icon: Design,
                    skillName: "3D Design"
                },
                {
                    icon: DataAnalystic,
                    skillName: "Data Analytic"
                },
                {
                    icon: Coding,
                    skillName: "Coding",
                },
                {
                    icon: Art,
                    skillName: "Art",
                },
            ],
            plusNumber: '',
            createdAt: "10.07.2024",
            icon: "FavoriteIcon",
            icon: "ShareIcon",
            project_status: 'Completed',
            title: "Hyatt LLC",
            description: "A platform for finding and combining specialists into teams, the purpose of the platform is to simplify the search and combination of specialists, using artificial intelligence to improve the recruiting process.",
            dataAvatar: [
                {
                    avatar: avatar1,
                },
                {
                    avatar: avatar2,
                },
                {
                    avatar: avatar3,
                },
                {
                    avatar: avatar4,
                }
            ],
            plusNum: '+15 member',
        },
        {
            id: 7,
            coverImg: projects14,
            skills: [
                {
                    icon: Design,
                    skillName: "3D Design"
                },
                {
                    icon: DataAnalystic,
                    skillName: "Data Analytic"
                },
                {
                    icon: Coding,
                    skillName: "Coding",
                },
                {
                    icon: Art,
                    skillName: "Art",
                },
            ],
            plusNumber: '',
            createdAt: "10.07.2024",
            icon: "FavoriteIcon",
            icon: "ShareIcon",
            project_status: 'Active',
            title: "Hyatt LLC",
            description: "A platform for finding and combining specialists into teams, the purpose of the platform is to simplify the search and combination of specialists, using artificial intelligence to improve the recruiting process.",
            dataAvatar: [
                {
                    avatar: avatar1,
                },
                {
                    avatar: avatar2,
                },
                {
                    avatar: avatar3,
                },
                {
                    avatar: avatar4,
                }
            ],
            plusNum: '+15 member',
        },
        {
            id: 8,
            coverImg: projects14,
            skills: [
                {
                    icon: Design,
                    skillName: "3D Design"
                },
                {
                    icon: DataAnalystic,
                    skillName: "Data Analytic"
                },
                {
                    icon: Coding,
                    skillName: "Coding",
                },
                {
                    icon: Art,
                    skillName: "Art",
                },
            ],
            plusNumber: '',
            createdAt:"10.07.2024",
            icon: "FavoriteIcon",
            icon: "ShareIcon",
            project_status: 'InProcces',
            title: "Hyatt LLC",
            description: "A platform for finding and combining specialists into teams, the purpose of the platform is to simplify the search and combination of specialists, using artificial intelligence to improve the recruiting process.",
            dataAvatar: [
                {
                    avatar: avatar1,
                },
                {
                    avatar: avatar2,
                },
                {
                    avatar: avatar3,
                },
                {
                    avatar: avatar4,
                }
            ],
            plusNum: '+15 member',
        },
        {
            id: 10,
            coverImg: projects14,
            skills: [
                {
                    icon: Design,
                    skillName: "3D Design"
                },
                {
                    icon: DataAnalystic,
                    skillName: "Data Analytic"
                },
                {
                    icon: Coding,
                    skillName: "Coding",
                },
                {
                    icon: Art,
                    skillName: "Art",
                },
            ],
            plusNumber: '',
            createdAt: "10.07.2024",
            icon: "FavoriteIcon",
            icon: "ShareIcon",
            project_status: 'Completed',
            title: "Hyatt LLC",
            description: "A platform for finding and combining specialists into teams, the purpose of the platform is to simplify the search and combination of specialists, using artificial intelligence to improve the recruiting process.",
            dataAvatar: [
                {
                    avatar: avatar1,
                },
                {
                    avatar: avatar2,
                },
                {
                    avatar: avatar3,
                },
                {
                    avatar: avatar4,
                }
            ],
            plusNum: '+15 member',
        },
        {
            id: 11,
            coverImg: projects14,
            skills: [
                {
                    icon: Design,
                    skillName: "3D Design"
                },
                {
                    icon: DataAnalystic,
                    skillName: "Data Analytic"
                },
                {
                    icon: Coding,
                    skillName: "Coding",
                },
                {
                    icon: Art,
                    skillName: "Art",
                },
            ],
            plusNumber: '',
            createdAt: "10.07.2024",
            icon: "FavoriteIcon",
            icon: "ShareIcon",
            project_status: 'Active',
            title: "Hyatt LLC",
            description: "A platform for finding and combining specialists into teams, the purpose of the platform is to simplify the search and combination of specialists, using artificial intelligence to improve the recruiting process.",
            dataAvatar: [
                {
                    avatar: avatar1,
                },
                {
                    avatar: avatar2,
                },
                {
                    avatar: avatar3,
                },
                {
                    avatar: avatar4,
                }
            ],
            plusNum: '+15 member',
        },
        {
            id: 12,
            coverImg: projects14,
            skills: [
                {
                    icon: Design,
                    skillName: "3D Design"
                },
                {
                    icon: DataAnalystic,
                    skillName: "Data Analytic"
                },
                {
                    icon: Coding,
                    skillName: "Coding",
                },
                {
                    icon: Art,
                    skillName: "Art",
                },
            ],
            plusNumber: '',
            createdAt: "10.07.2024",
            icon: "FavoriteIcon",
            icon: "ShareIcon",
            project_status: 'InProcces',
            title: "Hyatt LLC",
            description: "A platform for finding and combining specialists into teams, the purpose of the platform is to simplify the search and combination of specialists, using artificial intelligence to improve the recruiting process.",
            dataAvatar: [
                {
                    avatar: avatar1,
                },
                {
                    avatar: avatar2,
                },
                {
                    avatar: avatar3,
                },
                {
                    avatar: avatar4,
                }
            ],
            plusNum: '+15 member',
        },
        {
            id: 13,
            coverImg: projects14,
            skills: [
                {
                    icon: Design,
                    skillName: "3D Design"
                },
                {
                    icon: DataAnalystic,
                    skillName: "Data Analytic"
                },
                {
                    icon: Coding,
                    skillName: "Coding",
                },
                {
                    icon: Art,
                    skillName: "Art",
                },
            ],
            plusNumber: '',
            createdAt: "10.07.2024",
            icon: "FavoriteIcon",
            icon: "ShareIcon",
            project_status: 'Completed',
            title: "Hyatt LLC",
            description: "A platform for finding and combining specialists into teams, the purpose of the platform is to simplify the search and combination of specialists, using artificial intelligence to improve the recruiting process.",
            dataAvatar: [
                {
                    avatar: avatar1,
                },
                {
                    avatar: avatar2,
                },
                {
                    avatar: avatar3,
                },
                {
                    avatar: avatar4,
                }
            ],
            plusNum: '+15 member',
        },
    ];


    return dataProjects;

    
} 
export default MockDataProjects;