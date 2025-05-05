import avatar5 from '../../assets/images/TopUsers/avatar5.svg';
import avatar6 from '../../assets/images/TopUsers/avatar6.svg';
import avatar7 from '../../assets/images/TopUsers/avatar7.svg';
import baner1 from '../../assets/images/TopUsers/baner1.svg';
import baner2 from '../../assets/images/TopUsers/baner2.svg';
import baner3 from '../../assets/images/TopUsers/baner3.svg';
import projects1 from '../../assets/images/TopUsers/projects1.svg';
import projects2 from '../../assets/images/TopUsers/projects2.svg';
import projects3 from '../../assets/images/TopUsers/projects3.svg';
import projects4 from '../../assets/images/TopUsers/projects4.svg';
import projects5 from '../../assets/images/TopUsers/projects5.svg';
import projects6 from '../../assets/images/TopUsers/projects6.svg';
import projects7 from '../../assets/images/TopUsers/projects7.svg';
import projects8 from '../../assets/images/TopUsers/projects8.svg';
import projects9 from '../../assets/images/TopUsers/projects9.svg';
import projects10 from '../../assets/images/TopUsers/projects10.svg';
import projects11 from '../../assets/images/TopUsers/projects11.svg';
import projects12 from '../../assets/images/TopUsers/projects12.svg';
import GraphicDesigner from '../../assets/icons/GraphicDesigner.svg';
import Art from '../../assets/icons/Art.svg';
import Coding from '../../assets/icons/Coding.svg';
import DataAnalystic from '../../assets/icons/DataAnalytic.svg';
import Copywriting from '../../assets/icons/Copywriting.svg';
import Marketing from '../../assets/icons/Marketing.svg';
import MotionDesigner from '../../assets/icons/MotionDesigner.svg';



const MockDataUsers = () => {
    const dataUsers = [
        {
            id: 1,
            baner: baner1,
            avatar: avatar5,
            title: 'Carroll Jakubowski',
            skills: [
                { icon: GraphicDesigner, teg: 'Graphic Designer' },
                { icon: Art, teg: 'Art' },
                { icon: Coding, teg: 'Coding' },
            ],
            plusNumber: '+10',
            dataProjects: [
                { projects: projects1 },
                { projects: projects2 },
                { projects: projects3 },
                { projects: projects4 },
            ],
            plusNum: '+10 completed projects',
        },
        {
            id: 2,
            baner: baner2,
            avatar: avatar6,
            title: 'Miss David Steuber',
            skills: [
                { icon: DataAnalystic, teg: 'Data Analytic' },
                { icon: Copywriting, teg: 'Copywriting' },
            ],
            plusNumber: '+8',
            dataProjects: [
                { projects: projects5 },
                { projects: projects6 },
                { projects: projects7 },
                { projects: projects8 },
            ],
            plusNum: '+8 completed projects',
        },
        {
            id: 3,
            baner: baner3,
            avatar: avatar7,
            title: 'Terri Hagenes',
            skills: [
                { icon: Marketing, teg: 'Marketing' },
                { icon: MotionDesigner, teg: 'Motion Designer' },
            ],
            plusNumber: '+5',
            dataProjects: [
                { projects: projects9 },
                { projects: projects10 },
                { projects: projects11 },
                { projects: projects12 },
            ],
            plusNum: '+12 completed projects',
        },
        {
            id: 4,
            baner: baner1,
            avatar: avatar5,
            title: 'Carroll Jakubowski',
            skills: [
                { icon: GraphicDesigner, teg: 'Graphic Designer' },
                { icon: Art, teg: 'Art' },
                { icon: Coding, teg: 'Coding' },
            ],
            plusNumber: '+10',
            dataProjects: [
                { projects: projects1 },
                { projects: projects2 },
                { projects: projects3 },
                { projects: projects4 },
            ],
            plusNum: '+10 completed projects',
        },
        {
            id: 5,
            baner: baner2,
            avatar: avatar6,
            title: 'Miss David Steuber',
            skills: [
                { icon: DataAnalystic, teg: 'Data Analytic' },
                { icon: Copywriting, teg: 'Copywriting' },
            ],
            plusNumber: '+8',
            dataProjects: [
                { projects: projects5 },
                { projects: projects6 },
                { projects: projects7 },
                { projects: projects8 },
            ],
            plusNum: '+8 completed projects',
        },
        {
            id: 6,
            baner: baner3,
            avatar: avatar7,
            title: 'Terri Hagenes',
            skills: [
                { icon: Marketing, teg: 'Marketing' },
                { icon: MotionDesigner, teg: 'Motion Designer' },
            ],
            plusNumber: '+5',
            dataProjects: [
                { projects: projects9 },
                { projects: projects10 },
                { projects: projects11 },
                { projects: projects12 },
            ],
            plusNum: '+12 completed projects',
        },
        {
            id: 7, 
            baner: baner1,
            avatar: avatar5,
            title: 'Carroll Jakubowski',
            skills: [
                { icon: GraphicDesigner, teg: 'Graphic Designer' },
                { icon: Art, teg: 'Art' },
                { icon: Coding, teg: 'Coding' },
            ],
            plusNumber: '+10',
            dataProjects: [
                { projects: projects1 },
                { projects: projects2 },
                { projects: projects3 },
                { projects: projects4 },
            ],
            plusNum: '+10 completed projects',
        },
        {
            id: 8,
            baner: baner2,
            avatar: avatar6,
            title: 'Miss David Steuber',
            skills: [
                { icon: DataAnalystic, teg: 'Data Analytic' },
                { icon: Copywriting, teg: 'Copywriting' },
            ],
            plusNumber: '+8',
            dataProjects: [
                { projects: projects5 },
                { projects: projects6 },
                { projects: projects7 },
                { projects: projects8 },
            ],
            plusNum: '+8 completed projects',
        },
        {
            id: 9,
            baner: baner3,
            avatar: avatar7,
            title: 'Terri Hagenes',
            skills: [
                { icon: Marketing, teg: 'Marketing' },
                { icon: MotionDesigner, teg: 'Motion Designer' },
            ],
            plusNumber: '+5',
            dataProjects: [
                { projects: projects9 },
                { projects: projects10 },
                { projects: projects11 },
                { projects: projects12 },
            ],
            plusNum: '+12 completed projects',
        },
    ];


    return dataUsers;

    
} 
export default MockDataUsers;