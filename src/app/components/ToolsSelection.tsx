import React, {useState} from "react";
import Select from "react-select";

interface ToolsSelectionProps {
    userChoices: { value: string; label: string }[]; // Correctly typed userChoices
    onChoiceChange: (choices: { value: string; label: string }[]) => void; // Correctly typed onChoiceChange
}
const ToolsSelection: React.FC<ToolsSelectionProps> = ({ userChoices, onChoiceChange })  => {
    const [userChoice, setUserChoice] = useState({})
    const options = [
        { value: "Java", label: "Java"},
        { value: "Python", label: "Python"},
        { value: "JavaScript", label: "JavaScript"},
        { value: "React", label: "React"},
    ]
    // TODO: add more options
    const handleChange = (choices: any) => {
        setUserChoice(choices); // Update local state
        onChoiceChange(choices); // Update parent state via callback
      };
    return (
        <div className="pt-5">
            <Select 
                closeMenuOnSelect={false} 
                defaultValue={"Role"} 
                styles={{
                    option: (base) => ({
                    ...base,
                    border: `1px dotted black`,
                    height: '100%',
                    color: 'black'
                    }),
                }}
                options={options} 
                isMulti
                onChange={handleChange}
            />
        </div>
    )
}
export default ToolsSelection;