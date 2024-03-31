import React, { useState, useEffect } from "react";

function Progressbar({ progress }) {
    const [style, setStyle] = useState({});

    useEffect(() => {
        const updatedStyle = {
            "--value": progress,
            "--primary": "#369",
            "--secondary": "#adf",
            "--size": "300px",
        };
        setStyle(updatedStyle);
    }, [progress]);

    return (
        <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={style}>
            <div className="progressbar-inner">{progress}%</div>
        </div>
    );
}

export default Progressbar;
