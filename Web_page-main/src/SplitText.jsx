import { useEffect, useState } from 'react';

const SplitText = ({ text = "", delay = 50 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const characters = text.split('');

    return (
        <span style={{ display: 'inline-block' }}>
            {characters.map((char, index) => (
                <span
                    key={index}
                    style={{
                        display: 'inline-block',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: `all 0.5s ease ${index * (delay / 500)}s`,
                        whiteSpace: char === ' ' ? 'pre' : 'normal'
                    }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
};

export default SplitText;