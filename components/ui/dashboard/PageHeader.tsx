import TextGradient from "../TextGradient";

const PageHeader = ({ title, sub }: { title: string, sub: string }) => {
    return (
        <div className="flex space-x-4">
            <div>
               <TextGradient text={title} /> 
                <h2 className="py-4 text-lg">{sub}</h2>
            </div>
        </div>
    );
}

export default PageHeader;