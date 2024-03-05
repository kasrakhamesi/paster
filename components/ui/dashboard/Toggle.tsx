import { LoaderIcon } from "react-hot-toast"

type Props = {
    setValue: (v: boolean) => void
    value: boolean
    title1: string
    value1: string | undefined
    title2: string
    value2: string | undefined
}

const Toggle = ({ setValue, value, title1 = "All", value1, title2, value2 }: Props) => {
    return (
        <div className="relative flex items-center justify-center h-16 px-3 py-4 overflow-hidden rounded-full bg-base-300 w-52">
            <div onClick={() => setValue(false)} className={`z-10 justify-center px-4 flex ${!value && 'text-neutral'} cursor-pointer items-center w-1/2`}>{title1} <span className={`flex text-white  items-center justify-center w-5 h-5 p-2 pt-[10px] ml-1 bg-black rounded-full text-xs`}>{value1 || <LoaderIcon />}</span></div>
            <div onClick={() => setValue(true)} className={`z-10 px-4 flex ${value && 'text-neutral'} cursor-pointer justify-center items-center w-1/2`}>{title2} <span className={`flex text-white  items-center justify-center w-5 h-5 p-2 pt-[10px] ml-1 bg-neutral rounded-full text-xs`}>{value2}</span></div>
            <div className={`absolute ${value ? "left-24 w-24" : "left-4 w-20"} shadow-xl shadow-accent/40 transition-all duration-300 ease-in-out rounded-full h-10 bg-[#C5FF4B] z-0`}></div>
        </div>
    );
}

export default Toggle;