import { ThemeContext } from '@/context/ThemeContext';
import { useContext } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';


const DarkmodeToggle = ({ size = 30 }: { size?: number }) => {

    const { theme, setTheme } = useContext(ThemeContext)

    const toggleDarkMode = (checked: boolean) => {
        setTheme(checked ? 'dark' : 'cupcake');
    };

    return (
        <DarkModeSwitch
            checked={theme === 'dark'}
            onChange={toggleDarkMode}
            size={size}
        />
    );
}

export default DarkmodeToggle;