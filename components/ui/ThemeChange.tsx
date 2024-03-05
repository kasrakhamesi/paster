import { themes } from "@/constants/themes";
import clsx from "clsx";
import { useEffect } from "react";
import { themeChange } from "theme-change";

const ThemeChange = () => {

    useEffect(() => {
        themeChange(false)
    }, [])

    return (
        <div className="dropdown dropdown-end" title="Change Theme">
            <div tabIndex={0} className="m-1 normal-case btn-ghost btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current md:mr-2">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                </svg>
                <span className="hidden md:inline">Change Theme</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-4 h-4 ml-1 fill-current" viewBox="0 0 1792 1792">
                    <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z" />
                </svg>
            </div>
            <div
                className={clsx(
                    'mt-16 overflow-y-auto shadow-2xl top-px dropdown-content h-96 w-52 rounded-b-box bg-base-200 text-base-content',
                )}>
                <ul className="p-4 menu compact">
                    {themes.map((theme, idx) => {
                        return (
                            <li key={idx}>
                                <a tabIndex={0} data-set-theme={theme.id} data-act-class="active">
                                    {theme.name}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default ThemeChange;