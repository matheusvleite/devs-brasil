import { BsPinAngleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { areas } from '../../utils/area';
import styles from './Areas.module.css';

const Areas = () => {
    return (
        <div className={styles.areas}>
            <h2>Encontre o Profissionais por área</h2>
            <ul>
                {areas.map(area => (
                    <li key={area.id}><Link to={`/search?q=${area.name}`}><BsPinAngleFill /> {area.name}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default Areas