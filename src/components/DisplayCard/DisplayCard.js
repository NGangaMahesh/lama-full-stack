import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './DisplayCard.css';
import { Link } from 'react-router-dom';

const DisplayCard = (props) => {
    const { setCurrentProjectId } = useContext(StoreContext);
    const { eachProject } = props;
    const { name, episodes, updatedAt, id } = eachProject;
    const colors = ['org', 'blue', 'vilote'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const timeAgo = (date) => {
        const now = new Date();
        const past = new Date(date);
        const diffInSeconds = Math.floor((now - past) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1,
        };

        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            if (diffInSeconds >= secondsInUnit || unit === 'second') {
                const delta = Math.floor(diffInSeconds / secondsInUnit);
                return rtf.format(-delta, unit);
            }
        }
    };

    const getFirstLetters = (input) => {
        return input
            .split(' ')
            .map(word => word[0].toUpperCase())
            .join('');
    };

    const goToEpisode = async() => {
        await setCurrentProjectId(id);
    };

    return (
        <Link className='link-card' to={`/episode/${id}`}>
        <li onClick={goToEpisode} className='display-card'>
            <div className={`first-letter ${randomColor}`}>
                {getFirstLetters(name)}
            </div>

            <div>
                <h2>{name}</h2>
                <p>{episodes} Episodes</p>
                <p className='last-time'>Last edited {timeAgo(updatedAt)}</p>
            </div>
        </li>
        </Link>
    );
};

export default DisplayCard;
