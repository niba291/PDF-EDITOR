
// IMPORT==================================================================================================================
// RENDER==================================================================================================================
export function Input({label, value, onEvent}) {
    // VARIABLES===========================================================================================================
    return (
        <div className="border px-2 py-1 rounded flex flex-wrap justify-center mr-1 items-center w-full mt-1">
            <h1 className="w-2/6 py-1">{label}</h1>
            <input 
                type="text" 
                className="w-4/6 border px-2 rounded" 
                value={value}
                onInput={onEvent}
            />
        </div>
    );
}