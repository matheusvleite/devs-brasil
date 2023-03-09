import { Link } from 'react-router-dom'
import { areas } from '../../utils/area'

const Areas = () => {
    return (
        <div>
            <ul>
                {areas.map(area => (
                    <li key={area.id}><Link to={`/search?q=${area.name}`}>{area.name}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default Areas